import axios from 'axios';
import { sigungu } from './init';
const KEY = '1de08c4477f5c00ee658b1e9ff17b6a6';
const KEYWORD = '영상편집';
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

  let dong_arr = [];
  let gu = {};
  let si = [];
  let result = [];
  for (let 시 in sigungu) {
    console.log(시);
    dong_arr = [];
    gu = {};
    for (let 구 in sigungu[시]) {
      console.log(구);

      for await (let 동 of sigungu[시][구]) {
        // 동 중심좌표 받아오기
        const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${동}}`;
        const res = await axios.get(url, config);
        if (res.data.documents[0]) {
          const { x, y } = res.data.documents[0];
          let dong = {
            x: x,
            y: y,
            name: 동,
          };
          dong_arr.push(dong);
        }
      }
      gu = {
        ...gu,
        [구]: dong_arr,
      };
      dong_arr = [];
      console.log('---------구---------');
    }
    si = {
      ...si,
      [시]: gu,
    };
    console.log('---------시 푸쉬--------');
    console.log(si);
  }
  // console.log(result);
  console.log('끝');
  console.log(JSON.stringify(si, null, '\t'));
  return;
};
