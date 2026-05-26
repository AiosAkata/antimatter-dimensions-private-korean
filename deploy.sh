#!/bin/bash
set -e

# .env.production 에서 FIREBASE_CONFIG 로드 (JSON 따옴표 보존)
if [ -f ".env.production" ]; then
  FIREBASE_CONFIG=$(grep '^FIREBASE_CONFIG=' .env.production | cut -d'=' -f2-)
else
  echo "Error: .env.production 파일이 없습니다."
  echo "FIREBASE_CONFIG 환경변수를 담은 .env.production을 생성해 주세요."
  exit 1
fi

FIREBASE_CONFIG="$FIREBASE_CONFIG" npm run build:release

aws s3 sync dist/ s3://antimatter-dimensions-aiosakat/ --delete --quiet

aws cloudfront create-invalidation \
  --distribution-id E21SELBSDLT56J \
  --paths "/*" \
  --query 'Invalidation.Status' --output text

echo "Deploy complete: https://d1dvwfqwheepab.cloudfront.net"
