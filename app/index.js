import express from "express";
import axios from "axios";
import cors from "cors";

const PORT = 8000;
const OTP_API_BASE_URL = "http://otp:8080";

const app = express();

app.use(cors());

// APIエンドポイントの設定
app.get("/api/proxy", async (req, res) => {
  try {
    // 住所
    const address = req.query.address;

    // 日時
    const datetime = req.query.datetime;

    // 着or発
    const arriveBy = req.query.arriveBy;

    // 許容時間
    const cutoff = req.query.cutoff;

    // 入力チェック
    if (!address || !datetime || !arriveBy || !cutoff) {
      return res.status(400).json({ error: "クエリのパラメータが不足しています。" });
    }

    // 国土地理院APIエンドポイント
    const gsiBaseUrl = "https://msearch.gsi.go.jp/address-search/AddressSearch?q="

    // 経度
    let lon = 0
    // 緯度
    let lat = 0

    // 国土地理院APIへのリクエスト
    await axios.get(gsiBaseUrl + address)
      .then((response) => {
        // レスポンスの表示
        lon = response.data[0]["geometry"]["coordinates"][0]
        lat = response.data[0]["geometry"]["coordinates"][1]
      })
      .catch((error) => {
        // エラーの出力
        return res.status(400).json({ error: "国土地理院APIへのリクエストでエラーが発生しました。" });
      });

    // OTPAPIへのリクエスト
    await axios.get(OTP_API_BASE_URL + "/otp/traveltime/isochrone", {
      params: {
        batch: true,
        location: String(lat) + "," + String(lon),
        time: datetime,
        modes: "WALK,TRANSIT",
        arriveBy: arriveBy,
        cutoff: cutoff
      }
    })
      .then((response) => {
        // Webサーバーからのレスポンスをフロントエンドに返却
        return res.json(response.data);
      })
      .catch((error) => {
        // エラーの出力
        return res.status(400).json({ error: "OTPAPIへのリクエストでエラーが発生しました。" });
      });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "An error occurred while processing the request." });
  }
});

// APIサーバーを起動
app.listen(PORT, () => {
  console.log("API server is running");
});