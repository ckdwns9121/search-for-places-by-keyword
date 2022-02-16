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
  for (let 시 in sigungu) {
    for (let 구 in sigungu[시]) {
      for await (let 동 of sigungu[시][구]) {
        // 동 중심좌표 받아오기
        const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${동}}`;
        const res = await axios.get(url, config);
        // console.log(동);
        // console.log(res.data.documents[0]);
        if (res.data.documents[0]) {
          const { x, y } = res.data.documents[0];
          let dong = {
            x: x,
            y: y,
            name: 동,
          };
          dong_arr.push(dong);
        }

        // 동에 대한 정보가 있을 시
        // if (res.data.documents[0]) {
        //   // x,y 좌표 받아오기
        //   const { x, y } = res.data.documents[0];
        //   if (x && y) {
        //     const url2 = `https://dapi.kakao.com/v2/local/search/keyword.json?y=${y}&x=${x}&radius=${RADIUS}&query=${KEYWORD}`;
        //     const res2 = await axios.get(url2, config);
        //     console.log(res2);
        //   }
        // }
      }
      gu = {
        ...gu,
        [구]: dong_arr,
      };
      dong_arr = [];
    }
    console.log('hello');
    si = {
      ...si,
      [시]: gu,
    };
    console.log(si);
  }
  // console.log('끝');
  // console.log(JSON.stringify(si, null, '\t'));
  return;
};
