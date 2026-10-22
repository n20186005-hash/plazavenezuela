import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import worker from '../worker.mjs';
const html=fs.readFileSync('dist/404.html','utf8');let calls=0;
const env={ASSETS:{fetch:async request=>{calls++;const path=new URL(request.url).pathname;return new Response(request.method==='HEAD'?null:path==='/__missing_error_page__'||path==='/missing'?html:'page',{status:path==='/__missing_error_page__'||path==='/missing'?404:200})}}};
for(const path of ['/404','/404/','/404.html','/404.html/','/missing'])for(const method of ['GET','HEAD']){const r=await worker.fetch(new Request('https://plazavenezuela.org'+path+'?q=a%2Fb&x=1&x=2',{method}),env);assert.equal(r.status,404);assert.match(r.headers.get('X-Robots-Tag'),/noindex/);assert.equal(r.headers.get('Location'),null);assert.equal(method==='HEAD'?(await r.text())==='':(await r.text()).includes('noindex'),true);}
for(const url of ['http://plazavenezuela.org/404.html?q=a%2Fb&x=1&x=2','https://www.plazavenezuela.org/404.html?q=a%2Fb&x=1&x=2']){const r=await worker.fetch(new Request(url),env);assert.equal(r.status,301);assert.equal(r.headers.get('Location'),'https://plazavenezuela.org/404.html?q=a%2Fb&x=1&x=2');}
assert.equal((await worker.fetch(new Request('https://plazavenezuela.org/cookies?q=1'),env)).headers.get('Location'),'https://plazavenezuela.org/cookies/?q=1');assert.equal((await worker.fetch(new Request('https://plazavenezuela.org/cookies/'),env)).status,200);
console.log('PASS actual Worker with mocked ASSETS: explicit aliases/unknown GET/HEAD404/noindex, canonical priority/path/query, page slash301 and normal200.');
const code=fs.readFileSync('public/consent.js','utf8');assert.equal(code,fs.readFileSync('dist/consent.js','utf8'));
const built=fs.readFileSync('dist/cookies/index.html','utf8');assert(built.includes('<html lang="es-VE">'));assert(/<script[^>]*src="\/consent.js"[^>]*defer/.test(built));for(const id of ['analytics','cookie-status','cookie-form','reject-all'])assert(built.includes(`id="${id}"`));
const KEY='pv-cookie-preferences',DENY='pv-analytics-denied',MARK='|pv-analytics-denied|',GA='ga-disable-G-HXM22WWPKP';
function store(map=new Map()){return{map,fail:{},writes:[],getItem(k){if(this.fail.nextRead){this.fail.nextRead=false;throw Error('read once')}if(this.fail.read)throw Error('read');return map.get(k)??null},setItem(k,v){if(this.fail.write||k===KEY&&JSON.parse(v)?.analytics===false&&this.fail.falseWrite)throw Error('write');this.writes.push([k,v]);if(k===KEY&&JSON.parse(v)?.analytics===false&&this.fail.ignoreFalseWrite)return;map.set(k,v);if(k===KEY&&JSON.parse(v)?.analytics===true&&this.fail.lateReadOnce){this.fail.lateReadOnce=false;this.fail.nextRead=true;}if(k===KEY&&this.fail.lateRead)this.fail.read=true},removeItem(k){if(this.fail.remove||k===KEY&&this.fail.keyRemoval==='remove')throw Error('remove');if(!this.fail.ignoreRemove&&!(k===KEY&&this.fail.keyRemoval==='ignoreRemove'))map.delete(k)}}}
function page({local=store(),session=store(),name='',nameFail={}}={}){
 const scripts=[],listeners={},buttons={},checkbox={checked:false},status={textContent:''};
 const c={localStorage:local,sessionStorage:session,document:{getElementById:id=>id==='analytics'?checkbox:id==='cookie-status'?status:['cookie-form','reject-all'].includes(id)?{addEventListener:(_type,fn)=>buttons[id]=fn}:scripts.find(s=>s.id===id),createElement:()=>({}),head:{appendChild:s=>scripts.push(s)}},addEventListener:(type,fn)=>(listeners[type]||=[]).push(fn)};
 Object.defineProperty(c,'name',{get(){if(nameFail.read)throw Error('name read');return name},set(v){if(nameFail.write)throw Error('name write');if(!nameFail.ignoreWrite)name=v}});c.window=c;vm.createContext(c);const initialize=()=>vm.runInContext(code,c);initialize();
 return{c,scripts,local,session,nameFail,checkbox,status,initialize,save:()=>buttons['cookie-form']({preventDefault(){}}),allow(){checkbox.checked=true;buttons['cookie-form']({preventDefault(){}})},deny:()=>buttons['reject-all'](),event:(value,key=KEY)=>(listeners.storage||[]).forEach(fn=>fn({key,newValue:value})),reload:()=>page({local,session,name,nameFail}),allowed:()=>c[GA]===false,runtime:()=>c.dataLayer?.filter(a=>a[0]==='consent').at(-1)?.[2].analytics_storage};
}

