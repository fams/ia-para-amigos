const assert=require('node:assert/strict');
const fs=require('node:fs'), path=require('node:path'), vm=require('node:vm');
const publicDir=path.join(__dirname,'../public/flappy-canonical');
const source=fs.readFileSync(path.join(publicDir,'index.html'),'utf8');
class TestElement{
  constructor(text=''){this.textContent=text;this.events={};this.classList={toggle:()=>{}};this.attributes={};this.parentElement=this;this.value='';}
  addEventListener(type,f){this.events[type]=f}
  getAttribute(key){return this.attributes[key]}
  setAttribute(key,value){this.attributes[key]=value}
  get valueAsNumber(){return Number(this.value)}
  getContext(){return {}}
  focus(){}
}
const ids=Object.fromEntries([...source.matchAll(/id="([^"]+)"/g)].map(match=>[match[1],new TestElement()]));
ids.mode.value='network';ids.speed.value=.48;
const edges=Array.from({length:4},()=>new TestElement());
let drawCount=0;
const scope={
  document:{getElementById:id=>ids[id],querySelector:q=>edges[Number(q.match(/"([0-3])"/)[1])]},
  window:{location:{search:''}},
  requestAnimationFrame:()=>{},drawTrack:()=>{drawCount++},URLSearchParams,structuredClone,console
};
vm.createContext(scope);
for(const file of ['engine.js','ui.js'])vm.runInContext(fs.readFileSync(path.join(publicDir,file),'utf8'),scope,{filename:file});
const inspect=scope.window.inspectFlappy;
assert.match(ids.reading.textContent,/Prévia do quadro 1/);
assert.equal(ids.decision.textContent,'Não bater');
ids.step.onclick();const noFlap=inspect();
assert(noFlap.y>200);
assert.equal(ids.applied.textContent,'Não bater · rede');
assert.match(ids.reading.textContent,/Quadro 1/);
ids.reset.onclick();
ids.w3.value='0';
ids.w3.events.input({currentTarget:ids.w3});
assert.equal(ids.decision.textContent,'Bater a asa');
assert.equal(ids.applied.textContent,'Ainda não executada');
assert.equal(ids.e3.textContent,'b = 0');
ids.step.onclick();const flap=inspect();
assert(flap.y<200);assert.deepEqual(noFlap.last.inputs,flap.last.inputs);
assert.equal(ids.applied.textContent,'Bater a asa · rede');
ids.reset.onclick();ids.zero.onclick();ids.step.onclick();
assert.equal(inspect().last.network.z,0);assert(inspect().last.jump);
ids.reset.onclick();ids.preset.onclick();ids.mode.value='human';ids.mode.onchange();
ids.game.events.keydown({code:'Space',preventDefault(){}});
assert(!inspect().last.network.jump);assert(inspect().last.jump);
assert.equal(ids.applied.textContent,'Bater a asa · manual');
assert.equal(ids.value.textContent,0);
assert(drawCount>=8);
console.log('UI contracts pass: change slider -> actual motion on same scene, distinguish preview vs execution, zero tie, manual overrides prediction');
