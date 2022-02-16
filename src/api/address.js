import axios from 'axios';
import { sigungu } from './init';
import { POSITION } from './position';
const KEY = '1de08c4477f5c00ee658b1e9ff17b6a6';
const KEYWORD = '사진관';
const RADIUS = 20000;

export const getAddress = async () => {
  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?y=37.514322572335935&x=127.06283102249932&radius=20000&query="사진관"`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `KakaoAK ${KEY}`,
    },
  };
  const res = await axios.get(url, config);
  console.log(res);
};

export const getPosition = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `KakaoAK ${KEY}`,
    },
  };

  for (let 시 in POSITION) {
    for (let 구 in POSITION[시]) {
      for await (let 동 of POSITION[시][구]) {
        const { x, y } = 동;
        console.log(동);
        if (x && y) {
          const url2 = `https://dapi.kakao.com/v2/local/search/keyword.json?y=${y}&x=${x}&radius=${RADIUS}&query=${KEYWORD}`;
          const res2 = await axios.get(url2, config);
          console.log(res2);
        }
      }
    }
    console.log(`---------구--------`);
  }

  return;
};
