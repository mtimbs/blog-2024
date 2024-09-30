---
    title: "Musings on Technical Risks at Venture Backed Companies (Draft)"
    description: "There is a lot written about technical debt in software. I've spent a lot of time trying to understand how it impacts growth dynamics at venture backed startups."
    pubDate: "2024-09-30"
    status: "published"
---
<details>
  <summary> TL;DR</summary>
  There is real risk in failing to innovate and build. Growing too slow may be a slow death, but it is a very real failure mode. If you have a lot of technical debt in your product, throwing it away and starting again may be risky, but it may be less risky in the long term than persisting with a broken foundation.
</details>

I have spent my entire career working for venture backed software companies. Series A, Series B, IPO, Aquisition. I've been through <s>it all</s> a lot. I've seen failures and wild success. One constant at every company has been <mark>technical debt</mark>.

Technical debt is a tricky subject. One that brings forth a range of emotions from developers. Often with very strong emotional responses to the best way to deal with it. Part of the problem is it means different things to different people - something I am not going to try to solve here. But for some clarity on the matter I am talking about the kind of technical debt that stops you doing X because you did Y, or because X is too brittle it will take a year to make this small change. I am very explicitly not talking about rebuilding a Rails app in Rust.

## The peculiarities of Venture Capital
VC backed software companies are very different to bootstrapped ones when it comes to success metrics. In the VC world there is (at the very least) an implicit expectation of high growth. Most VC's don't have to squint too hard before companies that fail to grow are simply considered failures. The entire VC model is built around power laws - and they allocate accordingly.

To put this in perspective, consider a SaaS company doing $15M ARR, with a $2M operating profit, growing at 10% YoY.

As a bootstrapped business you would be thrilled with this result. There is profit to re-invest or take off the table and you have enough of a buffer to hopefully keep the business afloat for a while.

As a venure startup the story is a little different. You've built an objectively good business but is the growth there to reach $100M ARR and higher? These are the lofty goals required by the VC power law investment model. You probably need to be growing at 25% YoY while maintaining those profit margins - but more likely forsaking profit altogether in exchange for a >200% YoY growth.

## The risks of technical debt (that I care about)

Technical debt impacts the growth equation __a lot__. Product development is not only necessary for serving larger segments of the market - it is also essential for guarding against competitors. In my experience, technical debt is the #1 contributor to (lack of) velocity of product development.

The biggest problem with technical debt is that it grows __superlinearly__. At some point you have so much of it that you stop worrying whether 10% YoY growth is enough, and you start worrying about how many years you can survive while churning 20% of your revenue each year.

The biggest risk I see for technical debt is that you **simply cannot grow** anymore - at least economically. Some companies have found a way to suceed with horrible software. Usually this is because margins are so high, or market capture is so strong that they can grow **despite** these flaws. Perhaps they'd be 10x more sucesful if they had better code. It's hard to say. One thing I do believe is that it is getting harder to succeed with bad software. The bar is rising every year and competitiveness is increasing.

I forsee a growing number of companies fading into obsolesence. Not going broke but not doing well enough to justify their existence any longer. This is the fate that I see for companies that don't address their tech debt.


## An unconventional view on re-writes

Many very experienced devs will tell you that re-writes are fraught with danger and that any engineer proposing re-writes should be politely sent back to the kiddy table. Merely suggesting a re-write can be seen as a red flag. But here is my controversial opinion on the matter:

> Re-writes are essential for success and longevity. You should be doing them more often. If you aren't doing at least __one major re-write per year__ then you likely aren't iterating enough. Most re-writes fail because most developers are not experienced with them - not because they are fundamentally bad