let p=page();assert.equal(p.scripts.length,0);p.save();assert.equal(p.allowed(),false);p.allow();p.save();p.save();assert.equal(p.runtime(),'granted');assert.equal(p.scripts.length,1);assert.equal(p.c.dataLayer.filter(a=>a[0]==='config').length,1);assert.equal(p.c.dataLayer.filter(a=>a[0]==='consent'&&a[1]==='default').length,1);p.deny();assert.equal(p.checkbox.checked,false);p.save();assert.equal(p.runtime(),'denied');p.allow();assert.equal(p.runtime(),'granted');assert.equal(p.scripts.length,1);
for(const allFail of [false,true]){p=page({local:store(new Map([[KEY,'{"analytics":true}']]))});assert.equal(p.scripts.length,1);p.local.fail.write=true;p.session.fail.write=allFail;p.nameFail.write=allFail;p.deny();assert.equal(p.allowed(),false);assert.equal(p.runtime(),'denied');assert.equal(p.checkbox.checked,false);assert.match(p.status.textContent,allFail?/esta página/:/esta pestaña/);p.initialize();assert.equal(p.allowed(),false);assert.equal(p.scripts.length,1);if(!allFail)assert.equal(p.reload().scripts.length,0);}
for(const which of ['local','session']){const local=store(new Map([[KEY,'{"analytics":true}']])),session=store();(which==='local'?local:session).fail.read=true;p=page({local,session});assert.equal(p.scripts.length,0);p.allow();assert.equal(p.allowed(),false);assert.equal(p.checkbox.checked,false);assert.equal(p.scripts.length,0);assert.doesNotMatch(p.status.textContent,/permitido/);}
const shared=store(new Map([[KEY,'{"analytics":false}']])),bad=store(shared.map);bad.fail.read=true;const healthy=page({local:shared});p=page({local:bad});p.allow();healthy.event(shared.getItem(KEY));assert.notEqual(JSON.parse(shared.getItem(KEY)||'null')?.analytics,true);assert.equal(healthy.scripts.length,0);assert.equal(p.checkbox.checked,false);
for(const failure of ['remove','ignoreRemove']){p=page({local:store(new Map([[KEY,'{"analytics":false}']])),session:store(new Map([[DENY,'1']]))});p.session.fail[failure]=true;p.allow();assert.equal(JSON.parse(p.local.getItem(KEY)).analytics,false);assert.equal(p.allowed(),false);}
for(const failure of ['write','ignoreWrite','read']){p=page({local:store(new Map([[KEY,'{"analytics":false}']])),name:MARK});p.nameFail[failure]=true;p.allow();assert.equal(JSON.parse(p.local.getItem(KEY)).analytics,false);assert.equal(p.allowed(),false);}
p=page();p.allow();p.local.fail.write=true;p.session.fail.write=true;p.deny();assert(p.c.name.includes(MARK));p.local.fail.write=false;assert.equal(p.reload().scripts.length,0);
const late=store();late.fail.lateRead=true;p=page({local:late});p.allow();assert.equal(p.allowed(),false);assert.equal(p.checkbox.checked,false);assert.match(p.status.textContent,/desactivad/);assert.doesNotMatch(p.status.textContent,/permitido/);
const local=store(),a=page({local}),b=page({local});a.allow();b.event(local.getItem(KEY));assert.equal(b.allowed(),true);a.deny();b.event(local.getItem(KEY));assert.equal(b.runtime(),'denied');assert.equal(b.checkbox.checked,false);assert.match(b.status.textContent,/desactivad/);a.allow();b.event(local.getItem(KEY));assert.equal(b.allowed(),false);assert.match(b.status.textContent,/desactivad/);b.allow();assert.equal(b.runtime(),'granted');assert.equal(b.scripts.length,1);local.map.clear();b.event(null,null);assert.equal(b.allowed(),false);assert.equal(b.checkbox.checked,false);
// The UI must reflect the applied state, rather than a second independent read.
const initiallyGranted=store(new Map([[KEY,'{"analytics":true}']]));
let initialReads=0;const initialGet=initiallyGranted.getItem.bind(initiallyGranted);
initiallyGranted.getItem=k=>{if(k===KEY&&++initialReads>1)throw Error('read lost after initial apply');return initialGet(k)};
p=page({local:initiallyGranted});assert.equal(p.allowed(),true);assert.equal(p.checkbox.checked,true);assert.equal(p.runtime(),'granted');assert.equal(initialReads,1);
const betweenReads=store();p=page({local:betweenReads});let saveReads=0;const saveGet=betweenReads.getItem.bind(betweenReads);
betweenReads.getItem=k=>{if(k===KEY&&++saveReads>2)throw Error('read lost after saved apply');return saveGet(k)};
p.allow();assert.equal(p.allowed(),false);assert.equal(p.checkbox.checked,false);assert.equal(p.scripts.length,0);assert.match(p.status.textContent,/desactivad/);assert.doesNotMatch(p.status.textContent,/permitido/);assert(saveReads>=3);
p.save();assert.equal(p.allowed(),false);assert.equal(p.checkbox.checked,false);assert.equal(p.scripts.length,0);assert.doesNotMatch(p.status.textContent,/permitido/);
console.log('PASS applied runtime/checkbox/feedback align when reads become unavailable after initial or saved application; unconfirmed saved grant rolls back before loading; repeated Save stays off.');
for(const raw of ['broken','null','{"analytics":"true"}'])assert.equal(page({local:store(new Map([[KEY,raw]]))}).scripts.length,0);
console.log('PASS Spanish actual deferred runtime and registered checkbox/buttons: default denial, repeated Save single config/library, deny/regrant, loaded old grant local/dual persistence failure, retained document and fresh session/name veto, independent local/session reads, read-fail/write-ok no shared grant/effective UI, failed or ignored veto clear, late-read feedback, separate-tab cross-storage runtime/checkbox/status, malformed values.');


