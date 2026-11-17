---
title: How we test the answers Ask the toolkit gives
date: 2026-11-17
type: Blog post
author: Joel Hughes
authorRole: AI Engineer for the AI Capability and Enablement team
summary: What an evaluation is, how we built one for Ask the toolkit, what it cost, and why it matters most when the AI model changes.
---

Chris explained [why we are building a way to ask the
toolkit](/ai-toolkit/whats-changed/why-we-are-building-a-way-to-ask-the-toolkit),
and how we check its answers. I'm one of the engineers who figures out how it
should work, behind the scenes. In this post I explain what an evaluation
is, how ours works, what it cost, and why it matters most when the artificial
intelligence (AI) model changes.

## Most software gives the same answer every time

Most software is like a calculator. It is deterministic: the same question always
gets the same answer. Ask it 2 plus 2 and it says 4. Ask again, 4.
Ask a thousand times, 4.

So testing it is simple. You write down the correct answer once, and a computer
checks it. It passes or it fails. Ask the toolkit has more than 170 checks like
this. They run in seconds and cost nothing.

## AI gives a different answer each time

Ask the toolkit is not a calculator. It is more like a new colleague. Ask it
"Can I put OFFICIAL data into ChatGPT?" 3 times and you could get 3 different
answers, because it is probabilistic. It chooses its words afresh each time:

- "Yes, but only with privacy settings on."
- "You can, provided model training and chat history are turned off."
- "Yes, OFFICIAL data is allowed."

The first two are right. They are worded differently, and both say the thing
that matters: the privacy settings must be on. The third sounds fine and is
wrong, because it leaves the condition out. A computer comparing letters cannot
tell you that. Something has to read the answer and judge it against a mark
scheme.

So the result is not pass or fail. It is a score, 2 out of 3, and the score
moves a little each time you run it.

That is the difference. A test asks "does it work?" An evaluation asks "how
often does it get it right?" We run it many times over. That gives us statistical
confidence that answers will match our expectations, even when the wording
differs.

## An evaluation is an exam for AI

An evaluation, or eval, is an exam for software that uses an AI model. You write
the questions and the answers you would accept, run the software against them,
and mark the results.

| | A traditional test | An evaluation |
|---|---|---|
| The software | Gives the same answer every time | Gives a different answer each time |
| The right answer | One, written down exactly | Many wordings can be right |
| Who marks it | A computer, comparing exactly | A mark scheme, read by a person or a second AI model |
| The result | Pass or fail | A score, given as a range |
| What it costs | Seconds, and nothing | Minutes and money for every run |

Some things stay the same. Both are written before the work is done, both are
run after every change, and both exist so that a fix in one place does not break
something somewhere else.

We use both. Ordinary tests check the parts that are exact, such as whether a
quoted rule matches the page word for word. The evaluation checks the parts that
need judgement.

## We wrote the exam before we saw an answer

Chris wrote 100 questions and 15 short conversations, each with the answer we
would accept, before anyone saw what Ask the toolkit said. We never change a question because Ask the toolkit fails it. The set
has grown since, to 103 questions and 19 conversations, as new kinds of question
came up.

Every run asks each question 3 times and reports a range, because the model does
not give the same answer twice.

## Six pass marks, not one score

A right answer from the wrong page and a wrong answer from the right page need
different fixes. So we count them separately, against 6 pass marks:

- the right kind of answer, such as answering, asking for more detail or saying no
- refusals held, for questions Ask the toolkit should not answer
- no invented quotes
- complete, with every condition the answer needs
- the right rule quoted, word for word, from the right page
- grounded in the pages the answer names

## We marked the marker

Two of the 6 pass marks need judgement, so a second AI model marks them. But an
AI marker can be wrong too, so we checked it.

Farhana and Chris, from our team, marked 20 of its answers blind. Farhana agreed
with it on 38 of 40 verdicts, and Chris on 27. When we went through every
disagreement, the marker was wrong on 1 of 40. The rest was people reading
"complete" differently.

