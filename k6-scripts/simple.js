import http from "k6/http";

export default function () {
  var resp = http.get(__ENV.TAEGETURL);
  if (resp.status != 200) {
    console.log(resp.status);
  }
}
