import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-population-table',
  templateUrl: './mujahideen.component.html',
  styleUrls: ['./mujahideen.component.css'],
  standalone: false,
})
export class MujahideenComponent {
  isTableHidden = false;
  isDetailTableHidden = false;
  constructor(private http: HttpClient, private router: Router) {}
  
  tableData: any[] = [{
    code: '',
    state: '',
    numMujahideenPensions: 0,
    numPensionBeneficiaries: 0,
    numMujahideenMuseums: 0,
    numMujahideenRestCenters: 0,
  }];

  FirstData: any[] = [{
    code: '',
    state: '',
    numMujahideenPensions: 0,
    numPensionBeneficiaries: 0,
    numMujahideenMuseums: 0,
    numMujahideenRestCenters: 0,
  }, {
    code: '',
    state: '',
    numMujahideenPensions: 0,
    numPensionBeneficiaries: 0,
    numMujahideenMuseums: 0,
    numMujahideenRestCenters: 0,
  }];
  
  SecondData: any[] = [{
    code: '',
    state: '',
    numMujahideenPensions: 0,
    numPensionBeneficiaries: 0,
    numMujahideenMuseums: 0,
    numMujahideenRestCenters: 0,
  }, {
    code: '',
    state: '',
    numMujahideenPensions: 0,
    numPensionBeneficiaries: 0,
    numMujahideenMuseums: 0,
    numMujahideenRestCenters: 0,
  }];
  
  FirstNumMujahideenPensions = 0;
  FirstNumPensionBeneficiaries = 0;
  FirstNumMujahideenMuseums = 0;
  FirstNumMujahideenRestCenters = 0;

  SecondNumMujahideenPensions = 0;
  SecondNumPensionBeneficiaries = 0;
  SecondNumMujahideenMuseums = 0;
  SecondNumMujahideenRestCenters = 0;

  updateCell(rowIndex: number, field: string, event: Event) {
    const inputElement = event.target as HTMLElement;
    let newValue = inputElement.innerText;
    this.tableData[rowIndex][field] = +newValue || 0;

    if (!['code', 'state'].includes(field)) {
      const numericValue = parseFloat(newValue) || 0;
      this.tableData[rowIndex][field] = numericValue;
      newValue = numericValue.toString(); 
    } else {
      this.tableData[rowIndex][field] = newValue;
    }
    
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

  updateFirstCell(rowIndex: number, field: string, event: Event) {
    const inputElement = event.target as HTMLElement;
    let newValue = inputElement.innerText;
    this.FirstData[rowIndex][field] = +newValue || 0;
    this.calculateFirstTotals();

    if (!['code', 'state'].includes(field)) {
      const numericValue = parseFloat(newValue) || 0;
      this.FirstData[rowIndex][field] = numericValue;
      newValue = numericValue.toString(); 
    } else {
      this.FirstData[rowIndex][field] = newValue;
    }
    
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

  calculateFirstTotals() {
    this.FirstNumMujahideenPensions = this.FirstData.reduce((sum, row) => sum + +row.numMujahideenPensions, 0);
    this.FirstNumPensionBeneficiaries = this.FirstData.reduce((sum, row) => sum + +row.numPensionBeneficiaries, 0);
    this.FirstNumMujahideenMuseums = this.FirstData.reduce((sum, row) => sum + +row.numMujahideenMuseums, 0);
    this.FirstNumMujahideenRestCenters = this.FirstData.reduce((sum, row) => sum + +row.numMujahideenRestCenters, 0);
  }

  updateSecondCell(rowIndex: number, field: string, event: Event) {
    const inputElement = event.target as HTMLElement;
    let newValue = inputElement.innerText;
    this.SecondData[rowIndex][field] = +newValue || 0;
    this.calculateSecondTotals();

    if (!['code', 'state'].includes(field)) {
      const numericValue = parseFloat(newValue) || 0;
      this.SecondData[rowIndex][field] = numericValue;
      newValue = numericValue.toString(); 
    } else {
      this.SecondData[rowIndex][field] = newValue;
    }
    
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

  calculateSecondTotals() {
    this.SecondNumMujahideenPensions = this.SecondData.reduce((sum, row) => sum + +row.numMujahideenPensions, 0);
    this.SecondNumPensionBeneficiaries = this.SecondData.reduce((sum, row) => sum + +row.numPensionBeneficiaries, 0);
    this.SecondNumMujahideenMuseums = this.SecondData.reduce((sum, row) => sum + +row.numMujahideenMuseums, 0);
    this.SecondNumMujahideenRestCenters = this.SecondData.reduce((sum, row) => sum + +row.numMujahideenRestCenters, 0);
  }

  exportTableToExcel1() {
    const table = document.getElementById('PopulationTable');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'Mujahideen_Data.xlsx');
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
      XLSX.writeFile(wb, 'Mujahideen_Details.xlsx');
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
      
      // Clear all remaining history
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

  combineData() {
    const firstData = this.FirstData.map((row) => ({
      code: row.code,
      state: row.state,
      numMujahideenPensions: row.numMujahideenPensions,
      numPensionBeneficiaries: row.numPensionBeneficiaries,
      numMujahideenMuseums: row.numMujahideenMuseums,
      numMujahideenRestCenters: row.numMujahideenRestCenters,
      daira: 'Bouira',
    }));
    
    const secondData = this.SecondData.map((row) => ({
      code: row.code,
      state: row.state,
      numMujahideenPensions: row.numMujahideenPensions,
      numPensionBeneficiaries: row.numPensionBeneficiaries,
      numMujahideenMuseums: row.numMujahideenMuseums,
      numMujahideenRestCenters: row.numMujahideenRestCenters,
      daira: 'Sour el ghozlane',
    }));
    return [...firstData, ...secondData];
  }

  saveAllData() {
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