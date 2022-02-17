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
    for (let 구 in POSITION[시]) {
      console.log(구);
      let worksheet = workbook.addWorksheet(구);
      let address_arr = [],
        phone_arr = [],
        name_arr = [],
        url_arr = [];
      for await (let 동 of POSITION[시][구]) {
        const { x, y } = 동;
        if (x && y) {
          const url = `https://dapi.kakao.com/v2/local/search/keyword.json?y=${y}&x=${x}&radius=${RADIUS}&query=${KEYWORD}`;
          const res = await axios.get(url, config);
          console.log(res);
          if (res.data.documents) {
            res.data.documents.forEach(item => {
              const { address_name, place_name, phone, place_url } = item;
              address_name ? address_arr.push(address_name) : address_arr.push('null');
              place_name ? name_arr.push(place_name) : name_arr.push('null');
              phone ? phone_arr.push(phone) : phone_arr.push('null');
              url_arr.push(place_url);
            });
          }
        }
      }
      const rawData = [
        { header: '위치', key: 'address', width: 30, data: address_arr },
        { header: '이름', key: 'name', width: 30, data: name_arr },
        { header: '전화번호', key: 'phone', width: 10, data: phone_arr },
        { header: '아이디', key: 'id', width: 10, data: url_arr },
      ];
      rawData.forEach((data, index) => {
        worksheet.getColumn(index + 1).values = [data.header, ...data.data];
      });

      const mimeType = {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      };
      const buffer = await workbook.xlsx.writeBuffer();
      blob = new Blob([buffer], mimeType);
      console.log(`--------구--------`);
    }
    console.log(`---------시--------`);
    saveAs(blob, `${시}사진관.xlsx`);
  }

  return;
};
