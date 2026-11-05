/**
 * Inline no-flash bootstrap (runs before first paint, dependency-free):
 * 1. Theme: applies the stored choice (dark default, Q-P2-4/D-019).
 * 2. Motion tier: FULL/LITE/STATIC pre-paint so CSS keys off it (§2) —
 *    reduced-motion and Save-Data both resolve to STATIC, so the opening
 *    gate below inherits that exclusion for free.
 * 3. Header environment: dark-committed routes pre-paint the dark header.
 * 4. Opening state (D-017, restored by D-097 after D-086's removal):
 *    the dots-logo opening plays ONCE PER SESSION on the homepage with an
 *    animating tier — marks html[data-opening="pending"] so the hero
 *    holds back and the dark stage shows instantly, and arms a 4s
 *    auto-skip fallback in case the engine chunk never takes over (no
 *    spinner, no blank, no blocking). A #hash arrival (redirected routes
 *    land here, e.g. /contact → /#contact) always skips it, same as a
 *    visitor who has already seen it this session.
 * JS disabled → none of this runs and the server-rendered page is simply
 * visible.
 */
export function ThemeAndTierScript() {
  const code = `(function(){try{
var d=document.documentElement;
var t=localStorage.getItem("sc-theme");
d.setAttribute("data-theme",t==="light"?"light":"dark");
var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var sd=(navigator.connection&&navigator.connection.saveData)===true;
var tier=rm||sd?"static":(window.matchMedia("(max-width: 767px)").matches?"lite":"full");
d.setAttribute("data-motion-tier",tier);
var path=location.pathname.replace(/\\/$/,"");
var isHome=/^\\/(en|ar)?$/.test(path)||path==="";
/* dark-committed routes (products stage + P6 inner-page cinematic
   intros) pre-paint the dark header too */
var darkRoute=isHome||/\\/(products|company|partners|clients)$/.test(path)||/\\/(solutions|projects)\\/[^/]+$/.test(path);
d.setAttribute("data-header-env",darkRoute?"dark":"surface");
if(location.hash){try{sessionStorage.setItem("sc-opening","1");}catch(e){}}
var seen=false;try{seen=sessionStorage.getItem("sc-opening")==="1";}catch(e){}
if(isHome&&tier!=="static"&&(seen||location.hash)){d.setAttribute("data-opening","skipped");}
else if(isHome&&tier!=="static"){
  d.setAttribute("data-opening","pending");
  /* the opening owns the viewport: neutralize browser scroll restoration
     so a mid-page refresh still SHOWS the sequence */
  try{history.scrollRestoration="manual";}catch(e){}
  try{window.scrollTo({top:0,left:0,behavior:"instant"});}catch(e){window.scrollTo(0,0);}
  /* the browser may re-apply a restored scroll asynchronously AFTER the
     line above (before hydration hands control to the engine): while the
     opening owns the viewport, browser-generated scrolls snap back to the
     stage. User input can't race this — the engine locks scroll while
     running, and intentional input skips first. Self-removing. */
  var g=function(){var s=d.getAttribute("data-opening");
    if(s==="pending"||s==="running"||s==="revealing"){
      if(window.scrollY>0){try{window.scrollTo({top:0,left:0,behavior:"instant"});}catch(e){window.scrollTo(0,0);}}
    }else{removeEventListener("scroll",g);}};
  addEventListener("scroll",g,{passive:true});
  /* deterministic fallback: the CSS pre-stage shows the brand while JS
     loads; only after 4s of no engine does the hero reveal silently */
  setTimeout(function(){
    if(d.getAttribute("data-opening")==="pending"){
      d.setAttribute("data-opening","skipped");
      try{sessionStorage.setItem("sc-opening","1");}catch(e){}
    }
  },4000);
}
}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
