import axios from 'axios';
import { POSITION } from './position';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const workbook = new ExcelJS.Workbook();
let blob = null;

const KEY = 'e8a6648f10745c5cfa395c1b839ee0ae';
const KEYWORD = '사진관';
const RADIUS = 20000;

export const getPosition = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `KakaoAK ${KEY}`,
    },
  };

  for (let 시 in POSITION) {
    const worksheet = workbook.addWorksheet(시); // sheet 이름이 My Sheet
    // worksheet.columns = [
    //   { header: '위치', key: 'address', width: 10 },
    //   { header: '이름', key: 'name', width: 32 },
    //   { header: '전화번호', key: 'phone', width: 10 },
    // ];
    let address_arr = [];
    let phone_arr = [];
    let name_arr = [];
    for (let 구 in POSITION[시]) {
      for await (let 동 of POSITION[시][구]) {
        const { x, y } = 동;
        if (x && y) {
          const url = `https://dapi.kakao.com/v2/local/search/keyword.json?y=${y}&x=${x}&radius=${RADIUS}&query=${KEYWORD}`;
          const res = await axios.get(url, config);
          console.log(res);
          if (res.data.documents) {
            res.data.documents.forEach(item => {
              const { address_name, place_name, phone } = item;
              address_arr.push(address_name);
              name_arr.push(place_name);
              phone_arr.push(phone);
            });
          }
        }
      }
    }
    console.log(`---------구--------`);
    // const rawData = [
    //   { header: '위치', key: 'address', data: Array.from(new Set(address_arr)) },
    //   { header: '이름', key: 'name', data: Array.from(new Set(name_arr)) },
    //   { header: '전화번호', key: 'phone', data: Array.from(new Set(phone_arr)) },
    // ];
    // const rawData = [
    //   { header: '위치', key: 'address', address_arr },
    //   { header: '이름', key: 'name', name_arr },
    //   { header: '전화번호', key: 'phone', phone_arr },
    // ];

    // rawData.forEach((data, index) => {
    //   worksheet.getColumn(index + 1).values = [data.header, ...data.data];
    // });

    const mimeType = {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };
    const buffer = await workbook.xlsx.writeBuffer();
    blob = new Blob([buffer], mimeType);
    saveAs(blob, `${시}사진관.xlsx`);
    return;
  }

  return;
};
