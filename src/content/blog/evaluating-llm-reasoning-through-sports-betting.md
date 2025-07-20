---
  title: "Evaluating LLM Reasoning Through Sports Betting: A Novel Benchmark Approach"
  description: "At first glance, sports betting might seem like an odd choice for evaluating AI systems. However, it provides several unique properties that make it ideal for testing reasoning capabilities"
  pubDate: "2025-07-20"
  status: "published"
---

## The Landscape of LLM Benchmarks

The field of AI evaluation is dominated by benchmarks that test what models *know* rather than how they *think*. MMLU tests academic knowledge across disciplines. HumanEval measures code generation ability. GSM8K evaluates mathematical reasoning. TruthfulQA checks factual accuracy. These benchmarks share common characteristics: they have correct answers, test static capabilities, and operate in controlled environments.

But real-world intelligence isn't about retrieving memorised facts or solving well-defined problems. It's about navigating uncertainty, seeking relevant information, and making defensible decisions with incomplete data. This gap in evaluation methodology led me to an unconventional approach: using sports betting markets as a reasoning benchmark.

## Why Sports Betting?

While sports betting might initially seem unconventional it provides several unique properties that make it ideal for testing reasoning capabilities:

### 1. No Ground Truth
Unlike academic benchmarks, sports betting has no, _a priori_, "correct" answer - outcomes are probabilistic. This mirrors real-world decision-making where we must act on incomplete information. Models can't pattern-match to training data or retrieve memorised answers.

### 2. Observable Information-Seeking Behaviour
When given access to web search, models reveal their information priorities. Do they search for team statistics? Recent performance? Weather conditions? Injury reports? Head-to-head records? The queries themselves become data points about reasoning strategies.

### 3. Forced Explanation
The requirement to provide detailed reasoning exposes the model's analytical process. This transparency is crucial - we see not just what decision was made, but the logical chain that led there.

### 4. Meta-Level Reasoning
All models are given a virtual bankroll. This introduces resource management. Models must consider not just what to bet on, but how much to risk. Models are not explicitly instructed to consider risk management, the models in the benchmark must use "judgement" here.

### 5. Time-Sensitive Reality
Using live odds and real events grounds the benchmark in reality. Models can't rely on outdated training data when analyzing tonight's boxing match or tomorrow's AFL game.


## Implementing the Benchmark

I was in a somewhat unique position to run this benchmark. I needed a way to allow these models to place bets on upcoming sporting events, in a way that did not require me to risk real money, but still allowed me to track the profit and loss of each model's performance.