// Failed new permission must be cleaned up even when writing false fails or is ignored.
for(const falseWrite of ['falseWrite','ignoreFalseWrite'])for(const removal of ['healthy','remove','ignoreRemove']){
 const local=store();p=page({local});local.fail.lateReadOnce=true;local.fail[falseWrite]=true;
 local.fail.keyRemoval=removal;
 p.allow();assert.equal(p.allowed(),false);assert.equal(p.checkbox.checked,false);assert.equal(p.scripts.length,0);
 const fresh=page({local:store(local.map)});assert.equal(fresh.allowed(),removal!=='healthy');
 if(removal==='healthy'){assert.equal(local.map.has(KEY),false);assert.match(p.status.textContent,/rechazado o eliminado/);}
 else{assert.equal(JSON.parse(local.map.get(KEY)).analytics,true);assert.match(p.status.textContent,/permiso guardado/);assert.doesNotMatch(p.status.textContent,/permiso anterior/);}
 local.fail={};p.allow();p.save();assert.equal(p.allowed(),true);assert.equal(p.scripts.length,1);p.deny();assert.equal(p.runtime(),'denied');
}
for(const retained of [false,true]){
 p=page({local:store(new Map([[KEY,'{"analytics":true}']]))});p.local.fail.ignoreFalseWrite=true;p.session.fail.write=!retained;p.nameFail.write=!retained;
 p.deny();assert.equal(p.allowed(),false);assert.equal(p.checkbox.checked,false);assert.match(p.status.textContent,/permiso guardado/);assert.equal(p.c.pvConsent.save(false),false);
 assert.equal(page({local:store(p.local.map)}).allowed(),true);assert.equal(p.reload().allowed(),!retained);
}
console.log('PASS empty-baseline failednewgrant verified remove fallback vs unavailablecleanup/fresh independent session, truthful warning/recovery; ignored denialwrite never saved success.');

const legacy=page({local:store(new Map([[KEY,JSON.stringify({analytics:true,preferences:true,marketing:true})]]))});assert.equal(legacy.c.pvConsent.read().preferences,false);assert.equal(legacy.c.pvConsent.read().marketing,false);legacy.allow();const record=JSON.parse(legacy.local.getItem(KEY));assert.equal(record.preferences,false);assert.equal(record.marketing,false);console.log('PASS ineffective legacy preference/marketing grants remain off; current GA choice alone persists.');
