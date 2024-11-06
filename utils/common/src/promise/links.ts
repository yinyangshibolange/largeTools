import { v4 as uuid } from "uuid";

export type LinkData = {
  id?: string;
  index?: number;
  prom: (parentValue?: any) => Promise<any>;
  children?: LinkData[];
  finished?: boolean;
  success?: boolean;
  result?: any;
  callBack?: (res: any) => void;
};

async function linksRun(links: LinkData[], parentValue?: any) {
  if (links.length === 0) return;
  const proms = links.map((item) => {
    return item.prom(parentValue);
  });
  try {
    const ress = await Promise.allSettled(proms);
    for (let index = 0; index < ress.length; index++) {
      const item = ress[index];
      if (item.status === "fulfilled") {
        links[index].success = true;
        links[index].result = item.value;
        if (typeof links[index].callBack === "function") {
          links[index].callBack!(item.value);
        }
        if (Array.isArray(links[index].children)) {
          await linksRun(links[index].children!, item.value);
        }
      } else if (item.status === "rejected") {
        links[index].success = false;
      }
      links[index].finished = true;
    }
  } catch (err) {
    return Promise.reject(err);
  }
}
export class PromiseLinks {
  links: LinkData[]  = [];

  constructor(_links: LinkData[] | LinkData) {
   // this.links ??= _links as LinkData[]
    this.add(_links)
  }

  add(prom: LinkData[] | LinkData) {
    if (!prom) return;
    if (Array.isArray(prom)) {
      prom.forEach((item: LinkData) => {
        item.id = uuid();
        this.links.push(item);
      });
    } else {
      prom.id = uuid();
      this.links.push(prom);
    }
  }

  remove(id: string) {
   const index = this.links.findIndex(item => item.id === id)
   if(index > -1) {
    this.links.splice(index,1)
   }
  }

  run() {
    return linksRun(this.links);
  }
}
