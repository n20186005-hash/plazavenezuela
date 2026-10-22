(() => {
  const KEY='pv-cookie-preferences', DENY='pv-analytics-denied', MARK='|pv-analytics-denied|', ID='G-HXM22WWPKP';
  function denied(){
    if(window.__pvDenied)return true;
    try{if(sessionStorage.getItem(DENY)==='1')return true;}catch{return true;}
    try{return window.name.includes(MARK);}catch{return true;}
  }
  function markDeny(){
    window.__pvDenied=true;window['ga-disable-'+ID]=true;let retained=false;
    try{sessionStorage.setItem(DENY,'1');retained=sessionStorage.getItem(DENY)==='1';}catch{}
    try{window.name=window.name.split(MARK).join('')+MARK;retained=window.name.includes(MARK)||retained;}catch{}
    return retained;
  }
  function clearDeny(){
    // Verify this tab's refusal is clear before publishing a shared grant.
    sessionStorage.removeItem(DENY);
    if(sessionStorage.getItem(DENY)==='1')throw Error('Session refusal remains');
    window.name=window.name.split(MARK).join('');
    if(window.name.includes(MARK))throw Error('Tab refusal remains');
  }
  function read(){
    if(denied())return null;
    try{
      const saved=JSON.parse(localStorage.getItem(KEY)||'null');
      localStorage.setItem(KEY+'-write-check','1');localStorage.removeItem(KEY+'-write-check');
      return saved && typeof saved.analytics==='boolean'?{necessary:true,analytics:saved.analytics,preferences:false,marketing:false}:null;
    }catch{return null;}
  }
  function apply(grant){
    window['ga-disable-'+ID]=!grant;
    if(!grant){window.gtag?.('consent','update',{analytics_storage:'denied'});return;}
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
    if(document.getElementById('pv-ga4')){window.gtag('consent','update',{analytics_storage:'granted'});return;}
    window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('consent','update',{analytics_storage:'granted'});
    const script=document.createElement('script');script.id='pv-ga4';script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+ID;document.head.appendChild(script);
    window.gtag('js',new Date());window.gtag('config',ID,{allow_google_signals:false,allow_ad_personalization_signals:false});
  }
  const checkbox=document.getElementById('analytics'),status=document.getElementById('cookie-status');
  let retainedDenial=false,effective=false;
  function refresh(){effective=read()?.analytics===true;apply(effective);if(checkbox)checkbox.checked=effective;}
  function save(analytics){
    analytics=analytics===true;
    if(!analytics){retainedDenial=markDeny();apply(false);}
    try{
      if(analytics){clearDeny();localStorage.getItem(KEY);localStorage.setItem(KEY+'-write-check','1');localStorage.removeItem(KEY+'-write-check');}
      localStorage.setItem(KEY,JSON.stringify({necessary:true,analytics,preferences:false,marketing:false}));
      if(analytics)window.__pvDenied=false;
      refresh();return true;
    }catch{retainedDenial=markDeny();refresh();return false;}
  }
  window.pvConsent={read,save};
  const unused=document.getElementById('preferences');if(unused){unused.checked=false;unused.disabled=true;}
  refresh();
  function choose(value){
    const stored=save(value);
    if(status)status.textContent=stored
      ?effective?'Google Analytics está permitido en este navegador.':value?'Se escribió la elección, pero no pudo verificarse el almacenamiento. Google Analytics está desactivado en esta pestaña.':'Google Analytics se ha rechazado en este navegador.'
      :retainedDenial?'Google Analytics está desactivado en esta pestaña; el rechazo se conservará al navegar por el sitio y recargarla. No se guardó la elección permanente; otras pestañas pueden conservar un permiso anterior. Puede borrar los datos del sitio desde el navegador.'
      :'Google Analytics está desactivado en esta página. No se garantiza conservar el rechazo al navegar o recargar. Borre los datos del sitio desde el navegador para eliminar permisos anteriores.';
  }
  document.getElementById('cookie-form')?.addEventListener('submit',event=>{event.preventDefault();choose(checkbox?.checked===true);});
  document.getElementById('reject-all')?.addEventListener('click',()=>choose(false));
  window.addEventListener('storage',event=>{
    if(event.key!==KEY&&event.key!==null)return;
    let grant=false;try{grant=JSON.parse(event.newValue||'null')?.analytics===true;}catch{}
    if(!grant)markDeny();
    refresh();
    if(status)status.textContent=effective?'Google Analytics está activo en esta pestaña.':grant?'Google Analytics sigue desactivado en esta pestaña. Guarde aquí su elección para permitirlo.':'Google Analytics se ha desactivado en esta pestaña por un cambio de elección en otra.';
  });
})();
