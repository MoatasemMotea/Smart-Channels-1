/**
 * Inline no-flash bootstrap (runs before first paint, dependency-free):
 * 1. Theme: applies the stored choice (dark default, Q-P2-4/D-019).
 * 2. Motion tier: FULL/LITE/STATIC pre-paint so CSS keys off it (§2).
 * 3. Header environment: dark-committed routes pre-paint the dark header.
 * D-086 removed the cinematic opening (Revision 3 §1) with its pending
 * state, scroll guard and auto-skip — the hero is final from the first
 * paint, and the D-085 intro is the only opening experience.
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
}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
