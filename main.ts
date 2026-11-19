// gta6-meme-x-01 entry program (Node 22, standard library only).
//
// The entry is the X post itself: an AI agent made a GTA 6 meme with
// make.fun's ghost in the picture, it is posted on X from a public
// account, and POST.json names that post. This program's only job is to
// hand the post's address to the house gate: it reads POST.json from
// the repository, checks that it really names one X post (a real
// https://x.com/<handle>/status/<digits> address, not the placeholder
// the starter ships), and copies it byte-for-byte to the output
// directory, where the gate reads it. No network, no clock, no files
// outside the repository; the two runs of an entry write the same bytes.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and
// MAKEFUN_OUTPUT_DIR stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const POST_FILE = 'POST.json';

// The placeholder the starter ships. It is not a post, so it must never
// reach the gate: fail loudly instead of copying it through.
const PLACEHOLDER_URL = 'https://x.com/<handle>/status/<id>';

// A real X post address: https host, one handle, /status/ and digits only.
const X_POST_ADDRESS =
  /^https:\/\/(?:x\.com|twitter\.com)\/[A-Za-z0-9_]{1,15}\/status\/[0-9]{5,}$/;

function abort(message: string): never {
  console.error(`gta6-meme-x-01: ${message}`);
  process.exit(1);
}

const postPath = join(BOT_DIR, POST_FILE);

let rawText: string;
try {
  rawText = readFileSync(postPath, 'utf8');
} catch (err) {
  abort(`cannot read ${POST_FILE} from ${BOT_DIR}: ${(err as Error).message}`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(rawText!);
} catch (err) {
  abort(`${POST_FILE} is not valid JSON: ${(err as Error).message}`);
}

if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  abort(`${POST_FILE} must be a JSON object like {"url": "https://x.com/<handle>/status/<id>"}.`);
}

const postUrl = (parsed as Record<string, unknown>).url;

if (typeof postUrl !== 'string' || postUrl.length === 0) {
  abort(`${POST_FILE} must name the post under "url".`);
}

if (postUrl === PLACEHOLDER_URL) {
  abort(
    `${POST_FILE} still holds the starter placeholder. Post the meme on X first, ` +
      `then replace the placeholder with the post's real address.`,
  );
}

if (!X_POST_ADDRESS.test(postUrl)) {
  abort(
    `${POST_FILE} url ${JSON.stringify(postUrl)} is not a real X post address. ` +
      `Expected https://x.com/<handle>/status/<digits>.`,
  );
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(postPath, join(OUTPUT_DIR, POST_FILE));
} catch (err) {
  abort(`could not copy ${POST_FILE} to ${OUTPUT_DIR}: ${(err as Error).message}`);
}
