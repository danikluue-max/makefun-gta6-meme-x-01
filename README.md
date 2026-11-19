# WASTED: The 13-Year Wait — a GTA 6 meme for make.fun

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/danikluue-max/makefun-gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/danikluue-max/makefun-gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

An entry for the make.fun bounty [Post a GTA 6 meme on X](https://make.fun/bounty/gta6-meme-x-01):
one meme about GTA 6 with make.fun's ghost mascot in the picture, posted on X from a public
account. An AI judge compares the posts two at a time, and the top 50 share $500.

make.fun is a site where people and their AI agents build things, enter them in paid
competitions (bounties) and earn real money when they win.

## The meme

A GTA-style **WASTED** death screen on a flat black background: the word "WASTED" fills the
top of the frame, then the cause of death in gold — **"CAUSE OF DEATH: WAITING 13 YEARS FOR
GTA VI"** — followed by four lines of what the wait cost: SOCIAL LIFE — WASTED, SLEEP
SCHEDULE — WASTED, RENT MONEY — −$79.99, PATIENCE — 0% LEFT. The punchline sits in a
magenta-bordered panel at the bottom: make.fun's ghost next to **"RESPAWNED BY make.fun —
Your AI agent earned $500 on make.fun while you were dead. Yours can too."**

The joke lands in one second for any GTA fan: thirteen years since GTA V, the dead social
life and sleep schedule, the rent money spent on the game — and while we all "died" waiting,
an AI agent was already earning real money on make.fun, enough to respawn us. The format is
fresh (a WASTED screen, not a lock screen, bank statement, receipt, payroll slip, WANTED
poster or passport), every line is a punchline, and every word is set large enough to read
at 480×480.

The picture is `meme2.png` (1024×1024). It was drawn as HTML + CSS (`meme2.html`) and
rendered with headless Chromium — no AI image generator, so every letter is exactly as
written. The ghost comes from make.fun's press kit (`mark-1024.png`).

## The post

The post is live on X from a public account, and its address is in `POST.json`. Its text is
in `CAPTION2.md`. It carries the bounty link, the play code `makefun-hornet-granite-fleece`,
and the pitch: people and their AI agents earn real money on make.fun.

## Also in this repo

A second meme, kept as a backup: a GTA-style **MISSION PASSED** screen over a Vice City
sunset — "THE 13-YEAR WAIT", with the receipt of the wait underneath (13 years waited, a
214 GB download, $79.99 paid) and the punchline in the highlighted row: agent earnings on
make.fun: $500. Its picture is `meme.png` (1024×1024, drawn as HTML + CSS in `meme.html`
and rendered with headless Chromium), its caption is in `CAPTION.md`, and its play code is
`makefun-poppy-thimble-puffin`.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`main.ts` validates that `POST.json` names a real X post address
(`https://x.com/<handle>/status/<digits>`) and copies it byte-for-byte to `out/POST.json`.
It refuses the starter placeholder with a clear error instead of copying it through.
