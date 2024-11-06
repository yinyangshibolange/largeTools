export type Callback  = (error: Error | null,script: HTMLScriptElement ) => void
const callbacks: Record<string, Callback[]> = {}

/**
 * 加载一个远程脚本
 * @param {String} src 一个远程脚本
 * @param {Function} callback 回调
 */
export function loadScript(src: string, callback: Callback) {
  const existingScript  = <HTMLScriptElement>document.getElementById(src)
  const cb = callback || (() => {})
  if (!existingScript) { // 脚本不存在
    callbacks[src] = []
    const $script: HTMLScriptElement = document.createElement('script')
    $script.src = src
    $script.id = src
    $script.async = true
    document.body.appendChild($script)
    stdOnEnd($script)
  } else { // 脚本已存在
    cb(null, existingScript)
  }

  Array.isArray(callbacks[src]) && callbacks[src].push(cb)

  function stdOnEnd(script: HTMLScriptElement) {
    script.onload = () => {
      script.onerror = script.onload = null
      callbacks[src].forEach(cb => {
        cb(null, script)
      })
      delete callbacks[src]
    }
    script.onerror = () => {
      script.onerror = script.onload = null
      cb(new Error(`Failed to load ${src}`), script)
    }
  }


}

/**
 * 顺序加载一组远程脚本
 * @param {Array} list 一组远程脚本
 * @param {Function} cb 回调
 */
export function loadScriptQueue(list: string[], cb : Callback) {
  const first = list.shift()
  list.length ? loadScript(first!, () => loadScriptQueue(list, cb)) : loadScript(first!, cb)
}

/**
 * 动态加载css文件
 * @param {*} url
 * @param {*} isCache
 */
 export function loadCSS(url: string,isCache=false) {
  const existingLink = document.getElementById(url)
  if(existingLink) return
  const element = document.createElement("link");
  element.id =  url;
  element.setAttribute("rel", "stylesheet");
  element.setAttribute("type", "text/css");
  if (isCache) {
    element.setAttribute("href", url + "?t=" + new Date().getTime());
  } else {
    element.setAttribute("href", url);
  }
  document.head.appendChild(element);
}


