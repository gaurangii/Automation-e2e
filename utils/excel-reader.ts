import * as XLSX from 'xlsx';
import path from 'path';

type ExcelRow = Record<string, string | number | boolean | null>;

const defaultExcelPath = path.resolve(process.cwd(), 'data', 'Customer-Panel.xlsx');

export function readExcelSheet(
  sheetName: string = 'Login',
  filePath: string = defaultExcelPath
): ExcelRow[] {
  const workbook = XLSX.readFile('/Users/gaurangisharma/Documents/Testing/data/Customer-Panel.xlsx');
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    throw new Error(`Sheet "${sheetName}" not found in Excel file`);
  }

  return XLSX.utils.sheet_to_json<ExcelRow>(worksheet, {
    defval: '',
  });
}

export function getLoginData(): ExcelRow {
  const rows = readExcelSheet('Login');

  if (rows.length === 0) {
    throw new Error('No data found in login sheet');
  }

  return rows[0];
}

export function getLastLoginData(): ExcelRow {
  const rows = readExcelSheet('Login');

  if (rows.length === 0) {
    throw new Error('No data found in login sheet');
  }

  return rows[rows.length - 1];
}