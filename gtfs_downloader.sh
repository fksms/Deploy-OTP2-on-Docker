#!/bin/bash

# BASE_URL
ODPT_BASE_URL=https://api.odpt.org/api/v4/
ODPT_CHALLENGE_2024_BASE_URL=https://api-challenge2024.odpt.org/api/v4/

# APIキーの読み込み
source ./.env

# 東京都交通局
curl -L -o otp/Toei-Train.gtfs.zip ${ODPT_BASE_URL}files/Toei/data/Toei-Train-GTFS.zip?acl:consumerKey=${ODPT_API_KEY}

# 横浜市交通局
curl -L -o otp/YokohamaMunicipal-Train.gtfs.zip ${ODPT_BASE_URL}files/YokohamaMunicipal/data/YokohamaMunicipal-Train-GTFS.zip?acl:consumerKey=${ODPT_API_KEY}

# 東京臨海高速鉄道
curl -L -o otp/TWR-Train.gtfs.zip ${ODPT_BASE_URL}files/TWR/data/TWR-Train-GTFS.zip?acl:consumerKey=${ODPT_API_KEY}

# 東京メトロ
curl -L -o otp/TokyoMetro-Train.gtfs.zip ${ODPT_BASE_URL}files/TokyoMetro/data/TokyoMetro-Train-GTFS.zip?acl:consumerKey=${ODPT_API_KEY}

# 首都圏新都市鉄道（つくばエクスプレス）
curl -L -o otp/MIR-Train.gtfs.zip ${ODPT_BASE_URL}files/MIR/data/MIR-Train-GTFS.zip?acl:consumerKey=${ODPT_API_KEY}

# 多摩都市モノレール
curl -L -o otp/TamaMonorail-Train.gtfs.zip ${ODPT_BASE_URL}files/TamaMonorail/data/TamaMonorail-Train-GTFS.zip?acl:consumerKey=${ODPT_API_KEY}

# 東日本旅客鉄道（JR東日本）
curl -L -o otp/JR-East-Train.gtfs.zip ${ODPT_CHALLENGE_2024_BASE_URL}files/JR-East/data/JR-East-Train-GTFS.zip?acl:consumerKey=${ODPT_CHALLENGE_2024_API_KEY}

# 東武鉄道
curl -L -o otp/Tobu-Train.gtfs.zip ${ODPT_CHALLENGE_2024_BASE_URL}files/Tobu/data/Tobu-Train-GTFS.zip?acl:consumerKey=${ODPT_CHALLENGE_2024_API_KEY}

# 相模鉄道（相鉄）
curl -L -o otp/Sotetsu-Train.gtfs.zip ${ODPT_CHALLENGE_2024_BASE_URL}files/Sotetsu/data/Sotetsu-Train-GTFS.zip?acl:consumerKey=${ODPT_CHALLENGE_2024_API_KEY}

# 京王電鉄
curl -L -o otp/Keio-Train.gtfs.zip ${ODPT_CHALLENGE_2024_BASE_URL}files/Keio/data/Keio-Train-GTFS.zip?acl:consumerKey=${ODPT_CHALLENGE_2024_API_KEY}
