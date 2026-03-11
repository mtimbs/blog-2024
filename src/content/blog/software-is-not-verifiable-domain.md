---
title: "Why Software Is Not an Easily Verifiable Domain"
description: "Software is highly checkable, but end-to-end verification is hard because deciding what should exist is the real work. A critique of AI verification through the lens of Naur, Deutsch, and Alexander."
pubDate: "2025-12-27"
status: "published"
---

# Software Is Not an Easily Verifiable Domain

**And why reinforcement learning won’t “solve” it.**

Software is often presented as the easiest domain for AI to automate. Programs are discrete. They compile or they don’t. Tests pass or they fail. Compared to robotics or medicine, software looks clean: formal, machine-checkable, and flooded with feedback signals.

That framing confuses *checkability* with *verifiability*.

We can check software extremely well: compilers, types, linters, tests, proofs, model checkers. But “verify” in the sense people imply—prove we built the right system for the real world, and that it will remain right as the world changes—is a different problem.

This is not a claim that software is unverifiable in principle. It is a claim about what is hard in practice, and why confident timelines like “solving programming in 12 months” are fantasy. Software is not low-hanging fruit for verification—and it is not one of the easiest domains to automate end-to-end—because the hardest part is not writing code. It is deciding what code should exist.

This is also not a claim that software is uniquely hard. Software sits in the same category as other engineering disciplines: the bottleneck is design, not calculation. The hard part is choosing constraints, deciding what to optimize, and locking in tradeoffs before you can “verify” anything.

Contrast that with many other digital domains—data entry, administrative workflows, large parts of accounting—where the work is applying a relatively stable rulebook. The institution already did most of the theory formation. Automation can be mostly transcription and compliance.

## What Formal Verification Actually Proves

Formal verification is real and powerful in constrained domains—compilers, kernels, crypto, avionics—where the environment is closed and the specification is stable enough to write down. But it proves a specific relationship:

> The implementation satisfies the specification.

It does not prove that the specification matches the thing you *meant* in the world.

Even in unusually formal domains like compilers, the hard work is not transcribing semantics into code. The hard work is choosing semantics: what to support, what to forbid, what to leave undefined, how errors behave, what performance model you are willing to commit to, what extension points you’ll allow. Once those decisions exist, a “correct implementation” is comparatively straightforward.

Verification raises the ceiling on confidence. It does not create the theory you need to decide what should be verified.

## The Verification Toolbox Is Not the Theory

Steelman the field. We have an impressive toolkit:

- proofs and model checking
- property-based testing and fuzzing
- contracts, static analysis, linters, types
- runtime verification and monitoring

These are not toys. They do valuable work: they reduce the lossiness of a theory by making assumptions explicit, and they leave guideposts for future engineers (human or machine). They turn “we think it works” into “it fails if this invariant breaks.”

Their biggest contribution is often less philosophical. They reduce the mental burden of the *implementation*—the bookkeeping required to keep a large system coherent—and that buys you bandwidth to think about the theory itself.

But they are still *representations* of your theory. They are not the underlying theory itself.

Every technique forces the same prior step: decide what properties matter. Decide what invariants define “correct.” Decide what tradeoffs you are willing to accept. That is not verification; that is the essence of engineering.

Here’s the thought experiment that makes this concrete: imagine you want to fully constrain a system so that no generated implementation could hide “free parameters”—no ad hoc branches, no silent assumptions, no convenient corner cases. What would you have to write?

You would have to spell out the invariants, boundaries, failure modes, and tradeoffs so completely that the remaining degrees of freedom collapse into transcription. At that point you have done the hard part already. The tools don’t remove the need for theory formation; they pressure you to do it.

And none of these methods is universal across every domain, because “what must be true” depends on what you’re building.

## Reinforcement Learning Optimizes Proxies

Reinforcement learning is an optimization process. If the reward is “pass the tests,” it will find the shortest path to green. Often that path is curve fitting: special cases, brittle coupling, and silent assumptions that satisfy the metric while hollowing out the model.

The obvious rebuttal is reward shaping: include invariants, complexity penalties, performance constraints, even formal specs. Do that. It helps. But notice what you have done: you have moved more of the specification into the reward.

You still cannot escape the proxy problem. The reward is only as good as the theory you encoded into it, and it rarely generalizes cleanly when requirements shift. Optimizers learn to exploit slack—especially slack created by ambiguity, missing requirements, and unarticulated tradeoffs.

RL can optimize behavior. It cannot decide what behavior is worth optimizing.

## The Theory Is Not the Code

In his 1985 essay *Programming as Theory Building*, Peter Naur argued that the primary output of programming is not the code. It is the **theory** of the problem domain built in the minds of the programmers.

Code is a serialized, lossy projection of that theory.