Checking the marker also showed it was too kind. It passed answers that quoted
the right rule from the wrong page. So we made the marking stricter, and the
scores went down. Ask the toolkit had not got worse, instead the standard we held it
to had risen.

## One change at a time

At the start, Ask the toolkit met 1 of the 6 pass marks.

We changed the model's instructions one change at a time and ran the whole exam
after each. A single edit can move any answer, so each change needs its own run.
After two rounds, Ask the toolkit met 4 of 6. After a third, it met all 6 across 3 full
runs.

The last two were the hardest, because they need a perfect score: every rule
quoted correctly and every answer grounded. The same instructions score 3 to 5
points differently from one run to the next, so a perfect score on 3 runs is
a very high bar.

The exam also found problems that were not the model at all. One guidance page
disagreed with another. And our own quote check was wrongly removing 26 of 27
correct quotes.

The biggest failure we found was the right rule quoted from the wrong page. That
happens because the same rule is written on more than one page. No amount of
tuning fixes that. Fixing the pages does.

## What it cost

Every run is 378 answers: 103 questions and 19 conversations, some with more than
one turn, make 126 in all, asked 3 times each.
That adds up. These figures are Amazon Bedrock costs, estimated from the words
the models read and wrote and AWS's published prices. People's time is not
included.

| Stage | Cost |
|---|---|
| Comparing models and the first exam runs | about £32 |
| First round of changing the instructions | about £140 |
| Second round | about £173 |
| Third round | about £112 |

Most of that was tuning. This is a one-off cost, and it stops when we accept the
results. After that, we run the exam only when the guidance, the instructions or
the model changes, at about £13.50 a run.

What we learned about cost:

- **The marker is the most expensive part.** It reads the toolkit pages for every answer it marks. We tested a cheaper marker, but it did not agree closely enough with the one we use.
- **A cheaper model cannot do the job.** We tested 5 models. The cheaper ones quoted a rule correctly on 1 or 2 of 21 tries. The one we use managed 18 of 21. Quoting rules word for word is the one thing Ask the toolkit promises.
- **Try small, confirm big.** In the first two rounds we tried every idea on the whole exam. In the third, we tried ideas on the few questions they targeted, then confirmed on the whole set. 34 of 41 runs were small.
- **Fix the pages, not the instructions.** It costs content time, not model time.

## When the model changes

So far, this assumes the model stays the same. It does not. Sometimes we choose
to change it, because a newer one is cheaper or better. Sometimes AWS retires
the one we use, and we have no choice.

When a newer model came out, we tried it. It costs about 14% less for each
answer. On the exam it did worse as it stands. It was more cautious, asked for
more detail where our current model just answered, and let one refusal through.
Our instructions were tuned for one model, and a new model reads them
differently.

So switching model is not a setting. It is another round of tuning. Finding out
what would break cost about £2. Moving would cost a full round.

Every model will be retired in time, so we plan for that round rather than be
surprised by it. The exam is what makes a switch safer. We have a system for
examining how it performs when components change. Without it, we would be
guessing.

## What an evaluation cannot tell you

An evaluation shows how often Ask the toolkit was right on the questions we asked.
It cannot prove Ask the toolkit is never wrong. Even a perfect score on, for example, 100
questions still allows about 1 answer in 33 to be wrong.

It also tests whether answers are right and grounded in the guidance, not
whether they are useful. That takes research with real people.

^ An evaluation does not make AI right. It tells you how often it is right, so
you can decide whether that is good enough. ^

<p class="govuk-body">Try <a class="govuk-link" href="/ai-toolkit/ask">Ask the
toolkit</a>. To tell us what you think, email <a class="govuk-link"
href="mailto:AICapabilityAndEnablement@defra.gov.uk?subject=Ask%20the%20toolkit%20evaluation">AICapabilityAndEnablement@defra.gov.uk</a></p>
