import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// First thought, no second draft: the person at every table who explains
// things they have never studied, in full confidence. Sixteen letters of
// polite accusation — surprising, vivid, and funny on the second look.
const WORD = "ultracrepidarian";

const MIN_CHARS = 1;
const MAX_CHARS = 24;

function validateWord(word: string): void {
  if (word.length < MIN_CHARS || word.length > MAX_CHARS) {
    throw new Error(`word must be ${MIN_CHARS}-${MAX_CHARS} chars, got ${word.length}`);
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be exactly one word, no whitespace allowed");
  }
  if (word.trim() !== word || word.length === 0) {
    throw new Error("entry must not be empty or only whitespace");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
validateWord(WORD);
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, WORD, "utf8");

// Round-trip: the file on disk must be byte-identical to the word.
const written = readFileSync(outPath, "utf8");
if (written !== WORD) {
  throw new Error("round-trip check failed: entry.txt does not match the word");
}
console.log(`wrote ${written.length} chars to ${outPath}: ${written}`);
