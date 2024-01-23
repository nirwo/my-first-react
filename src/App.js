import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const App = () => {
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data.xlsx");
      const arrayBuffer = await response.arrayBuffer();

      const workbook = XLSX.read(arrayBuffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setExcelData(jsonData);
    };

    fetchData();
  }, []);

  return (
    <div>
      {excelData.length > 0 &&
        excelData.map((row) => (
          <div key={row.id}>
            <p>{row.name}</p>
            <p>{row.email}</p>
          </div>
        ))}
    </div>
  );
};

export default App;
