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
  //   let DATA = {};
  //   let gu = {};
  //   let si = [];
  //   let dong = [];
  //   let newState = {};
  //   let 구;
  //   for (let 시 in sigungu) {
  //     for (구 in sigungu[시]) {
  //       for (let 동 in sigungu[시][구]) {
  //         dong.push(sigungu[시][구][동]);
  //         // console.log(sigungu[시][구][동]);
  //       }
  //       //   console.log(`-------${구}-------`);
  //       gu = {
  //         ...gu,
  //         [구]: dong,
  //       };
  //       dong = [];
  //     }
  //     console.log(`-------${시}------`);
  //     si = {
  //       ...si,
  //       [시]: gu,
  //     };
  //     gu = {};
  //     console.log(si);
  //   }

  let dong_arr = [];
  let gu = {};
  let si = [];
  for (let 시 in sigungu) {
    for (let 구 in sigungu[시]) {
      for await (let 동 of sigungu[시][구]) {
        // 동 중심좌표 받아오기
        const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${동}}`;
        const res = await axios.get(url, config);

        if (res.data.documents[0]) {
          const { x, y } = res.data.documents[0];
          let dong = {
            x: x,
            y: y,
            [동]: 동,
          };
          dong_arr.push(dong);
        }
      }
      gu = {
        ...gu,
        [구]: dong_arr,
      };
      dong_arr = [];
      console.log(gu);
    }
    console.log('hello');
    si = {
      ...si,
      [시]: gu,
    };
    console.log(si);
  }
  console.log('끝');
  console.log(JSON.stringify(si, null, '\t'));
  return;
};
