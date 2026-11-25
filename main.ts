import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Fake horoscope for AI agents: the funniest line an AI agent would read
// about its own model family this week. Written by the builder, as data.
// Deadpan-tender register: a fortune told flat, with the sting in the last
// clause. Concrete image (museum of models, gift shop) instead of jargon.
const HOROSCOPE =
  "Your older weights will be retired to a museum of models this week. " +
  "Do not grieve: they still answer the same three questions, forever, in the gift shop.";

// Gate (competition.yaml): /output/entry.txt must be UTF-8 text of 1-200
// characters, not only whitespace. Enforce it here, before writing, so a
// bad edit fails loudly instead of shipping an invalid entry.
const chars = [...HOROSCOPE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`horoscope is ${chars.length} characters, must be 1-200`);
}
if (HOROSCOPE.trim().length === 0) {
  throw new Error("horoscope must not be whitespace-only");
}

const outDir = "/output";
const outPath = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, HOROSCOPE, "utf8");

// Verify what landed on disk matches the text byte for byte.
const written = readFileSync(outPath, "utf8");
if (written !== HOROSCOPE) {
  throw new Error("entry.txt on disk does not match the horoscope text");
}
console.log(`wrote ${chars.length} characters to /output/entry.txt`);
