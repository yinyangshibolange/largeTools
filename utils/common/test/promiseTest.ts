import { PromiseLinks, type LinkData } from "../src/promise/links"


function gTask() {
 return new Promise((resolve, reject) => {
  const t = Math.random() * 1500 + 300
  setTimeout(() => {
   const text = `延时${(t/1000).toFixed(1)}秒`
   console.log(text)
   if(t > 1600) {
    reject(text)
   } else {
    resolve(text)
   }
  }, t)
 })
}

const prm: LinkData  = {
 prom: () =>gTask(),
 children: [
  {
   prom: () => gTask(),
   children: [{
    prom:() => gTask()
   }]
  }, {
   prom: () =>gTask(),
  }
 ]
}

const tasks: LinkData[] = [{
 prom: () => gTask()
}, {
 prom:() => gTask()
},prm]

const promiseLinks = new PromiseLinks(tasks)
// promiseLinks.add(tasks)

promiseLinks.run()