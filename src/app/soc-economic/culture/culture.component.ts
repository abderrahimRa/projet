import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-population-table',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.css'],
  standalone: false,
})
export class CultureComponent {
  isTableHidden = false;
  isDetailTableHidden = false;
  constructor(private http: HttpClient, private router: Router) {}
  
  tableData: any[] = [{
    code: 0,
    state: '',
    numMuseums: 0,
    numMovieTheaters: 0,
    numLibraries: 0,
    numCulturalHouses: 0,
    numCulturalCenters: 0,
    numTheaters: 0,
    numMusicInstitutes: 0,
    numFineArtsInstitutes: 0,
    numA: 0,
    numAffiliates: 0
  }];

  FirstData: any[] = [{
    code: 0,
    state: '',
    numMuseums: 0,
    numMovieTheaters: 0,
    numLibraries: 0,
    numCulturalHouses: 0,
    numCulturalCenters: 0,
    numTheaters: 0,
    numMusicInstitutes: 0,
    numFineArtsInstitutes: 0,
    numA: 0,
    numAffiliates: 0
  },
  {
    code: 0,
    state: '',
    numMuseums: 0,
    numMovieTheaters: 0,
    numLibraries: 0,
    numCulturalHouses: 0,
    numCulturalCenters: 0,
    numTheaters: 0,
    numMusicInstitutes: 0,
    numFineArtsInstitutes: 0,
    numA: 0,
    numAffiliates: 0
  },
];

  SecondData: any[] = [{
    code: 0,
    state: '',
    numMuseums: 0,
    numMovieTheaters: 0,
    numLibraries: 0,
    numCulturalHouses: 0,
    numCulturalCenters: 0,
    numTheaters: 0,
    numMusicInstitutes: 0,
    numFineArtsInstitutes: 0,
    numA: 0,
    numAffiliates: 0
  },
  {
    code: 0,
    state: '',
    numMuseums: 0,
    numMovieTheaters: 0,
    numLibraries: 0,
    numCulturalHouses: 0,
    numCulturalCenters: 0,
    numTheaters: 0,
    numMusicInstitutes: 0,
    numFineArtsInstitutes: 0,
    numA: 0,
    numAffiliates: 0
  },];

  // Totals for First Daira
  FirstnumMuseums = 0;
  FirstnumMovieTheaters = 0;
  FirstnumLibraries = 0;
  FirstnumCulturalHouses = 0;
  FirstnumCulturalCenters = 0;
  FirstnumTheaters = 0;
  FirstnumMusicInstitutes = 0;
  FirstnumFineArtsInstitutes = 0;
  FirstnumA = 0;
  FirstnumAffiliates = 0;

  // Totals for Second Daira
  SecondnumMuseums = 0;
  SecondnumMovieTheaters = 0;
  SecondnumLibraries = 0;
  SecondnumCulturalHouses = 0;
  SecondnumCulturalCenters = 0;
  SecondnumTheaters = 0;
  SecondnumMusicInstitutes = 0;
  SecondnumFineArtsInstitutes = 0;
  SecondnumA = 0;
  SecondnumAffiliates = 0;

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
    this.FirstnumMuseums = this.FirstData.reduce((sum, row) => sum + +row.numMuseums, 0);
    this.FirstnumMovieTheaters = this.FirstData.reduce((sum, row) => sum + +row.numMovieTheaters, 0);
    this.FirstnumLibraries = this.FirstData.reduce((sum, row) => sum + +row.numLibraries, 0);
    this.FirstnumCulturalHouses = this.FirstData.reduce((sum, row) => sum + +row.numCulturalHouses, 0);
    this.FirstnumCulturalCenters = this.FirstData.reduce((sum, row) => sum + +row.numCulturalCenters, 0);
    this.FirstnumTheaters = this.FirstData.reduce((sum, row) => sum + +row.numTheaters, 0);
    this.FirstnumMusicInstitutes = this.FirstData.reduce((sum, row) => sum + +row.numMusicInstitutes, 0);
    this.FirstnumFineArtsInstitutes = this.FirstData.reduce((sum, row) => sum + +row.numFineArtsInstitutes, 0);
    this.FirstnumA = this.FirstData.reduce((sum, row) => sum + +row.numA, 0);
    this.FirstnumAffiliates = this.FirstData.reduce((sum, row) => sum + +row.numAffiliates, 0);
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
    this.SecondnumMuseums = this.SecondData.reduce((sum, row) => sum + +row.numMuseums, 0);
    this.SecondnumMovieTheaters = this.SecondData.reduce((sum, row) => sum + +row.numMovieTheaters, 0);
    this.SecondnumLibraries = this.SecondData.reduce((sum, row) => sum + +row.numLibraries, 0);
    this.SecondnumCulturalHouses = this.SecondData.reduce((sum, row) => sum + +row.numCulturalHouses, 0);
    this.SecondnumCulturalCenters = this.SecondData.reduce((sum, row) => sum + +row.numCulturalCenters, 0);
    this.SecondnumTheaters = this.SecondData.reduce((sum, row) => sum + +row.numTheaters, 0);
    this.SecondnumMusicInstitutes = this.SecondData.reduce((sum, row) => sum + +row.numMusicInstitutes, 0);
    this.SecondnumFineArtsInstitutes = this.SecondData.reduce((sum, row) => sum + +row.numFineArtsInstitutes, 0);
    this.SecondnumA = this.SecondData.reduce((sum, row) => sum + +row.numA, 0);
    this.SecondnumAffiliates = this.SecondData.reduce((sum, row) => sum + +row.numAffiliates, 0);
  }

  exportTableToExcel1() {
    const table = document.getElementById('PopulationTable');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'Cultural_Facilities.xlsx');
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
      XLSX.writeFile(wb, 'Cultural_Facilities_Details.xlsx');
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
    const url = 'http://localhost:8082/api/cultural-institutions/savedata';
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
      numMuseums: row.numMuseums,
      numMovieTheaters: row.numMovieTheaters,
      numLibraries: row.numLibraries,
      numCulturalHouses: row.numCulturalHouses,
      numCulturalCenters: row.numCulturalCenters,
      numTheaters: row.numTheaters,
      numMusicInstitutes: row.numMusicInstitutes,
      numFineArtsInstitutes: row.numFineArtsInstitutes,
      numA: row.numA,
      numAffiliates: row.numAffiliates,
      daira: 'Bouira',
    }));
    
    const secondData = this.SecondData.map((row) => ({
      code: row.code,
      state: row.state,
      numMuseums: row.numMuseums,
      numMovieTheaters: row.numMovieTheaters,
      numLibraries: row.numLibraries,
      numCulturalHouses: row.numCulturalHouses,
      numCulturalCenters: row.numCulturalCenters,
      numTheaters: row.numTheaters,
      numMusicInstitutes: row.numMusicInstitutes,
      numFineArtsInstitutes: row.numFineArtsInstitutes,
      numA: row.numA,
      numAffiliates: row.numAffiliates,
      daira: 'Sour el ghozlane',
    }));
    return [...firstData, ...secondData];
  }

  saveAllData() {
    const combinedData = this.combineData();
    const url = 'http://localhost:8082/api/cultural-institutions';
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