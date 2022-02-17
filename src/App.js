import logo from './logo.svg';
import { useEffect, useState } from 'react';
import { getPosition } from './api/address';
import './App.css';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

function App() {
  const workbook = new ExcelJS.Workbook();
  let blob = null;

  const onClick = async () => {
    try {
      await getPosition();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {}, []);

  const handleExcel = async () => {
    for (var i = 0; i < 2; i++) {
      const worksheet = workbook.addWorksheet(`서울 특별시${i}`); // sheet 이름이 My Sheet
      // sheet 데이터 설정
      worksheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'D.O.B.', key: 'DOB', width: 10 },
      ];
      worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
      worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });
      // 다운로드
      const mimeType = {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      };
      const buffer = await workbook.xlsx.writeBuffer();
      blob = new Blob([buffer], mimeType);
      saveAs(blob, `사진관${i}.xlsx`);
    }
  };
  return (
    <div>
      {' '}
      <button onClick={onClick}>엑셀 내보내기!!</button>{' '}
    </div>
  );
}

export default App;
