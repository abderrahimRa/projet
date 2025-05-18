import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-population-table',
  templateUrl: './social-protection.component.html',
  styleUrls: ['./social-protection.component.css'],
  standalone: false,
})
export class SocialProtectionComponent {
  isTableHidden = false;
  isDetailTableHidden = false;
  constructor(private http: HttpClient, private router: Router) {}
  
  tableData: any[] = [{
    code: 0,
    state: '',
    totalPopulationSupported: 0,
    numSchools: 0,
    numPsychoCentersPhysical: 0,
    numPsychoCentersMental: 0,
    numSchoolsVisuallyImpaired: 0,
    numAssistedChildrenCenters: 0,
    numElderlyHomes: 0,
    numChildProtectionCenters: 0,
    samuServices: 0,
    diarErrahma: 0,
    disabledTrainingCenters: 0,
    numDaycareCenters: 0,
    capacity: 0,
  }];

  FirstData: any[] = [{
    code: 0,
    state: '',
    totalPopulationSupported: 0,
    numSchools: 0,
    numPsychoCentersPhysical: 0,
    numPsychoCentersMental: 0,
    numSchoolsVisuallyImpaired: 0,
    numAssistedChildrenCenters: 0,
    numElderlyHomes: 0,
    numChildProtectionCenters: 0,
    samuServices: 0,
    diarErrahma: 0,
    disabledTrainingCenters: 0,
    numDaycareCenters: 0,
    capacity: 0,
  },
  {
    code: 0,
    state: '',
    totalPopulationSupported: 0,
    numSchools: 0,
    numPsychoCentersPhysical: 0,
    numPsychoCentersMental: 0,
    numSchoolsVisuallyImpaired: 0,
    numAssistedChildrenCenters: 0,
    numElderlyHomes: 0,
    numChildProtectionCenters: 0,
    samuServices: 0,
    diarErrahma: 0,
    disabledTrainingCenters: 0,
    numDaycareCenters: 0,
    capacity: 0,
  }];

  SecondData: any[] = [{
    code: 0,
    state: '',
    totalPopulationSupported: 0,
    numSchools: 0,
    numPsychoCentersPhysical: 0,
    numPsychoCentersMental: 0,
    numSchoolsVisuallyImpaired: 0,
    numAssistedChildrenCenters: 0,
    numElderlyHomes: 0,
    numChildProtectionCenters: 0,
    samuServices: 0,
    diarErrahma: 0,
    disabledTrainingCenters: 0,
    numDaycareCenters: 0,
    capacity: 0,
  },
  {
    code: 0,
    state: '',
    totalPopulationSupported: 0,
    numSchools: 0,
    numPsychoCentersPhysical: 0,
    numPsychoCentersMental: 0,
    numSchoolsVisuallyImpaired: 0,
    numAssistedChildrenCenters: 0,
    numElderlyHomes: 0,
    numChildProtectionCenters: 0,
    samuServices: 0,
    diarErrahma: 0,
    disabledTrainingCenters: 0,
    numDaycareCenters: 0,
    capacity: 0,
  }];

  FirsttotalPopulationSupported = 0;
  FirstnumSchools = 0;
  FirstnumPsychoCentersPhysical = 0;
  FirstnumPsychoCentersMental = 0;
  FirstnumSchoolsVisuallyImpaired = 0;
  FirstnumAssistedChildrenCenters = 0;
  FirstnumElderlyHomes = 0;
  FirstnumChildProtectionCenters = 0;
  FirstsamuServices = 0;
  FirstdiarErrahma = 0;
  FirstdisabledTrainingCenters = 0;
  FirstnumDaycareCenters = 0;
  Firstcapacity = 0;

