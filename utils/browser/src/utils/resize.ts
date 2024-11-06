
/**
 * 屏幕缩放适配
 * window.onresize = function () {
    scaleResize();
    }
 */
export function scaleResize () {
 const m = obtainZoom();

 const scacle = 1

 if (window.screen.width * Number(m) / 100 > 2000) {
   document.body.style.zoom = (window.screen.width / 1920 * scacle).toString()
 } else {
   document.body.style.zoom = (100 / Number(m) * scacle).toString()
 }

 const bodySize = +document.body.style.zoom * 100 + "%";
 document.body.style["backgroundSize"] = bodySize + "" + bodySize

 function obtainZoom () {
   let ratio = 0
   // , screen = window.screen,
   //   ua = navigator.userAgent.toLowerCase();
   if (window.devicePixelRatio !== undefined) {
     ratio = window.devicePixelRatio;
   } 
   // else if (~ua.indexOf('msie')) {
   //   if (screen.deviceXDPI && screen.logicalXDPI) {
   //     ratio = screen.deviceXDPI / screen.logicalXDPI;
   //   }
   // } 
   else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
     ratio = window.outerWidth / window.innerWidth;
   }
   if (ratio) {
     ratio = Math.round(ratio * 100);
   }
   return ratio;
 }

}
