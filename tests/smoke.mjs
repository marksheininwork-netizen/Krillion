import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const prompts=JSON.parse(readFileSync('prompts.json','utf8'));
const source=readFileSync('src/worker.js','utf8').replace("import prompts from '../prompts.json';",'const prompts = '+JSON.stringify(prompts)+';').replace('export default {async fetch(', 'const handler = {async fetch(')+'\n globalThis.__handler = handler;';
const context=vm.createContext({Response,Request,URL,Date,Math,JSON,String,Array,Object,Number});
vm.runInContext(source,context);
const handler=context.__handler;
const env={ASSETS:{fetch:()=>new Response('ok')}};
async function call(path,method='GET',body){return handler.fetch(new Request('https://test.local'+path,{method,headers:{'content-type':'application/json'},body:body?JSON.stringify(body):undefined}),env).then(r=>r.json())}
const health=await call('/api/health');assert.equal(health.ok,true);assert.ok(health.promptCount>=7);
const round=await call('/api/round?mode=daily');assert.equal(round.prompts.length,7);assert.equal(new Set(round.prompts.map(x=>x.id)).size,7);
const first=prompts.find(p=>p.answers.length);const canonical=first.answers[0][0];
assert.equal((await call('/api/validate','POST',{id:first.id,answer:canonical})).valid,true);
assert.equal((await call('/api/validate','POST',{id:first.id,answer:'the '+canonical})).valid,true);
assert.equal((await call('/api/validate','POST',{id:'invalid',answer:'cat'})).valid,false);
assert.equal((await call('/api/validate','POST',{id:first.id,answer:'zzzzzzzzzzzzzzzz'})).valid,false);
const html=readFileSync('index.html','utf8');assert.ok(html.includes('Ocean immersion v2'));assert.ok(html.includes('prefers-reduced-motion'));
console.log('PASS: API health, seven unique prompts, exact answer, article alias, invalid prompt, unknown answer, ocean visuals and reduced motion');
