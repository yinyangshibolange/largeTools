export class MyCache {
 cacheMap = new Map()
 timeMap = new Map()
 max = 10
 constructor(max: number) {
  if (max) this.max = max
 }

 set (key: string, value: any) {
  if (this.cacheMap.has(key) || this.cacheMap.size < this.max) {
   this.cacheMap.set(key, value)
   this.timeMap.set(key, Date.now())
  } else {
   const min = Math.min(...this.timeMap.values())
   const ets = this.timeMap.entries()
   let etsValue = ets.next()
   while (!etsValue.done) {
    if (etsValue.value[1] === min) {
     this.cacheMap.delete(etsValue.value[0])
     this.timeMap.delete(etsValue.value[0])
     break
    }
    etsValue = ets.next()
   }
  }
 }

 get (key: string) {
  const val = this.cacheMap.get(key)
  if (val) {
   this.timeMap.set(key, Date.now())
   return val
  } else {
   throw new Error("缓存不存在")
  }
 }
}

export * as simpleCache from "./simpleCache"