# 키워드 검색으로 장소 가져오기

## kakao api 키 발급받기

카카오 주소검색 API 중 키워드로 장소 가져오기 API 사용

```js
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `KakaoAK ${KEY}`,
  },
};

url = `https://dapi.kakao.com/v2/local/search/keyword.json?y=${y}&x=${x}&radius=${RADIUS}&query=${KEYWORD}`;
```

## 엑셀로 저장하기

`exceljs` 그리고 엑셀을 다운받을 수 있는 `file-saver` 다운로드
