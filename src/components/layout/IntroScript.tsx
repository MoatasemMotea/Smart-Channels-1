/**
 * Inline pre-paint gate for the video intro (D-085). Runs in <head>
 * BEFORE ThemeAndTierScript and marks html[data-intro="on"] only when
 * every condition holds:
 * - the page is the homepage (/, /en, /ar);
 * - the intro has not been seen in this session (sessionStorage
 *   "sc-intro" — read inside try/catch: storage may throw);
 * - no prefers-reduced-motion, no Save-Data;
 * - not an automated browser (navigator.webdriver) — the smoke suite and
 *   audits keep the opening path; the intro's own tests switch it back on.
 * CSS keys the splash (and the scroll lock) off the attribute, so it is
 * visible on the first paint or never — no flash, no hydration change
 * (<html> carries suppressHydrationWarning). ThemeAndTierScript reads the
 * same attribute to skip the cinematic opening.
 *
 * Top-of-page guard: when the opening is skipped because of the intro
 * (showing now, or seen this session), the opening's own scroll guard is
 * not installed — yet a component's mount-time scrollIntoView (the
 * industries tab strip, block:"nearest") would carry the window down to
 * it. Until the visitor's first intentional input, scrolls they did not
 * make snap back to the top, exactly as they do under the opening. Not
 * with a #hash: HashArrival must be free to land on its section.
 */
export function IntroScript() {
  const code = `(function(){try{
var d=document.documentElement;
var p=location.pathname.replace(/\\/$/,"");
if(!(/^\\/(en|ar)?$/.test(p)||p===""))return;
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
if((navigator.connection&&navigator.connection.saveData)===true)return;
var seen=null;try{seen=sessionStorage.getItem("sc-intro");}catch(e){}
var on=seen!=="1"&&!navigator.webdriver;
if(on)d.setAttribute("data-intro","on");
if((on||seen==="1")&&!location.hash){
  var ev=["wheel","touchstart","keydown","pointerdown"];
  var g=function(){if(window.scrollY>0){try{window.scrollTo({top:0,left:0,behavior:"instant"});}catch(e){window.scrollTo(0,0);}}};
  var stop=function(){removeEventListener("scroll",g);for(var i=0;i<ev.length;i++)removeEventListener(ev[i],stop,true);};
  addEventListener("scroll",g,{passive:true});
  for(var i=0;i<ev.length;i++)addEventListener(ev[i],stop,{capture:true,passive:true});
}
}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
