import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

interface TableRow {
  subsector: string;
  numProject22: number;
  projectCost22: number;
  numProject23: number;
  projectCost23: number;
  Observation: string;
  timestamp?: string;
  [key: string]: string | number | undefined;
}

@Component({
  selector: 'app-population-table',
  templateUrl: './state-budget.component.html',
  styleUrls: ['./state-budget.component.css'],
  standalone: false,
})
export class StateComponent {
  isTableHidden = false;
  isDetailTableHidden = false;
  copiedRows: TableRow[] = []; // Stores individual copied rows
  
  constructor(private http: HttpClient, private router: Router) {}
  
  tableData: TableRow[] = [
    {
      subsector: '',
      numProject22: 0,
      projectCost22: 0,
      numProject23: 0,
      projectCost23: 0,
      Observation: '',
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

  updateCell(rowIndex: number, field: keyof TableRow, event: Event) {
    const inputElement = event.target as HTMLElement;
    const newValue = inputElement.innerText;

    if (field === 'subsector' || field === 'Observation') {
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
        const table = document.getElementById('detail'); // Get the table by ID
        if (table) {
          const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
          const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
          XLSX.writeFile(wb, 'PopulationData2.xlsx'); // Export the workbook as an Excel file
        } else {
          console.error('Table not found!');
        }
      }

  // Export both tables to a single Excel file
  exportAllTables() {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    
    const mainTable = document.getElementById('PopulationTable');
    if (mainTable) {
      const ws1: XLSX.WorkSheet = XLSX.utils.table_to_sheet(mainTable);
      XLSX.utils.book_append_sheet(wb, ws1, 'Main Data');
    }
    
    const detailTable = document.getElementById('detail');
    if (detailTable) {
      const ws2: XLSX.WorkSheet = XLSX.utils.table_to_sheet(detailTable);
      XLSX.utils.book_append_sheet(wb, ws2, 'Detail Data');
    }
    
    if (wb.SheetNames.length > 0) {
      XLSX.writeFile(wb, 'State_Complete_Data.xlsx');
    } else {
      console.error('No tables found to export!');
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