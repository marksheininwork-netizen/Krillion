// Run: node --test tests/content.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const prompts = JSON.parse(readFileSync(new URL('../prompts.json', import.meta.url), 'utf8'));
const normalize = (value) => value.normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();

test('prompt bank has at least seven distinct playable categories', () => {
  assert.ok(Array.isArray(prompts) && prompts.length >= 7);
  const ids = prompts.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('all categories have usable hints and unique, valid answer entries', () => {
  for (const prompt of prompts) {
    assert.match(prompt.id, /^[a-z][a-z0-9-]*$/);
    assert.ok(typeof prompt.title === 'string' && prompt.title.trim());
    assert.ok(typeof prompt.hint === 'string' && prompt.hint.trim());
    assert.ok(Array.isArray(prompt.answers) && prompt.answers.length >= 7, prompt.id);
    const seen = new Set();
    for (const answer of prompt.answers) {
      assert.ok(Array.isArray(answer) && answer.length === 2, prompt.id);
      const [word, rarity] = answer;
      assert.ok(typeof word === 'string' && word.trim(), prompt.id);
      assert.ok(Number.isFinite(rarity) && rarity >= 0 && rarity <= 100, word);
      const key = normalize(word);
      assert.ok(key, word);
      assert.ok(!seen.has(key), `Duplicate normalized answer in ${prompt.id}: ${word}`);
      seen.add(key);
    }
  }
});
