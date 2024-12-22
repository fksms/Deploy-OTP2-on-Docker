import axios from "axios";

// 現在の時刻を設定
window.addEventListener("load", () => {
  document.getElementById("datetime").value = toLocalISOString(new Date());
});

// クリック時に発火
document.getElementById("executeButton").addEventListener("click", apiRequest)


async function apiRequest() {

  // APIエンドポイントのURL
  const endpoint = document.getElementById("endpoint").value;

  // 住所
  const address = document.getElementById("address").value;

  // 日時
  const datetime = document.getElementById("datetime").value;

  // 着or発
  const arriveBy = document.getElementById("arriveBy").elements["bool"].value;

  // 許容時間
  const cutoff = document.getElementById("cutoff").value;

  // リクエスト
  await axios.get(endpoint + "/api/proxy", {
    params: {
      address: encodeURIComponent(address),
      datetime: datetime + ":00" + "+09:00",
      arriveBy: arriveBy,
      cutoff: cutoff
    }
  })
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