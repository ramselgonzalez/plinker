export default {
  home: "/",
  overview: (cid: string = "[cid]") => `/${cid}/overview`,
  moves: (cid: string = "[cid]") => `/${cid}/moves`,
  move: (cid: string = "[cid]", mid: string = "[mid]") => `/${cid}/moves/${mid}`,
  assists: (cid: string = "[cid]") => `/${cid}/assists`,
  assist: (cid: string = "[cid]", aid: string = "[aid]") => `/${cid}/assists/${aid}`,
};
