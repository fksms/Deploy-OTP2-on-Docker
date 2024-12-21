import axios from "axios";

// 現在の時刻を設定
window.addEventListener("load", () => {
  document.getElementById("datetime").value = toLocalISOString(new Date());
});

// クリック時に発火
document.getElementById("executeButton").addEventListener("click", apiRequest)


async function apiRequest() {

  // 住所
  const address = document.getElementById("address").value;

  // 国土地理院API
  const gsiBaseUrl = "https://msearch.gsi.go.jp/address-search/AddressSearch?q="

  // 経度
  let lon = 0
  // 緯度
  let lat = 0

  await axios.get(gsiBaseUrl + encodeURIComponent(address))
    .then((response) => {
      // レスポンスの表示
      //document.getElementById("response").textContent = JSON.stringify(response.data, null, 2);
      lon = response.data[0]["geometry"]["coordinates"][0]
      lat = response.data[0]["geometry"]["coordinates"][1]
    })
    .catch((error) => {
      // エラーの表示
      document.getElementById("response").textContent = error.message
    });

  // APIエンドポイントのURL
  const endpoint = document.getElementById("endpoint").value;

  // 日時
  const datetime = document.getElementById("datetime").value;

  // 着or発
  const arriveBy = document.getElementById("arriveBy").elements["bool"].value;

  // 許容時間
  const cutoff = document.getElementById("cutoff").value;

  console.log(endpoint)
  console.log(lon)
  console.log(lat)
  console.log(datetime)
  console.log(arriveBy)
  console.log(cutoff)

  const otpURL = (
    endpoint +
    "/otp/traveltime/isochrone" +
    "?batch=true" +
    "&location=" +
    String(lat) +
    "," +
    String(lon) +
    "&time=" +
    (datetime + ":00" + encodeURIComponent("+") + "09:00") +
    "&modes=WALK,TRANSIT" +
    "&arriveBy=" +
    arriveBy +
    "&cutoff=" +
    cutoff
  )

  console.log(otpURL)

  await axios.get(otpURL)
    .then((response) => {
      // レスポンスの表示
      document.getElementById("response").textContent = JSON.stringify(response.data, null, 2);
    })
    .catch((error) => {
      // エラーの表示
      document.getElementById("response").textContent = error.message
    });

}

function toLocalISOString(date) {
  const localDate = new Date(date - date.getTimezoneOffset() * 60000); //offset in milliseconds. Credit https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset

  // Optionally remove second/millisecond if needed
  localDate.setSeconds(null);
  localDate.setMilliseconds(null);
  return localDate.toISOString().slice(0, -1);
}