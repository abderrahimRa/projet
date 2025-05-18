import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

interface TableRow {
  NumTransactionsNotified: number;
  CorrespondingAEnotified: number;
  CumulativeExpenditure: number;
  NumActiveTransactions: number;
  CurrentAE: number;
  Observations: string;
  timestamp?: string;
  [key: string]: string | number | undefined;
}

@Component({
  selector: 'app-population-table',
  templateUrl: './pec.component.html',
  styleUrls: ['./pec.component.css'],
  standalone: false,
})
export class PecComponent {
  isTableHidden = false;
  isDetailTableHidden = false;
  copiedRows: TableRow[] = []; // Stores individual copied rows
  
  constructor(private http: HttpClient, private router: Router) {}
  
  tableData: TableRow[] = [
    {
      NumTransactionsNotified: 0,
      CorrespondingAEnotified: 0,
      CumulativeExpenditure: 0,
      NumActiveTransactions: 0,
      CurrentAE: 0,
      Observations: '',
    }           
  ];

  // Copy specific row with timestamp
  copyRow(rowIndex: number) {
    const timestamp = new Date().toLocaleTimeString();
    const rowCopy = {
      ...this.tableData[rowIndex],
      timestamp: timestamp
    };
    this.copiedRows.push(rowCopy);
  }

  deleteCopiedRow(index: number) {
    if (confirm('Are you sure you want to delete this row?')) {
      this.copiedRows.splice(index, 1);
    }
  }

  
  updateCell(rowIndex: number, field: string, event: Event) {
    const inputElement = event.target as HTMLElement;
    const newValue = inputElement.innerText;

    if (field === 'Observations') {
      this.tableData[rowIndex][field] = newValue;
    } else {
      this.tableData[rowIndex][field] = parseFloat(newValue) || 0;
    }

  }

  exportTableToExcel1() {
    const table = document.getElementById('PopulationTable');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'PEC Main Data');
      XLSX.writeFile(wb, 'PEC_Main_Data.xlsx');
    }
  }

  exportTableToExcel2() {
    const table = document.getElementById('detail');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'PEC Detail Data');
      XLSX.writeFile(wb, 'PEC_Detail_Data.xlsx');
    }
  }

  exportAllTables() {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    
    const mainTable = document.getElementById('PopulationTable');
    if (mainTable) {
      const ws1: XLSX.WorkSheet = XLSX.utils.table_to_sheet(mainTable);
      XLSX.utils.book_append_sheet(wb, ws1, 'PEC Main Data');
    }
    
    const detailTable = document.getElementById('detail');
    if (detailTable) {
      const ws2: XLSX.WorkSheet = XLSX.utils.table_to_sheet(detailTable);
      XLSX.utils.book_append_sheet(wb, ws2, 'PEC Detail Data');
    }
    
    if (wb.SheetNames.length > 0) {
      XLSX.writeFile(wb, 'PEC_Complete_Data.xlsx');
    }
  }

  toggleTable() {
    this.isTableHidden = !this.isTableHidden;
  }

  toggleDetailTable() {
    this.isDetailTableHidden = !this.isDetailTableHidden;
  }

  onLogout() {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('userRole');
      this.router.navigate(['/login'], { replaceUrl: true });
      
      setTimeout(() => {
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', () => {
          window.history.pushState(null, '', window.location.href);
        });
      }, 100);
    }
  }

  saveTableData() {
    const url = 'https://your-backend-api.com/save-data';
    this.http.post(url, this.tableData).subscribe(
      (response) => {
        console.log('Data saved successfully!', response);
      },
      (error) => {
        console.error('Error saving data:', error);
      }
    );
  }
}