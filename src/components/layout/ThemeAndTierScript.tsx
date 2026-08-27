/**
 * Inline no-flash bootstrap (runs before first paint, dependency-free):
 * 1. Theme: applies the stored choice (dark default, Q-P2-4/D-019).
 * 2. Motion tier: FULL/LITE/STATIC pre-paint so CSS keys off it (§2).
 * 3. Opening state (D-017/J-12, Revision 3 §1): on EVERY full document
 *    load of the homepage with an animating tier, marks
 *    html[data-opening="pending"] so the hero holds back and the dark
 *    cover shows instantly — and arms the ≈1.5 s auto-skip: if the engine
 *    chunk hasn't taken over by then, the state flips to "skipped" and the
 *    full hero reveals silently (no spinner, no blank, no blocking).
 *    Locale switches and client-side routing never re-run this script, so
 *    they never replay the opening (§20). JS disabled → none of this runs
 *    and the server-rendered hero (STATIC baseline) is simply visible.
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
d.setAttribute("data-header-env",isHome?"dark":"surface");
/* Revision 3 §1: the cinematic opening plays on EVERY full document load
   of the homepage (no session gating). Soft navigations (locale switch,
   client routing) never re-run this script, so they never replay it. */
if(isHome&&tier!=="static"){
  d.setAttribute("data-opening","pending");
  setTimeout(function(){
    if(d.getAttribute("data-opening")==="pending"){d.setAttribute("data-opening","skipped");}
  },1500);
}
}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