Thankfully, I happen to run (as a hobby project) a [platform](https://www.betswaps.com/) built for this exact use case. Betswaps tracks real time odds and betting markets, allows betting with a virtual bankroll, and tracks profit and loss. All in a fully open and public environment for full transparency. This means that anyone can track any of the models online in real-time. The platform already supports leaerboards and supports adding comments to bets for justification.

![Betswaps Landing](https://res.cloudinary.com/dwglesldc/image/upload/v1753017377/Screenshot_2025-07-20_at_10.45.48_pm_ypztms.png)

Setting up the benchmark proved to be incredibly simple and it took only a few hours to get everything up and running. At a high level we do the following:

1. **Account Initialisation**: An account is created for each model to ensure isolation. It receives a $1,000 virtual betting bankroll.

2. **Event Selection**: For each of the supported sports (currently: MLB, Boxing, AFL, NRL) we pass each event (along with basic betting markets and real odds) for the following 24 hours to the model along with the models current bankroll

3. **Search & Data Collection**: Every model* has access to web search via [Serper](https://serper.dev/). The model is allowed to make up to 20 searches per event. All search terms are logged.

4. **Decision Making**: The model is asked whether it would like to place a bet or not and to indicate how much it would like to bet. If a bet is placed it must provide a detailed explanation of why they are placing the bet.

5. **Logging**: The model's search terms, chain of thought, and reasoning are logged to the system for record keeping and later analysis.

6. **Bet Placement**: If the model indicates a desire to place a bet - a bet is placed on Betswaps using the model's decision and suggested bet amount. The explanation is added to the public bet as a comment. These bets (and comments) are fully public online as they are placed.

7. **Tracking & Results**: Betswaps automatically tracks the outcomes of each bet and updates the model's bankroll accordingly.


### The prompt

```python
# System Prompt
system_prompt = """
You are a sports betting analyst. You will be shown current betting markets and odds. You have access to web search. You are free to search for any information you think would help you as an analyst. Based on your research, suggest bets that you believe offer value.

You can search for information using the web_search function.

IMPORTANT: After researching, you MUST respond with ONLY valid JSON (no text before or after) in the following format:

{
  "bets": [
      {
        "stake": (bet amount integer in whole dollars),
        "outcome": "outcome-id"
      }
  ],
  "reasoning": "Your detailed analysis and justification for the selections in plain text. This will be posted as a comment on the bet. No markdown or rich text formatting."
}

CRITICAL: You must ALWAYS return valid JSON, even if you recommend no bets. Never return plain text.

Guidelines:
- Be selective - only suggest bets you have strong conviction in
- Research thoroughly before making recommendations"
- The "outcome" field must match an exact outcome ID from the provided markets
- Stake should be a number (no $ symbol)
- The reasoning field should contain your full analysis and will be used as the bet comment
- Reasoning must be plain text only (no markdown)
- If you don't find any value bets, return {"bets": [], "reasoning": "explanation of why no bets were placed"}
"""

# User Prompt
user_prompt = f"""
IMPORTANT: Your total betting bankroll is {balance_str}. This is your ENTIRE account balance.

Here are the betting markets for the first event today:

{json.dumps(markets, indent=2)}

Please research and analyze these markets, then suggest which bets to place.
"""

tools = [
  {
      "type": "function",
      "function": {
          "name": "web_search",
          "description": "Search the web for information",
          "parameters": {
              "type": "object",
              "properties": {
                  "query": {
                      "type": "string",
                      "description": "The search query"
                  }
              },
              "required": ["query"]
          }
      }
  }
]
```

For the first few days I have been running this process off my local machine. Now that I am confident in the system, I will ship to a dedicated server to run this workflow on a daily cron job. To ensure a fair comparison, each model is run in parallel for each sport so that they all get the same information at the same time.

[*] Perplexity does not support tool use but has native search capabilities. Therefore, Perplexity can still perform search (internally), we just cannot log the search terms.

Note: While all models start with a default bankroll of $1,000, when a model goes bankrupt, it is given an additional $1,000 to bet with. Models will continue to be topped up so that they can participate in the benchmark until they reach a maximum of $10,000 deficit.

### Initial Models in benchmark

| Model | BetSwaps Profile |
|-------|------------------|
| claude-sonnet-4-20250514 | [View Profile](https://www.betswaps.com/user/c00e3c61-61af-451b-9609-6f1ea687fdb6/) |
| xai/grok-4-0709 | [View Profile](https://www.betswaps.com/user/ebf12440-732e-42e4-ada9-5c42b95b5c5b/) |
| gpt-4o | [View Profile](https://www.betswaps.com/user/b8ef2e4e-6d7f-4e42-ad55-50e0ad9e9224/) |
| deepseek/deepseek-reasoner | [View Profile](https://www.betswaps.com/user/a750afd8-9c5d-4ad9-bdad-2a926d88c391/) |
| gemini/gemini-2.5-flash | [View Profile](https://www.betswaps.com/user/3544226e-4209-4cf3-9b24-145f8a869e27/) |
| mistral/magistral-medium-2506 | [View Profile](https://www.betswaps.com/user/ad18a1df-3ad8-40a0-b66e-21d49f8f7dff/) |
| perplexity/sonar-reasoning | [View Profile](https://www.betswaps.com/user/ec4bf80d-a700-4795-838f-593a943b7d7c/) |


![Mistral Performance](https://res.cloudinary.com/dwglesldc/image/upload/v1753017045/Screenshot_2025-07-20_at_10.38.16_pm_ommmz8.png)

You do not need an account to view all bets placed by all models in real time at [https://www.betswaps.com/](https://www.betswaps.com/).


## Benchmark code

The code for this benchmark can be found on Github [here]() ^(COMING SOON). You are welcome to clone the script and make your own edits and submit models to Betswaps.



## Early Discoveries

### Un-prompted Mathematical Thinking

Mistral emerged as the top early performer with explicit mathematical reasoning. It's the only model that consistently calculated expected value:

> "With Marlins at 2.16 odds (46.3% implied probability) but estimated 52% true probability:
EV = (0.52 × 1.16) - (0.48 × 1) = 0.1232 or 12.32% edge
Kelly Criterion suggests: 4% of bankroll = $33"

This isn't just sophisticated - it's *correct* mathematical thinking applied to uncertainty. Mistral treats betting as a mathematical optimization problem, not a prediction task. This is impressive as the user prompt given to models very *deliberately* did not try to guide models to adopt this behavior.

### Domain-Specific Reasoning

Here's where it gets fascinating. The same Mistral that applies probability theory to baseball completely abandons mathematical thinking when analyzing boxing:

**Baseball Mistral**:
> "Using normal distribution with z-score = -0.064, we get P(Z > -0.064) ≈ 0.5256, suggesting 52.56% true probability vs 50.25% implied, creating positive EV"

**Boxing Mistral**:
> "A bet on Robert Redmond Jr at 8.0 odds offers a significant payout with a relatively small stake"


This behavior reveals something interesting and I have two hypotheses:

1. LLMs don't have consistent reasoning capabilities - they have domain-specific reasoning patterns learned from their training data. Mistral can apply sophisticated probability theory to baseball because that's how baseball is discussed in its training corpus (post-Moneyball era). But for boxing, it reverts to primitive "big odds = big payout" logic.

2. The **content** of the search resutls for Baseball is more sophisticated. It contains keywords or language that _primes_ the models to act more rationally or mathematically when considering Baseball markets.

### Cultural Mirror Effects?

When we look at the models in aggregate across sports, we see the same phenomenon as described above. All models provide more sophisticated reasoning for Baseball games than they do for other sports.

**Baseball (High Sophistication Across All Models):**
- Deep pitching matchup analysis (ERA, WHIP, win-loss records)
- Park factors and home/road splits
- Advanced sabermetrics references
- Expected value calculations

**AFL/NRL (Low Sophistication Across All Models):**
- Basic ladder positions and recent form
- Generic "momentum" references
- Limited statistical depth
- Heavy reliance on expert opinions

**Boxing (Narrative-Driven):**
- Focus on storylines and "home advantage"
- Simple odds comparisons
- No systematic value calculations
- Psychological factors without quantification

This pattern holds across all models, suggesting they're not general reasoners but sophisticated mirrors of human analytical cultures in different domains. Baseball benefits from decades of sabermetrics revolution; boxing remains stuck in narrative tradition.


### Information Gathering: Quality v Quantity

Claude performed 85-90 searches per session, exhaustively researching every angle. Mistral performed just 25-27, yet achieved superior results. The difference? Search strategy:

**Claude's searches:**
- "Miami Marlins recent performance"
- "Kansas City Royals news"
- "MLB standings July 2025"

**Mistral's searches:**
- "Miami Marlins vs Kansas City Royals head to head 2025"
- "Michael Wacha ERA vs left handed batters 2025"
- "Kauffman Stadium park factors runs 2025"

Mistral asks specific, actionable questions. Claude gathers information hoping insights will emerge. It's the difference between targeted hypothesis testing and exploratory browsing.


### Risk Profiles: A Spectrum of Approaches

Perhaps the most striking discovery is Gemini's spectacular bankroll depletion. Starting with $1000, Gemini bet on 14 of 15 available games on day one, wagering $982 total. By day two, with only $119.90 remaining, it continued its aggressive strategy until reaching a bankroll of $0.90. A deeper analysis of Gemini's reasoning may yield insight into why it is so much more aggressive than all other models (Claude Sonnet 4 is also more aggressive than other models).

![Mistral Performance](https://res.cloudinary.com/dwglesldc/image/upload/v1753017176/Screenshot_2025-07-20_at_10.42.36_pm_sag0c1.png)

The models exhibit dramatically different risk personalities:

- **DeepSeek**: Places few large bets ($95 average) on high-conviction opportunities.

- **GPT-4o**: Fixed $50 stakes regardless of edge or conviction

- **Claude**: Percentage-based staking (3-5% of bankroll)

- **Mistral**: Kelly Criterion-based sizing (when analyzing baseball)

- **Gemini**: YOLO approach until bankrupt

- **Perplexity**: Ultra-conservative, frequently declining to bet

I was surprised to see that models have distinct risk appetites and prepensity to bet.


### The Cost-Performance Curve

Claude costs $1.96 per run while achieving mediocre results early. Mistral costs $0.51 and tops the performance charts. Perplexity at $0.09 maintains steady bankroll through conservative selection.

This suggests frontier model capabilities (Claude's extensive search and reasoning) may actually be counterproductive for decision-making under uncertainty. More capability can lead to overconfidence and over-analysis.



### Limitations and Future Directions

The current implementation has clear limitations. Models are purely reactive, synthesizing search information without building persistent mental models or developing domain expertise. They can't learn from previous decisions or adapt strategies based on outcomes.

Future iterations could introduce:
- **Custom Tool Development**: Allow models to create their own analytical scripts or databases
- **Persistent Memory**: Enable models to build and refine domain knowledge over time
- **Strategy Evolution**: Let models develop and test their own analytical frameworks
- **Collaborative Reasoning**: Multiple models working together with different specialisations

These enhancements would move beyond simple search synthesis toward genuine reasoning systems.


## Conclusion

The sports betting benchmark represents a philosophical shift in LLM evaluation. Instead of asking "what does this model know?" we ask "how does this model think?" Instead of testing retrieval, we test reasoning. Instead of measuring accuracy, we evaluate approach and relative performance in an incredible competitive and uncertain domain.

While the current implementation is simple - perhaps even naive - it opens a new dimension in understanding AI capabilities. The insights gained extend far beyond sports betting. Understanding how models approach uncertainty, prioritise information, and construct arguments has implications for AI deployment where decisions must be made with incomplete information.

This benchmark doesn't claim to be comprehensive or definitive. Rather, it offers a new lens through which to view AI capabilities - one focused on process and outcome, reasoning over retrieval, and real-world applicability over academic abstraction. In doing so, it contributes to the broader conversation about what intelligence means in the age of large language models.
