## 利用方法

### 0. はじめに

Dockerを利用してアプリケーションを起動する。<br>
デフォルトの設定で起動すると、メモリ不足で強制終了されてしまうので、docker desktopの<br>
```
Settings  >  Advanced  >  Memory limit
```
の値を、JVM用に指定するメモリの最大ヒープ・サイズよりも0.3GB程度大きな値に指定しておく。<br>
（本プロジェクトでは、`compose.yml`で6GBと指定しているので、docker desktop側は6.3GB程度に指定すれば良い。）<br>
<br>
<br>

### 1. グラフのビルド
始めに、OpenStreetMapデータとGTFSデータからグラフの生成を行う。
otpフォルダ内に以下のファイルを格納する。

- `*.osm.pbf`

    OSMデータを提供している[geofabrik.de](https://download.geofabrik.de/)から[関東地方のデータ](https://download.geofabrik.de/asia/japan/kanto.html)をpbfフォーマットで取得

- `*.gtfs.zip`

    公共交通オープンデータセンターから取得する。GTFSデータは複数格納可能。

<br>

ビルドにあたって、`compose.yml`を以下のように設定する
```diff
- command: [ '--load', '--serve' ]
+ command: [ '--save', '--build', '--serve' ]
```

起動
```sh
docker compose up -d
```

ビルドが完了すると停止しても良い
```sh
docker compose down
```
<br>
<br>

### 2. グラフをロードして使用する
otpフォルダ内に以下のファイルを格納する。

- `*.osm.pbf`
- `*.gtfs.zip`
- `graph.obj`

    1のビルドで生成されたグラフデータ

<br>

グラフのロードにあたって、`compose.yml`を以下のように設定する
```diff
- command: [ '--save', '--build', '--serve' ]
+ command: [ '--load', '--serve' ]
```

起動
```sh
docker compose up -d
```

停止する場合は以下を実行
```sh
docker compose down
```
<br>
<br>

### 3. APIの実行

https://docs.opentripplanner.org/en/dev-2.x/sandbox/TravelTime/

上記を参考
このAPIは将来的に無効になる可能性が高く、上記リンクも削除されてしまう可能性があるため、APIのパラメータを以下に示す。

#### API parameters

- `location` Origin of the search, can be either `latitude,longitude` or a stop id
- `time` Departure time as a ISO-8601 time and date (example `2023-04-24T15:40:12+02:00`). The default value is the current time.
- `cutoff` The maximum travel duration as a ISO-8601 duration. The `PT` can be dropped to simplify the value. This parameter can be given multiple times to include multiple isochrones in a single request. The default value is one hour.
- `modes` A list of travel modes. WALK is not implemented, use `WALK, TRANSIT` instead.
`arriveBy` Set to `false` when searching from the location and `true` when searching to the location

#### Example Request

```
http://localhost:8080/otp/traveltime/isochrone?batch=true&location=35.63273135483024,139.74189548323065&time=2024-12-03T14:00:00%2B09:00&modes=WALK,TRANSIT&arriveBy=true&cutoff=30M&cutoff=60M
```
