export  function usePlatform() {
  let platform: "pc" | "phone" = 'pc'
  let isInWeixin: boolean = false
  let isAndroid: boolean = true
  let isIos: boolean = false

  const ua = window.navigator.userAgent;

  // if(ua === '1') {
  //  platform = 'pc'
  // } else if(ua='2') {

  // }

  return {
    platform,
    isInWeixin,
    isAndroid,
    isIos,
  };
}

