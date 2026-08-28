import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';

/** Reads the first non-empty sheet of a workbook, renders it as an off-screen HTML table, and rasterizes it with html2canvas. */
export async function renderExcelSheetToCanvas(file: File): Promise<HTMLCanvasElement> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });

  const sheetName = workbook.SheetNames.find((name) => {
    const rows: unknown[][] = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1 });
    return rows.length > 0;
  }) ?? workbook.SheetNames[0];

  if (!sheetName) throw new Error('This workbook has no sheets.');

  const rows: string[][] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, defval: '' });
  if (rows.length === 0) throw new Error('This sheet is empty.');

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-99999px';
  container.style.top = '0';
  container.style.background = '#ffffff';
  container.style.padding = '16px';
  container.style.width = 'fit-content';

  const table = document.createElement('table');
  table.style.borderCollapse = 'collapse';
  table.style.fontFamily = 'Arial, sans-serif';
  table.style.fontSize = '13px';
  table.style.background = '#ffffff';

  rows.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    row.forEach((cell) => {
      const td = document.createElement(rowIndex === 0 ? 'th' : 'td');
      td.textContent = String(cell ?? '');
      td.style.border = '1px solid #cccccc';
      td.style.padding = '6px 10px';
      td.style.textAlign = 'left';
      td.style.whiteSpace = 'nowrap';
      if (rowIndex === 0) {
        td.style.background = '#f0f0f0';
        td.style.fontWeight = 'bold';
      }
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  container.appendChild(table);
  document.body.appendChild(container);

  try {
    return await html2canvas(container, { backgroundColor: '#ffffff', scale: 2 });
  } finally {
    document.body.removeChild(container);
  }
}
