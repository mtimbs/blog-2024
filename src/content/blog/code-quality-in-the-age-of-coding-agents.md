---
title: "Code Quality in the Age of Coding Agents"
description: "An adaptation of an internal talk I gave during a company wide ai-adoption week."
pubDate: "2026-03-11"
status: "published"
---

Note: This is an adaptation from a talk I gave during a company wide "ai-adoption week".

<hr>

The 2026 generation of coding models was a watershed moment for code production

![Coding ability](https://res.cloudinary.com/dwglesldc/image/upload/v1773196011/coding_ability_dwmyl8.avif)

_Coding_: The act of producing syntactically valid text that a machine can parse and execute (transcription into a formal grammar). The primary constraint is correctness at the token level: does this expression evaluate?

_Software Engineering_: Concerned with the properties of a system over time and across people. It introduces orthogonal concerns such as semantic correctness, reliability, scalability, maintainability, security etc etc.

## What makes software good?

Assume that you have two pieces of software. Assume there are zero defects or correctness issues with both of them. Is it possibly to say one piece of software is better than another?

This is the underlying question at the heart of the things I am going to talk about when it comes to coding with agents

## Limiting factors of production

> "The new bottleneck is the speed of ideas"

A common trope at the moment is that because coding is solved, teams are now only limited by the "speed of their ideas".

I suspect people who say this probably mean _product ideas_ - as in _what problem to solve_. However, you also need to have an idea on **how** to solve the problem once you've identified it.

- This second part has always (mostly) been true!
- Software development is primarily a process of building understanding through implementation
- software design is a discovery process, not a planning and delivery one
- The dominant bottleneck in software development is not the generation of code, but the generation of the correct **mental models** of a system

### Supporting Literature

The following authors have been big influences on how I think about software and go into these themes in much deeper detail. I've provided links as well as a short AI summary of how their work ties in below.
<details>
  <summary>Naur - Programming as Theory building</summary>

[Programming as Theory Building (1985)](https://pages.cs.wisc.edu/~remzi/Naur.pdf) — Naur argues that programming is not the production of code but the building of a _theory_ — a mental model of how the problem domain maps to the program. The code is a secondary artifact; the real product is the programmer's understanding. When that understanding is lost (e.g. through team turnover), the program becomes unmaintainable regardless of how well documented it is.

</details>
<details>
  <summary>Brooks - The mythical man month, No silver bullet</summary>

[The Mythical Man-Month (1975)](https://archive.org/details/MythicalManMonth) and [No Silver Bullet (1986)](https://www.cs.unc.edu/techreports/86-020.pdf) — Brooks distinguishes between _essential_ complexity (inherent to the problem) and _accidental_ complexity (introduced by our tools). No Silver Bullet argues that most productivity gains come from removing accidental complexity, but the essential difficulty of software — conceptualising, designing, and verifying the mental model — remains irreducible. Adding more people or better tools doesn't solve a thinking problem.

</details>
<details>
  <summary>Ralph - Sensemaking - Coevolution - Implementation</summary>

[The Sensemaking–Coevolution–Implementation Theory (2013)](https://arxiv.org/abs/1302.4061) — Ralph presents empirical evidence that software design is not a rational, plan-driven process but a cycle of _sensemaking_ (understanding the problem), _coevolution_ (problem and solution shaping each other), and _implementation_ (learning through building). Design knowledge emerges through the act of building, not before it.

</details>
<details>
  <summary>Parnas - Criteria to be used in decomposing systems into modules</summary>

[On the Criteria To Be Used in Decomposing Systems into Modules (1972)](https://dl.acm.org/doi/10.1145/361598.361623) — Parnas demonstrates that the way you decompose a system matters more than whether you decompose it at all. Good decomposition requires deep understanding of likely change vectors and information hiding — decisions that depend on judgment about the problem domain, not just the syntax of the solution.

</details>
<details>
  <summary>Polanyi - The tacit dimension</summary>

[The Tacit Dimension (1966)](https://archive.org/details/tacitdimension0000pola) — Polanyi's central claim is that "we know more than we can tell." Much of our knowledge — including how to design and evaluate software — is _tacit_: embodied in practice, impossible to fully articulate in rules or documentation. This is why specifications are always incomplete and why hands-on experience is irreplaceable.

</details>
<details>
  <summary>Dijkstra - On the cruelty of really teaching computer science</summary>

[On the Cruelty of Really Teaching Computing Science (EWD 1036, 1988)](https://www.cs.utexas.edu/~EWD/transcriptions/EWD10xx/EWD1036.html) — Dijkstra argues that programs are discrete mathematical objects of unprecedented complexity, and that our intuitions about them are unreliable. Rigorous formal reasoning is the only trustworthy tool — informal "it looks right" judgment systematically fails. The gap between something that _appears_ to work and something that _provably_ works is vast.

</details>

## Most of our ideas are bad actually

A lot of the time, our ideas on how to model and design a system are bad - or at least not as good as they could be.

- This is a not a junior vs senior argument (although experience helps narrow the range of bad ideas)
- A junior engineer with more domain experience might have much better ideas than a more senior one with none.
- Your ideas on how to solve a problem improve with experience solving the problem
- you cannot know your mental model is good before working with it. Correctness only reveals itself through <mark>contact with reality</mark>.

This is why nobody likes "Architecture Astronauts". They dictate system design and architecture from up high, without ever having to deal with the consequences of their decisions. it is also a big part of why waterfall methodologies fell out of favour. It's just really hard to fully appreciate a problem up front.

The good news is that bad ideas often reveal themselves via awkward implementation and friction. How often do you find yourself:

- constantly fighting an API

- annoyed by messy coupling of data

- struggling to reason about systems, interactions and impacts of changes

Traditionally, these have all been signals to tell you to try a different approach and change course. Often the way around these isn't some fancy design pattern from a book, but a complete reframing of the problem.

Automation and code generation reduces this friction. It dampens the signal. Pain is a warning system. It is a defence mechanism to stop use experience real and lasting damage.

By removing the friction and tactile feel of our building process, we allow our _bad ideas_ to propagate and accumulate. We've traded some short term pain for long term damage. This is compounded by the fact that AI models often use your existing code as a guidance mechanism for future code! Every degredation amplifies.

## Doing creates deeper understanding than observing

- you dont learn how to ride a bike by reading a book. You cant write perfect instructions for riding a bike and expect someone to do it first try

- when i was learning mathematics at university it often felt like things were obvious or that i understood them. When it came time to actually apply these concepts, you learn that your understanding is shallower than you thought

- no parenting book will ever fully prepare you for having childremn. You just have to learn by being a parent.

### The judgment-volume inversion

> Historically, your coding speed and ability to make good decisions grow hand in hand. The people most likely to do damage are most limited by their ability to generate code. This is no longer true. In fact, the relationship has been completely inverted. The people with the worst judgement are now capable of generating the most code.

Again, this is not a junior vs senior argument, or a bad engineer vs good engineer. Everything is context dependent, and you gain understanding by doing. An experienced engineer on a new problem also was historically limited by their output speed in the new problem domain. Not because the mechanical speed of typing varies, but because they are actually limited by their ability to formulate candidate solutions.

Coding models are **very good** at generating <mark>plausible looking</mark> candidate solutions. This doesn't mean they are correct (they are very often bad!)

Because "doing" creates deeper understanding than "observing" - you are more likely to be fooled by a plausible looking, but bad, idea when you observe the output of a coding agent. The more you do yourself the less likely you will be fooled.

### Supporting Literature

The following authors have been big influences on how I think about software and go into these themes in much deeper detail. I've provided links as well as a short AI summary of how their work ties in below.
<details>
  <summary>Popper - Conjectures and refutations</summary>

[Conjectures and Refutations (1963)](https://www.routledge.com/Conjectures-and-Refutations-The-Growth-of-Scientific-Knowledge/Popper/p/book/9780415285940) — Popper's central thesis is that knowledge advances through bold conjectures followed by rigorous attempts at refutation, not through passive observation or verification. You don't confirm an idea by finding evidence for it — you test it by trying to break it. Applied to software: you understand a design by stress-testing it through implementation, not by reading it and nodding along.

</details>
<details>
  <summary>Schön - The reflective practitioner</summary>

[The Reflective Practitioner (1983)](https://www.taylorfrancis.com/books/mono/10.4324/9781315237473/reflective-practitioner-donald-sch%C3%B6n) — Schön studies how professionals actually think in practice and finds they engage in "reflection-in-action" — a continuous conversation with the situation where doing and thinking are inseparable. Practitioners don't apply theory to problems; they develop understanding _through_ the act of working on them. This directly supports the claim that observing code is a weaker form of learning than writing it.

</details>
<details>
  <summary>Hickey - Hammock driven development</summary>

[Hammock Driven Development (Clojure Conj 2010)](https://www.youtube.com/watch?v=f84n5oFoZBc) — Hickey argues that the most important phase of problem-solving happens away from the keyboard: deeply loading a problem into your mind and letting your background cognitive processes work on it. The key insight is that you need to have _done the work_ of deeply engaging with the problem first — the thinking only bears fruit if you've built enough understanding through hands-on exploration.

</details>
<details>
  <summary>Victor - Inventing on principle</summary>

[Inventing on Principle (CUSEC 2012)](https://www.youtube.com/watch?v=PUv66718DII) — Victor demonstrates that creators need immediate, tangible feedback from their work to understand what they're building. The tighter the loop between action and visible consequence, the deeper the understanding. When an intermediary (like an agent) breaks that feedback loop, the creator loses the direct connection that drives insight and course-correction.

</details>

## Static guardrails are not enough

There is a temptation to think we can solve the engineering quality issue with guardrails. To an extent we can (static analysis, tests, code review). But these tools are mostly about code quality, not engineering quality. They don't really tell us anything about the quality of the **mental model** and solution that was landed on. Only that code was syntacticly correct and could be executed by a machine to do some specified task.

Tests are only as useful as your ability to specify a problem, and our ability to specify a problem is improved by our interaction with it! There is a whole body of work on the limitations of humans to be able to specify knowledge.

<details>
  <summary>NASA Saturn V Rocket</summary>

Contrary to popular myth, NASA never lost the Saturn V blueprints — [millions of pages survive](https://historyhub.history.gov/f/discussions/33647/do-the-plans-for-the-saturn-v-rocket-still-exist) in the National Archives, Marshall Space Flight Center, and the Smithsonian. The problem is that the blueprints are necessary but radically insufficient. When NASA attempted to revive F-1 engine technology decades later, engineers had to [reverse-engineer their own hardware](https://arstechnica.com/science/2013/04/how-nasa-brought-the-monstrous-f-1-moon-rocket-back-to-life/) — because formal documentation captured the _design_ but not the craft knowledge required to build it. Undocumented shop-floor modifications, hand-fitted parts ("beat to fit, paint to match"), the intuitions of skilled welders, dissolved supply chains, and obsolete materials meant the gap between "a complete set of engineering drawings" and "the ability to build the thing" was enormous.

</details>
<details>
  <summary>Polaroid Corp / Impossible Project</summary>

When Polaroid ceased instant film production in 2008, [The Impossible Project](https://danfinnen.com/article/the-early-films-failures-and-triumphs-of-the-impossible-project/) purchased the production machinery for $3.1M and leased the Enschede factory — but crucially did _not_ inherit the chemical formulas or IP. Key chemical suppliers had gone out of business, original dyes were no longer manufactured, and some ingredients had been environmentally banned. Starting with roughly 10 former Polaroid employees (vs. the hundreds of engineers Polaroid had), it took ~17 months to produce any working film (poor quality), ~4 years for semi-reliable colour, and roughly [8 years before the film was considered genuinely good](https://cjo.info/polaroid/articles/impossible-polaroid-retrospective-2010-2020/). Decades of R&D and institutional knowledge couldn't be reconstructed from machines and a skeleton crew.

</details>

There are countless examples of the importance of tacit knowledge and the implications of it.

## Where I find AI coding most valuable

This is not supposed to a doomer take. I use coding agents all the time for many tasks. I just want to make sure we are all aware of the risks that come along with the unrestrained roll out of AI coding agents. But there are also a lot of opportunities!

Bezos coined the term **undifferentiated heavy lifting** to sell more compute at AWS. It's been co-opted by SaaS companies to justify things like outsourcing Auth.

AI coding is great for tasks that are:

- high repetition
- low novelty
- low ambiguity
- have clear success criteria
- easily pattern matched
- high concentration in the training distribution

AI coding is bad for these tasks:

- system architecture
- domain modelling
- API design
- Generating abstractions

Cited Conventional Wisdom
Good:

```
implement a function to do X,Y,Z - use @foo.ts as an example

narrow, low ambiguity, examples given
```

Bad:

```
implement feature X,Y,Z

broad, requires domain modelling, system architecture decisions, api design and the creation of abstractions. Likely has to interact with multiple areas
```

<mark>BE CAREFUL!</mark>
People often take the above to mean that if you have a larger task like "implement feature X" you can just break it down into a series of smaller tasks and then have the model implement each of the small tasks! They'll often even design some agentic workflow to do this.

I just told you that a lot of our ideas on how to break down a problem like this can be bad!

Simply breaking down feature implementation into a series of small tasks and then handing them off to an LLM is a recipe for disaster in a lot of cases. It is very difficult to observe whether the LLM implementation is good or bad unless you put a lot of effort into reviewing the code. Often just as much effort as you would have spent writing it yourself!

A lot of people are crying the death of the IDE. I don't really understand what this means. How are they reading or reviewing code? Coding agents don't have great native review features. Are they reviewing on Github?

## AI is useful for more than just code generation

The most valuable way I use AI today is to improve my own understanding of the code and our product.

I will often have multiple concurrent agents finding answers to Qs

- how do the seat based billing and user invite flows interact? What are the shared code paths and data models.
- In some really legacy places we gate features by plan name string comparison instead of using the newer features array. How many places are we using the old approach? Whats the rough scope of change for migrating to the new system?
- I'm trying to understand X, see if you can infer from usage why.........

Roughly 70% or more of my usage is to automate and aid the investigation of existing code in order to get better clarification. This helps me create a mental model of the existing system and allows me to start planning how to work with it.

The great thing about using AI like this is

- unlimited parallelism. No worktrees or conflicts because you arent generating code
- fire and forget. true async research, takes only a few seconds to ask a Q and i can come back to it hours or days later
- as i am working in the code, if i get a hint of something feeling wrong i just fire off an agent to go explore that area to give me a report of how it all fits together and why

In games like Age of Empires you used to be able to send out cheap units (goats, explorers etc) to explore the map for you while you focused on building. I use coding agents like this a lot.

![Coding ability](https://res.cloudinary.com/dwglesldc/image/upload/v1773196622/fogofwar_s1gyo0.avif)

## So can we judge software quality?

To bring this back to the original question, the honest conclusion is that (I don't think) we can determine software quality without context, and gaining that context requires deep understanding of a problem. The way to get that deep understanding is by working on the problem.

In a way, if it were possible to objectively and generically asses the quality of two pieces of software, agents would be a lot better at creating it. They could just learn this difference. The problem is that every instance of the same problem is different in very subtle ways. We lack the data to tell us what these subtleties are, which means gradient descent can only learn the average similarities of each approach and converge on that. The average solution to very similar - but subtly different problems - are likely far from ideal.

My intuition is that the real danger of coding agents isn't bad code. Bad code has always existed. The danger is the dampening of signals that normally force better thinking. Understanding emerges through struggle. Automation removes the struggle without replacing the understanding.

Try to extend your reach while maintaining your mental model. Instead of asking how you can use AI to generate or automate as much as possible, consider asking how you can use AI to sharpen and improve your understanding of a problem, to actively explore the shape of it, iterate and formulate on candidate solutions faster.