  SecondtotalPopulationSupported = 0;
  SecondnumSchools = 0;
  SecondnumPsychoCentersPhysical = 0;
  SecondnumPsychoCentersMental = 0;
  SecondnumSchoolsVisuallyImpaired = 0;
  SecondnumAssistedChildrenCenters = 0;
  SecondnumElderlyHomes = 0;
  SecondnumChildProtectionCenters = 0;
  SecondsamuServices = 0;
  SeconddiarErrahma = 0;
  SeconddisabledTrainingCenters = 0;
  SecondnumDaycareCenters = 0;
  Secondcapacity = 0;

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
    this.FirsttotalPopulationSupported = this.FirstData.reduce((sum, row) => sum + +row.totalPopulationSupported, 0);
    this.FirstnumSchools = this.FirstData.reduce((sum, row) => sum + +row.numSchools, 0);
    this.FirstnumPsychoCentersPhysical = this.FirstData.reduce((sum, row) => sum + +row.numPsychoCentersPhysical, 0);
    this.FirstnumPsychoCentersMental = this.FirstData.reduce((sum, row) => sum + +row.numPsychoCentersMental, 0);
    this.FirstnumSchoolsVisuallyImpaired = this.FirstData.reduce((sum, row) => sum + +row.numSchoolsVisuallyImpaired, 0);
    this.FirstnumAssistedChildrenCenters = this.FirstData.reduce((sum, row) => sum + +row.numAssistedChildrenCenters, 0);
    this.FirstnumElderlyHomes = this.FirstData.reduce((sum, row) => sum + +row.numElderlyHomes, 0);
    this.FirstnumChildProtectionCenters = this.FirstData.reduce((sum, row) => sum + +row.numChildProtectionCenters, 0);
    this.FirstsamuServices = this.FirstData.reduce((sum, row) => sum + +row.samuServices, 0);
    this.FirstdiarErrahma = this.FirstData.reduce((sum, row) => sum + +row.diarErrahma, 0);
    this.FirstdisabledTrainingCenters = this.FirstData.reduce((sum, row) => sum + +row.disabledTrainingCenters, 0);
    this.FirstnumDaycareCenters = this.FirstData.reduce((sum, row) => sum + +row.numDaycareCenters, 0);
    this.Firstcapacity = this.FirstData.reduce((sum, row) => sum + +row.capacity, 0);
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
    this.SecondtotalPopulationSupported = this.SecondData.reduce((sum, row) => sum + +row.totalPopulationSupported, 0);
    this.SecondnumSchools = this.SecondData.reduce((sum, row) => sum + +row.numSchools, 0);
    this.SecondnumPsychoCentersPhysical = this.SecondData.reduce((sum, row) => sum + +row.numPsychoCentersPhysical, 0);
    this.SecondnumPsychoCentersMental = this.SecondData.reduce((sum, row) => sum + +row.numPsychoCentersMental, 0);
    this.SecondnumSchoolsVisuallyImpaired = this.SecondData.reduce((sum, row) => sum + +row.numSchoolsVisuallyImpaired, 0);
    this.SecondnumAssistedChildrenCenters = this.SecondData.reduce((sum, row) => sum + +row.numAssistedChildrenCenters, 0);
    this.SecondnumElderlyHomes = this.SecondData.reduce((sum, row) => sum + +row.numElderlyHomes, 0);
    this.SecondnumChildProtectionCenters = this.SecondData.reduce((sum, row) => sum + +row.numChildProtectionCenters, 0);
    this.SecondsamuServices = this.SecondData.reduce((sum, row) => sum + +row.samuServices, 0);
    this.SeconddiarErrahma = this.SecondData.reduce((sum, row) => sum + +row.diarErrahma, 0);
    this.SeconddisabledTrainingCenters = this.SecondData.reduce((sum, row) => sum + +row.disabledTrainingCenters, 0);
    this.SecondnumDaycareCenters = this.SecondData.reduce((sum, row) => sum + +row.numDaycareCenters, 0);
    this.Secondcapacity = this.SecondData.reduce((sum, row) => sum + +row.capacity, 0);
  }

  exportTableToExcel1() {
    const table = document.getElementById('PopulationTable');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'Social_Protection.xlsx');
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
      XLSX.writeFile(wb, 'Social_Protection_Details.xlsx');
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
      totalPopulationSupported: row.totalPopulationSupported,
      numSchools: row.numSchools,
      numPsychoCentersPhysical: row.numPsychoCentersPhysical,
      numPsychoCentersMental: row.numPsychoCentersMental,
      numSchoolsVisuallyImpaired: row.numSchoolsVisuallyImpaired,
      numAssistedChildrenCenters: row.numAssistedChildrenCenters,
      numElderlyHomes: row.numElderlyHomes,
      numChildProtectionCenters: row.numChildProtectionCenters,
      samuServices: row.samuServices,
      diarErrahma: row.diarErrahma,
      disabledTrainingCenters: row.disabledTrainingCenters,
      numDaycareCenters: row.numDaycareCenters,
      capacity: row.capacity,
      daira: 'Bouira',
    }));
    
    const secondData = this.SecondData.map((row) => ({
      code: row.code,
      state: row.state,
      totalPopulationSupported: row.totalPopulationSupported,
      numSchools: row.numSchools,
      numPsychoCentersPhysical: row.numPsychoCentersPhysical,
      numPsychoCentersMental: row.numPsychoCentersMental,
      numSchoolsVisuallyImpaired: row.numSchoolsVisuallyImpaired,
      numAssistedChildrenCenters: row.numAssistedChildrenCenters,
      numElderlyHomes: row.numElderlyHomes,
      numChildProtectionCenters: row.numChildProtectionCenters,
      samuServices: row.samuServices,
      diarErrahma: row.diarErrahma,
      disabledTrainingCenters: row.disabledTrainingCenters,
      numDaycareCenters: row.numDaycareCenters,
      capacity: row.capacity,
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