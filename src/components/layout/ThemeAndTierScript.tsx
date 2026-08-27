/**
 * Inline no-flash bootstrap: applies the stored theme (dark default,
 * Q-P2-4) and an initial motion tier before first paint. Runs before
 * hydration; if JS is disabled the server-rendered defaults (dark +
 * static tier) remain — the STATIC experience is the baseline (§2 of the
 * motion contract). Kept tiny and dependency-free.
 */
export function ThemeAndTierScript() {
  const code = `(function(){try{
var t=localStorage.getItem("sc-theme");
if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}
else{document.documentElement.setAttribute("data-theme","dark");}
var m=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var s=(navigator.connection&&navigator.connection.saveData)===true;
var tier=m||s?"static":(window.matchMedia("(max-width: 767px)").matches?"lite":"full");
document.documentElement.setAttribute("data-motion-tier",tier);
}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
