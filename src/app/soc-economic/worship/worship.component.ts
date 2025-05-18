import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-population-table',
  templateUrl: './worship.component.html',
  styleUrls: ['./worship.component.css'],
  standalone: false,
})
export class WorshipComponent {
  isTableHidden = false;
  isDetailTableHidden = false;
  constructor(private http: HttpClient, private router: Router) {}
  
  tableData: any[] = [{
    code: 0,
    state: '',
    totalMosques: 0,
    grandMosques: 0,
    smallMosques: 0,
    quranSchools: 0,
    religiousSchools: 0,
    imams: 0
  }];

  FirstData: any[] = [{
    code: 0,
    state: '',
    totalMosques: 0,
    grandMosques: 0,
    smallMosques: 0,
    quranSchools: 0,
    religiousSchools: 0,
    imams: 0
  }, {
    code: 0,
    state: '',
    totalMosques: 0,
    grandMosques: 0,
    smallMosques: 0,
    quranSchools: 0,
    religiousSchools: 0,
    imams: 0
  }];

  SecondData: any[] = [{
    code: 0,
    state: '',
    totalMosques: 0,
    grandMosques: 0,
    smallMosques: 0,
    quranSchools: 0,
    religiousSchools: 0,
    imams: 0
  }, {
    code: 0,
    state: '',
    totalMosques: 0,
    grandMosques: 0,
    smallMosques: 0,
    quranSchools: 0,
    religiousSchools: 0,
    imams: 0
  }];

  FirstgrandMosqueCount = 0;
  FirstmosqueCount = 0;
  FirstislamicCenterCount = 0;
  FirstquranicSchoolCount = 0;
  FirstreligiousSchoolCount = 0;
  FirstzaouiaCount = 0;
  FirstotherReligiousInstitutionCount = 0;

  SecondgrandMosqueCount = 0;
  SecondmosqueCount = 0;
  SecondislamicCenterCount = 0;
  SecondquranicSchoolCount = 0;
  SecondreligiousSchoolCount = 0;
  SecondzaouiaCount = 0;
  SecondotherReligiousInstitutionCount = 0;

  updateCell(rowIndex: number, field: string, event: Event) {
    const inputElement = event.target as HTMLElement;
    let newValue = inputElement.innerText;
  
    if (field === 'code') {
      const numericValue = parseInt(newValue) || 0;
      this.tableData[rowIndex][field] = numericValue;
      newValue = numericValue.toString();
    } else if (field === 'state') {
      this.tableData[rowIndex][field] = newValue;
    } else {
      const numericValue = parseFloat(newValue) || 0;
      this.tableData[rowIndex][field] = numericValue;
      newValue = numericValue.toString();
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
   
    if (field === 'code') {
      const numericValue = parseInt(newValue) || 0;
      this.FirstData[rowIndex][field] = numericValue;
      newValue = numericValue.toString();
    } else if (field === 'state') {
      this.FirstData[rowIndex][field] = newValue;
    } else {
      const numericValue = parseFloat(newValue) || 0;
      this.FirstData[rowIndex][field] = numericValue;
      newValue = numericValue.toString();
    }
    
    this.calculateFirstTotals();

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
    this.FirstgrandMosqueCount = this.FirstData.reduce((sum, row) => sum + +row.grandMosques, 0);
    this.FirstmosqueCount = this.FirstData.reduce((sum, row) => sum + +row.smallMosques, 0);
    this.FirstislamicCenterCount = this.FirstData.reduce((sum, row) => sum + +row.imams, 0);
    this.FirstquranicSchoolCount = this.FirstData.reduce((sum, row) => sum + +row.quranSchools, 0);
    this.FirstreligiousSchoolCount = this.FirstData.reduce((sum, row) => sum + +row.religiousSchools, 0);
    this.FirstzaouiaCount = this.FirstData.reduce((sum, row) => sum + +row.imams, 0);
    this.FirstotherReligiousInstitutionCount = this.FirstData.reduce((sum, row) => sum + +row.imams, 0);
  }

  updateSecondCell(rowIndex: number, field: string, event: Event) {
    const inputElement = event.target as HTMLElement;
    let newValue = inputElement.innerText;
   
    if (field === 'code') {
      const numericValue = parseInt(newValue) || 0;
      this.SecondData[rowIndex][field] = numericValue;
      newValue = numericValue.toString();
    } else if (field === 'state') {
      this.SecondData[rowIndex][field] = newValue;
    } else {
      const numericValue = parseFloat(newValue) || 0;
      this.SecondData[rowIndex][field] = numericValue;
      newValue = numericValue.toString();
    }
    
    this.calculateSecondTotals();

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
    this.SecondgrandMosqueCount = this.SecondData.reduce((sum, row) => sum + +row.grandMosqueCount, 0);
    this.SecondmosqueCount = this.SecondData.reduce((sum, row) => sum + +row.mosqueCount, 0);
    this.SecondislamicCenterCount = this.SecondData.reduce((sum, row) => sum + +row.islamicCenterCount, 0);
    this.SecondquranicSchoolCount = this.SecondData.reduce((sum, row) => sum + +row.quranicSchoolCount, 0);
    this.SecondreligiousSchoolCount = this.SecondData.reduce((sum, row) => sum + +row.religiousSchoolCount, 0);
    this.SecondzaouiaCount = this.SecondData.reduce((sum, row) => sum + +row.zaouiaCount, 0);
    this.SecondotherReligiousInstitutionCount = this.SecondData.reduce((sum, row) => sum + +row.otherReligiousInstitutionCount, 0);
  }

  exportTableToExcel1() {
    const table = document.getElementById('PopulationTable');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'Worship_Places.xlsx');
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
      XLSX.writeFile(wb, 'Worship_Places_Details.xlsx');
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
      grandMosqueCount: row.grandMosqueCount,
      mosqueCount: row.mosqueCount,
      islamicCenterCount: row.islamicCenterCount,
      quranicSchoolCount: row.quranicSchoolCount,
      religiousSchoolCount: row.religiousSchoolCount,
      zaouiaCount: row.zaouiaCount,
      otherReligiousInstitutionCount: row.otherReligiousInstitutionCount,
      daira: 'Bouira',
    }));
    
    const secondData = this.SecondData.map((row) => ({
      code: row.code,
      state: row.state,
      grandMosqueCount: row.grandMosqueCount,
      mosqueCount: row.mosqueCount,
      islamicCenterCount: row.islamicCenterCount,
      quranicSchoolCount: row.quranicSchoolCount,
      religiousSchoolCount: row.religiousSchoolCount,
      zaouiaCount: row.zaouiaCount,
      otherReligiousInstitutionCount: row.otherReligiousInstitutionCount,
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