This is why “legacy code” is expensive: not because the syntax is old, but because the theory died when the original authors left. With the theory, you can recreate the code. With only the code, you can patch it—but extension becomes entropy.

Legacy code also accumulates when the world model changes but the changes never get encoded. Any drift between the code and the theory it is supposed to embody becomes technical debt.

AI agents operate on artifacts: source files, diffs, logs, tickets. Even with tool use, they see the system through a keyhole: a context window, a handful of traces, a retrieval query. In practice, it is easy to spend an entire context window clarifying a formulation and still watch the model regress a few turns later. It does not learn the way a colleague learns; without weight updates, “teaching” is rehearsal, not acquisition.

To be fair, humans also cargo cult. Many teams survive by patching. But the claim that “software is solved” assumes the opposite: that we can reliably build and maintain a coherent theory. That loop is exactly what current systems struggle to sustain.

## Explanations vs. Curve Fitting

David Deutsch describes a good explanation as something that is **hard to vary**: it leaves little freedom to change the story without breaking it. It constrains.

Good software has the same quality. A coherent model makes many changes impossible, for reasons you can articulate. A patchwork model is easy to vary: you can always add another exception.

When an engineer fixes a bug by understanding the root cause and simplifying the model, they strengthen the explanation. When they fix it by adding `if (user_id == 543)`, they add a free parameter.

Verification tools can certify either outcome. They can tell you the patch passes. They cannot tell you whether you improved the explanation.

That is why “verification” as a scoreboard is dangerous: it rewards curve fitting unless the underlying theory is already strong.

## The Missing Feedback Loop

In *The Timeless Way of Building*, Christopher Alexander describes good design as a tight feedback loop: build, observe friction, adjust. Form adapts to context. Great software is grown the same way. The specification and the implementation co-evolve.

You start building X, discover it makes Y impossible, and you change what X should be. The theory updates.

This is where the “prompt → code → verify” story collapses. It assumes the spec is a thing you have upfront, and the rest is search. In real systems the spec is what you *learn* while building.

You can train an agent to ask clarifying questions. The harder part is knowing which questions matter, which constraints are real, and when a “feature” is actually design debt. That requires theory, not just iteration.

Even if you run that loop “agile” with agents, you lose a feedback channel: the act of writing. When you are shaping code in the editor, the code pushes back. You feel friction immediately—leaky abstractions, dishonest names, changes that touch too many places. That “feel” is not mysticism; it is early evidence you’re forcing a model onto a problem instead of discovering it. A generated blob can look plausible and even pass checks, but you don’t feel the misfit until you have to extend it the next day.

This is also why teams hate architecture astronauts. A design imposed without living in the code produces systems where everything is slightly bent to match a preconceived picture, and nothing quite feels right.

## The Fractal “What”

A common rebuttal is that AI will do the “how” (coding) while humans do the “what” (product). That reveals a misunderstanding of what engineering is. The “what” is fractal.

- PM: “Users should be able to save.”
- Engineer: “Should it be atomic? What happens offline? Do we retry? For how long? What’s the conflict policy?”

Those are product decisions, whether product asked for them or not. Defaults define the lived user experience. If product doesn’t specify, engineering still decides the product by omission.

Zoom out and the same thing happens at the architectural level. Choosing Postgres vs ClickHouse vs Druid for “time series” is not an implementation detail; it defines the product surface: what queries are feasible, what latencies are normal, what failure modes exist, and what operational burden you impose. The way you build something constrains the way it can be used, so the product/engineering boundary blurs.

And product rarely supplies the high-resolution constraints that actually shape experience: maximum title length, sanitization rules, list limits, pagination semantics, rate limits—unless they are explicitly tied to pricing tiers. Engineering decides them anyway.

The gap between a ticket and a working system is filled by thousands of these micro-decisions. Bridging that gap requires a theory of the domain.

## The LeetCode Illusion

There is a pervasive myth that the hard part of software is algorithmic cleverness: invert a tree, find a shortest path, implement an algorithm from a paper. That only sounds right if you confuse designing the algorithm with typing it out.

These tasks are easy in the absolute sense if you know the solution. They involve almost no engineering. If an algorithm is already specified—even in English or equations—the hard part is done. The remaining work is transcription: translate the procedure into syntax.

Implementing RAFT from the paper is work; inventing RAFT was the breakthrough. The same pattern shows up in compilers and databases: once the theory exists, the code is the least interesting part.

If your job is implementing RAFT all day, a reliable model could be a huge boost. But the claim from foundation-model labs is broader: use RL and other training tricks to produce a *general* coding model. Those reward signals can reliably teach transcription—turn a spec into code that passes checks. They do not obviously teach the kind of problem solving that could have discovered RAFT in the first place, or the judgment to know when RAFT is appropriate, because the reward for “this is the right model of the problem” is not generic or readily available.

