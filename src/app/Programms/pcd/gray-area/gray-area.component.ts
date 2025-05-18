import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-population-table',
  templateUrl: './gray-area.component.html',
  styleUrls: ['./gray-area.component.css'],
  standalone: false,
})
export class GrayAreaComponent {
  isTableHidden = false;
  isDetailTableHidden = false;
  
  constructor(private http: HttpClient, private router: Router) {}
  
  // Main table data
  tableData: any[] = [{
    code: '',
    state: '',
    totalGrayAreas: 0,
    grayAreasPCD: 0,
  }];

  // Data for Daira: Bouira
  FirstData: any[] = [
    {
      code: '',
      state: '',
      totalGrayAreas: 0,
      grayAreasPCD: 0,
    },
    {
      code: '',
      state: '',
      totalGrayAreas: 0,
      grayAreasPCD: 0,
    }
  ];

  // Data for Daira: Sour el ghozlane
  SecondData: any[] = [
    {
      code: '',
      state: '',
      totalGrayAreas: 0,
      grayAreasPCD: 0,
    },
    {
      code: '',
      state: '',
      totalGrayAreas: 0,
      grayAreasPCD: 0,
    }
  ];

  // Totals for Daira: Bouira
  FirsttotalGrayAreas = 0;
  FirstgrayAreasPCD = 0;

  // Totals for Daira: Sour el ghozlane
  SecondtotalGrayAreas = 0;
  SecondgrayAreasPCD = 0;

  // Common cell update logic
  private updateCellLogic(dataArray: any[], rowIndex: number, field: string, newValue: string): void {
    if (!['code', 'state'].includes(field)) {
      dataArray[rowIndex][field] = parseFloat(newValue) || 0;
    } else {
      dataArray[rowIndex][field] = newValue;
    }
  }

  // Update main table cell
  updateCell(rowIndex: number, field: string, event: Event): void {
    const inputElement = event.target as HTMLElement;
    const newValue = inputElement.innerText;
    this.updateCellLogic(this.tableData, rowIndex, field, newValue);
    this.focusInputElement(inputElement, newValue);
  }

  // Update first table cell
  updateFirstCell(rowIndex: number, field: string, event: Event): void {
    const inputElement = event.target as HTMLElement;
    const newValue = inputElement.innerText;
    this.updateCellLogic(this.FirstData, rowIndex, field, newValue);
    this.calculateFirstTotals();
    this.focusInputElement(inputElement, newValue);
  }

  // Calculate totals for Daira: Bouira
  calculateFirstTotals(): void {
    this.FirsttotalGrayAreas = this.FirstData.reduce((sum, row) => sum + row.totalGrayAreas, 0);
    this.FirstgrayAreasPCD = this.FirstData.reduce((sum, row) => sum + row.grayAreasPCD, 0);
  }

  // Update second table cell
  updateSecondCell(rowIndex: number, field: string, event: Event): void {
    const inputElement = event.target as HTMLElement;
    const newValue = inputElement.innerText;
    this.updateCellLogic(this.SecondData, rowIndex, field, newValue);
    this.calculateSecondTotals();
    this.focusInputElement(inputElement, newValue);
  }

  // Calculate totals for Daira: Sour el ghozlane
  calculateSecondTotals(): void {
    this.SecondtotalGrayAreas = this.SecondData.reduce((sum, row) => sum + row.totalGrayAreas, 0);
    this.SecondgrayAreasPCD = this.SecondData.reduce((sum, row) => sum + row.grayAreasPCD, 0);
  }

  // Helper method to focus input element
  private focusInputElement(inputElement: HTMLElement, newValue: string): void {
    setTimeout(() => {
      if (inputElement.childNodes.length > 0) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(inputElement.childNodes[0], newValue.length);
        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    });
  }

  // Export main table to Excel
  exportTableToExcel1(): void {
    const table = document.getElementById('PopulationTable');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'GrayAreasSummary');
      XLSX.writeFile(wb, 'GrayAreasSummary.xlsx');
    } else {
      console.error('Main table not found!');
    }
  }

  // Export detail table to Excel
  exportTableToExcel2(): void {
    const table = document.getElementById('detail');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'GrayAreasDetails');
      XLSX.writeFile(wb, 'GrayAreasDetails.xlsx');
    } else {
      console.error('Detail table not found!');
    }
  }

  // Toggle table visibility
  toggleTable(): void {
    this.isTableHidden = !this.isTableHidden;
  }

  // Toggle detail table visibility
  toggleDetailTable(): void {
    this.isDetailTableHidden = !this.isDetailTableHidden;
  }

  // Logout functionality
  onLogout(): void {
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('userRole');
      this.router.navigate(['/login'], { replaceUrl: true });
      
      // Clear all remaining history
      setTimeout(() => {
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', () => {
          window.history.pushState(null, '', window.location.href);
        });
      }, 100);
    }
  }

  // Save main table data
  saveTableData(): void {
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

  // Combine data from both detail tables
  combineData(): any[] {
    const firstData = this.FirstData.map((row) => ({
      code: row.code,
      state: row.state,
      totalGrayAreas: row.totalGrayAreas,
      grayAreasPCD: row.grayAreasPCD,
      daira: 'Bouira',
    }));
    
    const secondData = this.SecondData.map((row) => ({
      code: row.code,
      state: row.state,
      totalGrayAreas: row.totalGrayAreas,
      grayAreasPCD: row.grayAreasPCD,
      daira: 'Sour el ghozlane',
    }));
    
    return [...firstData, ...secondData];
  }

  // Save all data (combined)
  saveAllData(): void {
    const combinedData = this.combineData();
    const url = 'https://your-backend-api.com/save-data';
    
    this.http.post(url, combinedData).subscribe(
      (response) => {
        console.log('All data saved successfully!', response);
      },
      (error) => {
        console.error('Error saving data:', error);
      }
    );
  }
}