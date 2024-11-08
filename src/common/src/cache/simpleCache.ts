export type SimpleCache = {
 key: string;
 value: any;
 timer: number;
}

let cache: Record<string, Omit<SimpleCache, 'key'>> = {}



export function setSimpleCache(params: Omit<SimpleCache, 'timer'> & {
 timer: number
}) {
 cache[params.key] = {
  value: params.value,
  timer: setTimeout(() => {
   clearTimeout(cache[params.key].timer)
   delete cache[params.key]
  }, params.timer)
 }
}

export function removeSimpleCache (key: string) {
 if(cache[key]) {
  clearTimeout(cache[key].timer)
  delete cache[key]
 }
}