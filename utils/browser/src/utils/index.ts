/**
 * 复制
 * @param value
 */
export const copyToClipboard = (value: string): void => {
 const transfer = document.createElement("textarea");
 document.body.appendChild(transfer);
 transfer.value = value;
 transfer.focus();
 transfer.select();
 if (document.execCommand("copy")) {
   document.execCommand("copy");
 }
 transfer.blur();
 document.body.removeChild(transfer);
};


export function launchFullscreen(element: any) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.msRequestFullscreen){
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
}

export * from "./loadScript"
export * from "./resize"