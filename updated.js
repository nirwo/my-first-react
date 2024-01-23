import * as XLSX from 'xlsx';

// Function to read the XLSX file
const readXlsxFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // On file load
    reader.onload = (event: any) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      resolve(jsonData);
    };

    // On file load error
    reader.onerror = (event) => {
      reject(event.target.error);
    };

    // Read the file as array buffer
    reader.readAsArrayBuffer(file);
  });
};

// Example usage
const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const filterInput = document.getElementById('filterInput') as HTMLInputElement;
const resultContainer = document.getElementById('resultContainer');

fileInput.addEventListener('change', async () => {
  const [file] = fileInput.files;

  if (file) {
    try {
      const jsonData = await readXlsxFile(file);
      showFilteredData(jsonData);
    } catch (error) {
      console.error('Error reading XLSX file:', error);
    }
  }
});

filterInput.addEventListener('input', () => {
  const searchText = filterInput.value.toLowerCase();
  const rows = Array.from(resultContainer.querySelectorAll('tr'));

  rows.forEach((row) => {
    const text = row.textContent?.toLowerCase() || '';
    row.style.display = text.includes(searchText) ? 'table-row' : 'none';
  });
});

const showFilteredData = (jsonData: any[]) => {
  resultContainer.innerHTML = '';

  jsonData.forEach((row) => {
    const tr = document.createElement('tr');

    row.forEach((cell) => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });

    resultContainer.appendChild(tr);
  });
};