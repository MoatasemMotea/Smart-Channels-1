/**
 * Inline pre-paint gate for the video intro (D-085). Runs in <head>
 * BEFORE ThemeAndTierScript and marks html[data-intro="on"] only when
 * every condition holds:
 * - the page is the homepage (/, /en, /ar);
 * - the URL carries no #hash — a visitor sent to a section (/ar/contact
 *   redirects to /ar/#contact) goes straight there, and the intro is
 *   marked seen so it does not appear later in the session;
 * - the intro has not been seen in this session (sessionStorage
 *   "sc-intro" — every access inside try/catch: storage may throw);
 * - no prefers-reduced-motion, no Save-Data;
 * - not an automated browser (navigator.webdriver) — the smoke suite and
 *   audits keep the opening path; the intro's own tests switch it back on.
 * CSS keys the splash (and the scroll lock) off the attribute, so it is
 * visible on the first paint or never — no flash, no hydration change
 * (<html> carries suppressHydrationWarning). ThemeAndTierScript reads the
 * same attribute to skip the cinematic opening.
 */
export function IntroScript() {
  const code = `(function(){try{
var p=location.pathname.replace(/\\/$/,"");
if(!(/^\\/(en|ar)?$/.test(p)||p===""))return;
if(location.hash){try{sessionStorage.setItem("sc-intro","1");}catch(e){}return;}
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
if((navigator.connection&&navigator.connection.saveData)===true)return;
var seen=null;try{seen=sessionStorage.getItem("sc-intro");}catch(e){}
if(seen==="1"||navigator.webdriver)return;
document.documentElement.setAttribute("data-intro","on");
}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
