import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

interface TableRow {
  code: string;
  state: string;
  numProjectCon: number;
  projectCost: number;
  timestamp?: string;
  [key: string]: string | number | undefined;
}

@Component({
  selector: 'app-population-table',
  templateUrl: './district-budget.component.html',
  styleUrls: ['./district-budget.component.css'],
  standalone: false,
})
export class DistrictComponent {
  isTableHidden = false;
  isDetailTableHidden = false;
  copiedRows: TableRow[] = []; // Stores individual copied rows
  
  constructor(private http: HttpClient, private router: Router) {}
  
  tableData: TableRow[] = [
    {
      code: '',
      state: '',
      numProjectCon: 0,
      projectCost: 0
    }           
  ];

  // Copy specific row
  copyRow(rowIndex: number) {
    const timestamp = new Date().toLocaleTimeString();
    const rowCopy = {
      ...this.tableData[rowIndex],
      timestamp: timestamp
    };
    this.copiedRows.push(rowCopy);
  }

  // Clear last copied row
  clearRow() {
    if (this.copiedRows.length > 0) {
      this.copiedRows.pop();
    }
  }

  // Delete specific copied row
  deleteCopiedRow(index: number) {
    if (confirm('Are you sure you want to delete this row?')) {
      this.copiedRows.splice(index, 1);
    }
  }

  updateCell(rowIndex: number, field: keyof TableRow, event: Event) {
    const inputElement = event.target as HTMLElement;
    const newValue = inputElement.innerText;

    if (field === 'code' || field === 'state') {
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
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'Ports.xlsx');
    } else {
      console.error('Table not found!');
    }
  }

  exportTableToExcel2() {
    const table = document.getElementById('detail');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'PopulationData2.xlsx');
    } else {
      console.error('Table not found!');
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