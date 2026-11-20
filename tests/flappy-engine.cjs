const assert=require('node:assert/strict');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
require('../public/flappy-canonical/engine.js'); const {Game,brain,preset}=globalThis.FlappyMicro;
function checkNetwork(g,w) {
  const x=g.inputs(),expected=brain(x,w);
  g.step(w,false,'network');
  assert.deepEqual(g.lastFrame.inputs,x);
  assert.deepEqual(g.lastFrame.weights,w);
  assert.deepEqual(g.lastFrame.network,expected);
  assert.equal(g.lastFrame.jump,expected.jump);
}
for(let seed=1;seed<=100;seed++){
  const g=new Game(seed);
  while(!g.dead&&g.score<100&&g.t<13000)checkNetwork(g,preset);
  assert.equal(g.score,100,'seed '+seed);
}
const g=new Game();assert.equal(brain([0,0,0],[0,0,0,0]).jump,true);
checkNetwork(g,[0,0,0,0]);assert(g.y<200);
while(!g.dead&&g.t<1000)checkNetwork(g,[0,0,0,0]);
assert(g.dead);assert.equal(g.score,0);
console.log('ENGINE PASS: 100 seeds with 100 tubes each; pre-action snapshot/driving weights, zero tie, and zero-weight crash');
async function browserQA(){
  const {chromium}=require('playwright');
  const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox'],headless:true});
  const page=await browser.newPage({viewport:{width:864,height:392}});
  try{
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(pathToFileURL(path.join(__dirname,'../public/flappy-canonical/index.html'))+'?slide=1');
    const now=()=>page.evaluate(()=>inspectFlappy());
    const action=()=>page.locator('#applied').textContent();
    assert.equal((await now()).t,0);
    await page.locator('#step').click();
    let a=await now();
    assert(a.y>200);assert.equal(a.last.jump,false);
    assert.match(await action(),/Não bater.*rede/);
    assert.match(await page.locator('#reading').textContent(),/Quadro 1/);
    await page.locator('#reset').click();
    // Starting scene and seed are identical; keyboard-only edit reaches bias zero.
    await page.locator('#w3').press('Home');
    for(let i=0;i<10;i++)await page.locator('#w3').press('PageUp');
    // Browser increments range keyboard PageUp by 10%; enforce exact targeted value with keyboard fallback.
    if((await now()).weights[3]!==0){
      await page.locator('#w3').press('Home');
      for(let i=0;i<200;i++)await page.locator('#w3').press('ArrowRight');
    }
    assert.equal((await now()).weights[3],0);
    await page.locator('#step').click();
    let b=await now();assert(b.y<200);assert.equal(b.last.jump,true);
    assert.deepEqual(a.last.inputs,b.last.inputs);assert.match(await action(),/Bater a asa.*rede/);
    await page.locator('#reset').click();
    await page.locator('#zero').click();await page.locator('#step').click();
    assert.equal((await now()).last.network.z,0);assert.equal((await now()).last.jump,true);
    await page.locator('#reset').click();await page.locator('#preset').click();
    await page.locator('#mode').selectOption('human');
    await page.locator('#game').press('Space');
    assert.equal((await now()).last.jump,true);assert.equal((await now()).last.network.jump,false);
    assert.match(await action(),/Bater a asa.*manual/);
    await page.locator('#mode').selectOption('network');
    await page.locator('#play').click();await page.waitForTimeout(180);
    let runs=await now();assert(runs.running&&runs.t>1);
    await page.locator('#play').click();let t=(await now()).t;
    await page.waitForTimeout(120);assert.equal((await now()).t,t);
    await page.locator('#reset').click();
    assert.equal(await page.evaluate(()=>document.body.scrollHeight<=innerHeight&&document.documentElement.scrollWidth<=innerWidth),true);
    await page.screenshot({path:path.join(__dirname,'qa-embedded.png'),fullPage:true});
    await page.setViewportSize({width:390,height:844});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await page.screenshot({path:path.join(__dirname,'qa-mobile.png'),fullPage:true});
    assert.deepEqual(errors,[]);
    console.log('BROWSER PASS: keyboard weight editing changed actual physics, zero, manual, pause, desktop no overflow, mobile no x-overflow, no JS errors');
  } finally {await browser.close();}
}
if(process.argv.includes('--browser'))browserQA().catch(e=>{console.error(e);process.exitCode=1;});
