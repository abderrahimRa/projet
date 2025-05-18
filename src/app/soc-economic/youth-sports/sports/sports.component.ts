import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css'],
  standalone: false,
})

export class SportsComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private dairaTotalsChart: any;

  constructor(private http: HttpClient, private router: Router) {}
                        
         tableData: any[] = [
           {
             code: '',
             state: '',
             specializedR: 0,
             multiPurposeR: 0,
             multiSportsR: 0,
             olympicS: 0,
             municipalS: 0,
             semiOlympicS: 0,
             multiSportsS: 0,
             olympicP: 0,
             semiOlympicP: 0,
             swimmingPools: 0,
             sportsComplexes: 0,
           },
           
         ];
      
           FirstData: any[] = [
           {
            code: '',
            state: '',
            specializedR: 0,
            multiPurposeR: 0,
            multiSportsR: 0,
            olympicS: 0,
            municipalS: 0,
            semiOlympicS: 0,
            multiSportsS: 0,
            olympicP: 0,
            semiOlympicP: 0,
            swimmingPools: 0,
            sportsComplexes: 0,
           },
           {
            code: '',
            state: '',
            specializedR: 0,
            multiPurposeR: 0,
            multiSportsR: 0,
            olympicS: 0,
            municipalS: 0,
            semiOlympicS: 0,
            multiSportsS: 0,
            olympicP: 0,
            semiOlympicP: 0,
            swimmingPools: 0,
            sportsComplexes: 0,
           },
         ];
                   
         SecondData: any[] = [
           {
            code: '',
             state: '',
             specializedR: 0,
             multiPurposeR: 0,
             multiSportsR: 0,
             olympicS: 0,
             municipalS: 0,
             semiOlympicS: 0,
             multiSportsS: 0,
             olympicP: 0,
             semiOlympicP: 0,
             swimmingPools: 0,
             sportsComplexes: 0,
           },
           {
            code: '',
            state: '',
            specializedR: 0,
            multiPurposeR: 0,
            multiSportsR: 0,
            olympicS: 0,
            municipalS: 0,
            semiOlympicS: 0,
            multiSportsS: 0,
            olympicP: 0,
            semiOlympicP: 0,
            swimmingPools: 0,
            sportsComplexes: 0,
           },
         ];
         
         FirstspecializedR = 0;
         FirstmultiPurposeR = 0;
         FirstmultiSportsR = 0;
         FirstolympicS = 0;
         FirstmunicipalS = 0;
         FirstsemiOlympicS = 0;
         FirstmultiSportsS = 0;
         FirstolympicP = 0;
         FirstsemiOlympicP = 0;
         FirstswimmingPools = 0;
         FirstsportsComplexes = 0;
      
      
         SecondspecializedR = 0;
         SecondmultiPurposeR = 0;
         SecondmultiSportsR = 0;
         SecondolympicS = 0;
         SecondmunicipalS = 0;
         SecondsemiOlympicS = 0;
         SecondmultiSportsS = 0;
         SecondolympicP = 0;
         SecondsemiOlympicP = 0;
         SecondswimmingPools = 0;
         SecondsportsComplexes = 0;
      
      
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
          this.FirstspecializedR = this.FirstData.reduce((sum, row) => sum + +row.specializedR, 0);
          this.FirstmultiPurposeR = this.FirstData.reduce((sum, row) => sum + +row.multiPurposeR, 0);
          this.FirstmultiSportsR = this.FirstData.reduce((sum, row) => sum + +row.multiSportsR, 0);
          this.FirstolympicS = this.FirstData.reduce((sum, row) => sum + +row.olympicS, 0);
          this.FirstmunicipalS = this.FirstData.reduce((sum, row) => sum + +row.municipalS, 0);
          this.FirstsemiOlympicS = this.FirstData.reduce((sum, row) => sum + +row.semiOlympicS, 0);
          this.FirstmultiSportsS = this.FirstData.reduce((sum, row) => sum + +row.multiSportsS, 0);
          this.FirstolympicP = this.FirstData.reduce((sum, row) => sum + +row.olympicP, 0);
          this.FirstsemiOlympicP = this.FirstData.reduce((sum, row) => sum + +row.semiOlympicP, 0);
          this.FirstswimmingPools = this.FirstData.reduce((sum, row) => sum + +row.swimmingPools, 0);
          this.FirstsportsComplexes = this.FirstData.reduce((sum, row) => sum + +row.sportsComplexes, 0);
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
          this.SecondspecializedR = this.SecondData.reduce((sum, row) => sum + +row.specializedR, 0);
          this.SecondmultiPurposeR = this.SecondData.reduce((sum, row) => sum + +row.multiPurposeR, 0);
          this.SecondmultiSportsR = this.SecondData.reduce((sum, row) => sum + +row.multiSportsR, 0);
          this.SecondolympicS = this.SecondData.reduce((sum, row) => sum + +row.olympicS, 0);
          this.SecondmunicipalS = this.SecondData.reduce((sum, row) => sum + +row.municipalS, 0);
          this.SecondsemiOlympicS = this.SecondData.reduce((sum, row) => sum + +row.semiOlympicS, 0);
          this.SecondmultiSportsS = this.SecondData.reduce((sum, row) => sum + +row.multiSportsS, 0);
          this.SecondolympicP = this.SecondData.reduce((sum, row) => sum + +row.olympicP, 0);
          this.SecondsemiOlympicP = this.SecondData.reduce((sum, row) => sum + +row.semiOlympicP, 0);
          this.SecondswimmingPools = this.SecondData.reduce((sum, row) => sum + +row.swimmingPools, 0);
          this.SecondsportsComplexes = this.SecondData.reduce((sum, row) => sum + +row.sportsComplexes, 0);
          this.updateCharts();
        }
      
        exportTableToExcel1() {
          const table = document.getElementById('PopulationTable');
          if (table) {
            const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, 'Sports_Facilities.xlsx');
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
            XLSX.writeFile(wb, 'Sports_Facilities_Details.xlsx');
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
            specializedR: row.specializedR,
            multiPurposeR: row.multiPurposeR,
            multiSportsR: row.multiSportsR,
            olympicS: row.olympicS,
            municipalS: row.municipalS,
            semiOlympicS: row.semiOlympicS,
            multiSportsS: row.multiSportsS,
            olympicP: row.olympicP,
            semiOlympicP: row.semiOlympicP,
            swimmingPools: row.swimmingPools,
            sportsComplexes: row.sportsComplexes,
            daira: 'Bouira',
          }));
          
          const secondData = this.SecondData.map((row) => ({
            code: row.code,
            state: row.state,
            specializedR: row.specializedR,
            multiPurposeR: row.multiPurposeR,
            multiSportsR: row.multiSportsR,
            olympicS: row.olympicS,
            municipalS: row.municipalS,
            semiOlympicS: row.semiOlympicS,
            multiSportsS: row.multiSportsS,
            olympicP: row.olympicP,
            semiOlympicP: row.semiOlympicP,
            swimmingPools: row.swimmingPools,
            sportsComplexes: row.sportsComplexes,
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

  // Initialize charts after view is ready
  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
    }, 0);
  }

  private initCharts() {
    this.initStateChart();
    this.initDairaComparisonChart();
  }

  private initStateChart() {
    const ctx = document.getElementById('stateChart') as HTMLCanvasElement;
    this.stateChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Specialized R', 'Multi-Purpose R', 'Multi-Sports R', 'Olympic S', 'Municipal S', 'Semi-Olympic S', 'Multi-Sports S', 'Olympic P', 'Semi-Olympic P', 'Swimming Pools', 'Sports Complexes'],
        datasets: [{
          label: 'State Total',
          data: this.getStateDataTotals(),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('State Sports Facilities Overview')
    });
  }

  private initDairaComparisonChart() {
    const ctx = document.getElementById('dairaComparisonChart') as HTMLCanvasElement;
    this.dairaTotalsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Specialized R', 'Multi-Purpose R', 'Multi-Sports R', 'Olympic S', 'Municipal S', 'Semi-Olympic S', 'Multi-Sports S', 'Olympic P', 'Semi-Olympic P', 'Swimming Pools', 'Sports Complexes'],
        datasets: [
          {
            label: 'Bouira',
            data: [
              this.FirstspecializedR,
              this.FirstmultiPurposeR,
              this.FirstmultiSportsR,
              this.FirstolympicS,
              this.FirstmunicipalS,
              this.FirstsemiOlympicS,
              this.FirstmultiSportsS,
              this.FirstolympicP,
              this.FirstsemiOlympicP,
              this.FirstswimmingPools,
              this.FirstsportsComplexes
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Sour El Ghozlane',
            data: [
              this.SecondspecializedR,
              this.SecondmultiPurposeR,
              this.SecondmultiSportsR,
              this.SecondolympicS,
              this.SecondmunicipalS,
              this.SecondsemiOlympicS,
              this.SecondmultiSportsS,
              this.SecondolympicP,
              this.SecondsemiOlympicP,
              this.SecondswimmingPools,
              this.SecondsportsComplexes
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: this.getChartOptions('Daira Comparison: Sports Facilities')
    });
  }

  private getStateDataTotals(): number[] {
    return [
      this.tableData.reduce((sum, row) => sum + row.specializedR, 0),
      this.tableData.reduce((sum, row) => sum + row.multiPurposeR, 0),
      this.tableData.reduce((sum, row) => sum + row.multiSportsR, 0),
      this.tableData.reduce((sum, row) => sum + row.olympicS, 0),
      this.tableData.reduce((sum, row) => sum + row.municipalS, 0),
      this.tableData.reduce((sum, row) => sum + row.semiOlympicS, 0),
      this.tableData.reduce((sum, row) => sum + row.multiSportsS, 0),
      this.tableData.reduce((sum, row) => sum + row.olympicP, 0),
      this.tableData.reduce((sum, row) => sum + row.semiOlympicP, 0),
      this.tableData.reduce((sum, row) => sum + row.swimmingPools, 0),
      this.tableData.reduce((sum, row) => sum + row.sportsComplexes, 0)
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
            text: 'Number of Facilities'
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

    if (this.dairaTotalsChart) {
      this.dairaTotalsChart.data.datasets[0].data = [
        this.FirstspecializedR,
        this.FirstmultiPurposeR,
        this.FirstmultiSportsR,
        this.FirstolympicS,
        this.FirstmunicipalS,
        this.FirstsemiOlympicS,
        this.FirstmultiSportsS,
        this.FirstolympicP,
        this.FirstsemiOlympicP,
        this.FirstswimmingPools,
        this.FirstsportsComplexes
      ];
      this.dairaTotalsChart.data.datasets[1].data = [
        this.SecondspecializedR,
        this.SecondmultiPurposeR,
        this.SecondmultiSportsR,
        this.SecondolympicS,
        this.SecondmunicipalS,
        this.SecondsemiOlympicS,
        this.SecondmultiSportsS,
        this.SecondolympicP,
        this.SecondsemiOlympicP,
        this.SecondswimmingPools,
        this.SecondsportsComplexes
      ];
      this.dairaTotalsChart.update();
    }
  }
}