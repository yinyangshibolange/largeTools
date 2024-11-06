import {useHttp} from "../http/index";

export function checkVersionAndUpdate() {
  const { instance: http } = useHttp({
    baseURL: "",
  });
  http.get("/version.json?t=" + Date.now()).then((res: any) => {
    const versionJSON = JSON.parse(res.data);
    if (versionJSON.json && versionJSON.json !== localStorage.getItem("version")) {
      localStorage.setItem("version", versionJSON.json)
      window.location.reload();
    }
  });
}

