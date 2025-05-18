import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './boardingschool-capacity.component.html',
  styleUrls: ['./boardingschool-capacity.component.css'],
  standalone: false,
})

export class BoardingschoolCapacityComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private dairaComparisonChart: any;
  private utilizationChart: any;

  constructor(private http: HttpClient, private router: Router) {}

  tableData: any[] = [{
    code: '',
    state: '',
    numBoardingSchools: 0,
    numAccommodationBeds: 0,
    numStudentsHoused: 0,
    accommodationCapacityUtilRate: 0,
  }];

  FirstData: any[] = [{
    code: '',
    state: '',
    numBoardingSchools: 0,
    numAccommodationBeds: 0,
    numStudentsHoused: 0,
    accommodationCapacityUtilRate: 0,
  }, {
    code: '',
    state: '',
    numBoardingSchools: 0,
    numAccommodationBeds: 0,
    numStudentsHoused: 0,
    accommodationCapacityUtilRate: 0,
  }];

  SecondData: any[] = [{
    code: '',
    state: '',
    numBoardingSchools: 0,
    numAccommodationBeds: 0,
    numStudentsHoused: 0,
    accommodationCapacityUtilRate: 0,
  }, {
    code: '',
    state: '',
    numBoardingSchools: 0,
    numAccommodationBeds: 0,
    numStudentsHoused: 0,
    accommodationCapacityUtilRate: 0,
  }];

  FirstnumBoardingSchools = 0;
  FirstnumAccommodationBeds = 0;
  FirstnumStudentsHoused = 0;
  FirstaccommodationCapacityUtilRate = 0;

  SecondnumBoardingSchools = 0;
  SecondnumAccommodationBeds = 0;
  SecondnumStudentsHoused = 0;
  SecondaccommodationCapacityUtilRate = 0;

  calculateCapacityUtilization(row: any) {
    return {
      accommodationCapacityUtilRate: row.numAccommodationBeds ? 
        (row.numStudentsHoused / row.numAccommodationBeds) * 100 : 0
    };
  }

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
    
    Object.assign(this.tableData[rowIndex], this.calculateCapacityUtilization(this.tableData[rowIndex]));
    
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
    
    Object.assign(this.FirstData[rowIndex], this.calculateCapacityUtilization(this.FirstData[rowIndex]));
    
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
    this.FirstnumBoardingSchools = this.FirstData.reduce((sum, row) => sum + +row.numBoardingSchools, 0);
    this.FirstnumAccommodationBeds = this.FirstData.reduce((sum, row) => sum + +row.numAccommodationBeds, 0);
    this.FirstnumStudentsHoused = this.FirstData.reduce((sum, row) => sum + +row.numStudentsHoused, 0);
    this.FirstaccommodationCapacityUtilRate = this.FirstnumAccommodationBeds ? 
      (this.FirstnumStudentsHoused / this.FirstnumAccommodationBeds) * 100 : 0;
    this.updateCharts();
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
    
    Object.assign(this.SecondData[rowIndex], this.calculateCapacityUtilization(this.SecondData[rowIndex]));
    
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
    this.SecondnumBoardingSchools = this.SecondData.reduce((sum, row) => sum + +row.numBoardingSchools, 0);
    this.SecondnumAccommodationBeds = this.SecondData.reduce((sum, row) => sum + +row.numAccommodationBeds, 0);
    this.SecondnumStudentsHoused = this.SecondData.reduce((sum, row) => sum + +row.numStudentsHoused, 0);
    this.SecondaccommodationCapacityUtilRate = this.SecondnumAccommodationBeds ? 
      (this.SecondnumStudentsHoused / this.SecondnumAccommodationBeds) * 100 : 0;
    this.updateCharts();
  }

  exportTableToExcel1() {
    const table = document.getElementById('PopulationTable');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'BoardingSchools.xlsx');
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
      XLSX.writeFile(wb, 'BoardingSchools_Details.xlsx');
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
      numBoardingSchools: row.numBoardingSchools,
      numAccommodationBeds: row.numAccommodationBeds,
      numStudentsHoused: row.numStudentsHoused,
      accommodationCapacityUtilRate: row.accommodationCapacityUtilRate,
      daira: 'Bouira',
    }));
    
    const secondData = this.SecondData.map((row) => ({
      code: row.code,
      state: row.state,
      numBoardingSchools: row.numBoardingSchools,
      numAccommodationBeds: row.numAccommodationBeds,
      numStudentsHoused: row.numStudentsHoused,
      accommodationCapacityUtilRate: row.accommodationCapacityUtilRate,
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
    }, 0);
  }

  private initCharts() {
    this.initStateChart();
    this.initDairaComparisonChart();
    this.initUtilizationChart();
  }

  private initStateChart() {
    const ctx = document.getElementById('stateChart') as HTMLCanvasElement;
    this.stateChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Boarding Schools', 'Accommodation Beds', 'Students Housed'],
        datasets: [{
          label: 'State Total',
          data: this.getStateDataTotals(),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Boarding School Facilities Overview')
    });
  }

  private initDairaComparisonChart() {
    const ctx = document.getElementById('dairaComparisonChart') as HTMLCanvasElement;
    this.dairaComparisonChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Boarding Schools', 'Accommodation Beds', 'Students Housed'],
        datasets: [
          {
            label: 'Bouira',
            data: [
              this.FirstnumBoardingSchools,
              this.FirstnumAccommodationBeds,
              this.FirstnumStudentsHoused
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Sour El Ghozlane',
            data: [
              this.SecondnumBoardingSchools,
              this.SecondnumAccommodationBeds,
              this.SecondnumStudentsHoused
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: this.getChartOptions('Daira Comparison: Boarding School Facilities')
    });
  }

  private initUtilizationChart() {
    const ctx = document.getElementById('utilizationChart') as HTMLCanvasElement;
    this.utilizationChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Bouira', 'Sour El Ghozlane'],
        datasets: [{
          label: 'Capacity Utilization Rate (%)',
          data: [
            this.FirstaccommodationCapacityUtilRate,
            this.SecondaccommodationCapacityUtilRate
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Boarding School Capacity Utilization')
    });
  }

  private getStateDataTotals(): number[] {
    return [
      this.tableData.reduce((sum, row) => sum + row.numBoardingSchools, 0),
      this.tableData.reduce((sum, row) => sum + row.numAccommodationBeds, 0),
      this.tableData.reduce((sum, row) => sum + row.numStudentsHoused, 0)
    ];
  }

  private getChartOptions(title: string): any {
    return {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: title.includes('Utilization') ? 'Utilization Rate (%)' : 'Number of Facilities'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: title,
          font: {
            size: 16
          }
        },
        legend: {
          position: 'top'
        }
      }
    };
  }

  private updateCharts() {
    if (this.stateChart) {
      this.stateChart.data.datasets[0].data = this.getStateDataTotals();
      this.stateChart.update();
    }

    if (this.dairaComparisonChart) {
      this.dairaComparisonChart.data.datasets[0].data = [
        this.FirstnumBoardingSchools,
        this.FirstnumAccommodationBeds,
        this.FirstnumStudentsHoused
      ];
      this.dairaComparisonChart.data.datasets[1].data = [
        this.SecondnumBoardingSchools,
        this.SecondnumAccommodationBeds,
        this.SecondnumStudentsHoused
      ];
      this.dairaComparisonChart.update();
    }

    if (this.utilizationChart) {
      this.utilizationChart.data.datasets[0].data = [
        this.FirstaccommodationCapacityUtilRate,
        this.SecondaccommodationCapacityUtilRate
      ];
      this.utilizationChart.update();
    }
  }
}