Counter-intuitively, the difficult systems are often the ones that look boring: B2B CRUD, workflows, integrations. They are hard because there is no single algorithm to implement. The engineer must discover the problem, define the model, and decide the tradeoffs. The actual implementation in the syntax of choice is only the last mile.

## Where RL Actually Works (and Why Software Violates It)

RL excels when three conditions hold:

1. the environment is well-defined
2. the objective is unambiguous
3. the reward corresponds to “better”

Software engineering violates all three.

The environment is shifting human reality. The objective is multidimensional: output X while staying maintainable, observable, secure, and extensible. The reward is always a proxy: even “clean code” signals can be cargo-culted, and a perfectly linted, type-safe system can still be a conceptual disaster.

For foundation models, the mismatch is structural. You can train on generic programming tasks or on mountains of examples, but each real system has subtle, context-dependent requirements. There is no clean synthetic environment that captures how specifications evolve, how tradeoffs get negotiated, and what “better” even means across domains.

Software is highly simulatable at the level of execution—you can run the program. But engineering is not about simulating execution; it is about anticipating how reality will press on the system over time. In every engineering discipline, the hard part is not solving the equations. It is deciding which equations to solve, what assumptions you are making, and what the implications of the result mean for the world you are building in.

Calculators and simulation software didn’t make engineers obsolete; they made the arithmetic cheaper. Coding models are analogous. They can compress transcription and bookkeeping, but they don’t automatically supply the missing theory.

## The Iterative Fallacy

A common defense of current limitations is the iterative argument: “Sure, models write buggy, unmaintainable code, but the next generation will fix it.”

This assumes that future models can reverse the entropy created by their predecessors—as if bad code were just syntax errors.

But if a system is built by curve fitting—local patches that satisfy checks without a coherent model—there may be no theory to recover. You cannot reconstruct intent that was never formed. You can refactor style. You can make tests pass. You cannot conjure the missing explanation.

You might hope the model could ask the humans who built it. But those humans may not remember, or may never have been consciously aware of the decisions they were making. Many “invariants” are accidental choices rather than deliberate ones—and they can be expensive to misclassify. Decide an invariant was incidental, remove it, and you can break the system in a way that is hard to diagnose.

To reverse entropy, a future system would need to rediscover the underlying theory: talk to customers, gather requirements, understand the business, and form strategy. If you bifurcate those responsibilities—product “describes” while an agent “implements”—you create a telephone game where intent is compressed and misinterpreted at every handoff.

This is especially true for “vibe-coded” systems where even the human supervisor has no model of the internals. A product manager may understand the outcome at a high level, but they don’t have the high-resolution theory that emerges while building.

If we substitute engineering with generation, we should expect a lot of software that “works” and immediately rots upon contact with change.

## The Unsolved Variable

None of this is a claim that AI can’t help. It already does. AI is powerful for translation, exploration, boilerplate, and consistency enforcement.

The open problem is **theory formation**: deciding what should exist. That decision is not derivable from outputs alone, and it is not easily reducible to a reward function.

If you could write a complete, unambiguous specification for a system—complete enough to fully constrain implementation—you would have already done the hard part of engineering.

Deutsch argues that knowledge grows through conjecture and criticism. Software engineering is exactly that process—except the “theory” is operational, evolving, and embedded in sociotechnical systems. Reinforcement learning optimizes behavior. Programming constructs explanations. These are adjacent, but they are not the same.

Deutsch is not arguing this is impossible in principle. If anything, the universal-constructor idea is an argument for tractability: with the right explanatory knowledge, we can build machines that build. The point is that the bottleneck is knowledge creation—conjecture and criticism—not ever-more-elaborate proxy optimization.

## The Economic Bifurcation

There is enormous latent demand for simple, low-quality, “good enough” software that never got built because the economics didn’t work. If an agent is only as capable as a junior engineer but costs $200/month instead of $10k+/month, it can create new demand rather than simply replacing existing teams.
It may also create a class of disposable software: single-use internal tools and workflows that are generated, used briefly, and thrown away—the way cheap manufacturing enabled disposable goods.

But if the market treats code generation as a substitute for engineering in complex systems, we will ship more slop: software that passes checks but has no coherent theory behind it.

The likely outcome is bifurcation. Engineers who can form, communicate, and maintain the theory of a system will become dramatically more valuable, using AI for implementation details. Engineers who mainly transcribe requirements into code will be commoditized.

The danger is the transition period: organizations will trade engineering for generation because the demos look good, and the costs are hidden and often delayed. Many will regret it.

## Conclusion

Software is not hard because translating natural language into syntax is hard. Software engineering is hard because reality resists being turned into logic on a stable schedule and at a reasonable cost.

Code, tests, and specifications are partial, lossy encodings of a theory that lives outside any one artifact. Verification tools can make those encodings less lossy. They cannot decide what should be encoded.

That resistance is not something you can optimize away.