I recently came across a great article that mirrors these thoughts -[Skin-Shedding Code](https://registerspill.thorstenball.com/p/skin-shedding-code). In a similar vein, Jonathon Blow has a concept called [Sledgehammer programming](https://www.youtube.com/watch?v=ubWB_ResHwM). I am fully on board with this general idea and tend to just call it a <mark>re-write</mark>.

Far too many companies and engineers simply bolt on new features to their product. Every new feature, every tweak to behaviour, every single change is an explicit update to the scope and nature of the product. They really should be given the respect they deserve. Don't make them exogenous, consider how you woul have built the product with the new features in from day 1. Do this constantly in a never ending feedback loop and you will avoid technical debt.

Unfortunately, some software is so far gone that this approach becomes very difficult. This approach works well when you do it very frequently and the team can develop experience with the approach. But what do you do when things are so far gone that you are faced with the dreaded "big bang" re-write? My take is that if you find yourself in this spot then you're already dead - you just don't know it yet. You have three viable options:

- Go into PE mode. Cut all overheads in the business and pivot to maximum value extraction. Get every dollar you can out of the business before it dies.
- Rebuild and start again with all the knowledge and benefits of hindsight.
- Exit. Sell the business and go work on something with a chance of success


## Programming as Theory Building
If you are unfamiliar with the paper by Peter Naur [Programming as theory building](https://pages.cs.wisc.edu/~remzi/Naur.pdf) then I highly recommend it. In my opinion, it is one of those most crucial and fundamental insights into software development. This is based on my own experiences in the field (I'd been building software for close to 10 years before I discovered the paper). I'm going to summarise some of the key take aways here but I highly recommend that you go and read the paper if you are unfamiliar.

- Software will almost always be modified and evolve.
- Software decays when programmers make modifications to it without a proper grasp of the underlying theory of the software (e.g. the domain/product)
- If you view software modifications to merely be the change of the external behaviour, there is usually many different ways to realise these chages - all of them correct.
- Software should be more than a collection of requirements. It should be built as a theory of how certain affairs of the world will be handled by, or supported by a computer program.
- You should not seperate the theory from the code.

And perhaps most importantly to this discussion:

> The Theory Building View suggests, the existing program text should be discarded and the new-formed programmer team should be given the opportunity to solve the given problem afresh. Such a procedure is more likely to produce a viable program than program revival, and at no higher, and possibly lower, cost. Building a theory to ﬁt and support an existing program text is a difﬁcult, frustrating, and time consuming activity. The new programmer is likely to feel torn between loyalty to the existing program text, with whatever obscurities and weaknesses it may contain, and the new theory that he or she has to build up, and which, for better or worse, most likely will differ from the original theory behind the program text. Similar problems are likely to arise even when a program is kept continuously alive by an evolving team of programmers, as a result of the differences of competence and background experience of the individual programmers, particularly as the team is being kept operational by inevitable replacements of the individual members.




## A thought experiment
Do you worry about new competitors replicating your product? Why? Why not?

If you answered __no__ and your reasoning was because of branding or sales process or existing market entrenchment then I would ask you to put those aside for a second. They are all very legitimate moats and crucial parts of a healthy business, but I really want to hone in on product.

*What if you could hard fork the universe today and run an expiriment?*

In one universe your business continues to run as it is. You work around technical debt as best you can and make "pragmatic choices" about what you can and can't build. You take the safe path, the well trodden path, the path that if you fail nobody can blame you for the outcome.

In another universe, you get to take a gamble and rebuild your entire product from scratch. You get to see what can be, unburdened by what has been. You have the knowledge and experience of your team. Your understanding of the market and positioning, the existing customer base and brand awareness. All of it comes with you. But you get a clean slate on the product side

You don't merely try to recreate the existing product with new code. You get to question everything. You can start asking
- What can we stop supporting?
- What should fundamentally change?
- What features are now possible to build?
- How should we price and charge for this product?
- What does the winner in this space look like in 5-10 years?
- Should we structure the company different in terms of staff?
- Should we target a different segment or position ourselves differently?

Have fun with this experiment. Think of all the things you might like to change if you were free from having to support the functionality of existing customers. Pretend you put the existing product on ice and just let it run with no updates and just support. Some customers may not want to migrate to the new product when it's ready but who cares. Drop them or just support a small scale secondary product.

Now ask yourself in which universe is the company likely to be in a better position over varying time horizons. 1,3,5,10 years out etc. Don't only consider P(survival) but also consider the ceiling each company could achieve. After all you are in the game of winning big.
