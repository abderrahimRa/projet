import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './youth.component.html',
  styleUrls: ['./youth.component.css'],
  standalone: false,
})

export class YouthComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private dairaTotalsChart: any;

  constructor(private http: HttpClient, private router: Router) {}
                           
            tableData: any[] = [
              {
                code: '',
                state: '',
                youthCamps: 0,
                youthCenters: 0,
                youthHomes: 0,
                numYHotels: 0,
                capacity: 0,
                num: 0,
                educationalPlaces: 0,
                numSportsAssociations: 0,
                numActiveAssociations: 0,
                numAffiliates: 0,
              },
              
            ];
         
              FirstData: any[] = [
              {
               code: '',
               state: '',
               youthCamps: 0,
               youthCenters: 0,
               youthHomes: 0,
               numYHotels: 0,
               capacity: 0,
               num: 0,
               educationalPlaces: 0,
               numSportsAssociations: 0,
               numActiveAssociations: 0,
               numAffiliates: 0,
              },
              {
               code: '',
               state: '',
               youthCamps: 0,
               youthCenters: 0,
               youthHomes: 0,
               numYHotels: 0,
               capacity: 0,
               num: 0,
               educationalPlaces: 0,
               numSportsAssociations: 0,
               numActiveAssociations: 0,
               numAffiliates: 0,
              },
            ];
                      
            SecondData: any[] = [
              {
               code: '',
                state: '',
                youthCamps: 0,
                youthCenters: 0,
                youthHomes: 0,
                numYHotels: 0,
                capacity: 0,
                num: 0,
                educationalPlaces: 0,
                numSportsAssociations: 0,
                numActiveAssociations: 0,
                numAffiliates: 0,
              },
              {
               code: '',
               state: '',
               youthCamps: 0,
               youthCenters: 0,
               youthHomes: 0,
               numYHotels: 0,
               capacity: 0,
               num: 0,
               educationalPlaces: 0,
               numSportsAssociations: 0,
               numActiveAssociations: 0,
               numAffiliates: 0,
              },
            ];
            
            FirstYouthCamps = 0;
            FirstYouthCenters = 0;
            FirstYouthHomes = 0;
            FirstNumYHotels = 0;
            FirstCapacity = 0;
            FirstNum = 0;
            FirstEducationalPlaces = 0;
            FirstNumSportsAssociations = 0;
            FirstNumActiveAssociations = 0;
            FirstNumAffiliates = 0;
         
         
            SecondYouthCamps = 0;
            SecondYouthCenters = 0;
            SecondYouthHomes = 0;
            SecondNumYHotels = 0;
            SecondCapacity = 0;
            SecondNum = 0;
            SecondEducationalPlaces = 0;
            SecondNumSportsAssociations = 0;
            SecondNumActiveAssociations = 0;
            SecondNumAffiliates = 0;
         
         
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
              this.FirstYouthCamps = this.FirstData.reduce((sum, row) => sum + +row.youthCamps, 0);
              this.FirstYouthCenters = this.FirstData.reduce((sum, row) => sum + +row.youthCenters, 0);
              this.FirstYouthHomes = this.FirstData.reduce((sum, row) => sum + +row.youthHomes, 0);
              this.FirstNumYHotels = this.FirstData.reduce((sum, row) => sum + +row.numYHotels, 0);
              this.FirstCapacity = this.FirstData.reduce((sum, row) => sum + +row.capacity, 0);
              this.FirstNum = this.FirstData.reduce((sum, row) => sum + +row.num, 0);
              this.FirstEducationalPlaces = this.FirstData.reduce((sum, row) => sum + +row.educationalPlaces, 0);
              this.FirstNumSportsAssociations = this.FirstData.reduce((sum, row) => sum + +row.numSportsAssociations, 0);
              this.FirstNumActiveAssociations = this.FirstData.reduce((sum, row) => sum + +row.numActiveAssociations, 0);
              this.FirstNumAffiliates = this.FirstData.reduce((sum, row) => sum + +row.numAffiliates, 0);
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
              this.SecondYouthCamps = this.SecondData.reduce((sum, row) => sum + +row.youthCamps, 0);
              this.SecondYouthCenters = this.SecondData.reduce((sum, row) => sum + +row.youthCenters, 0);
              this.SecondYouthHomes = this.SecondData.reduce((sum, row) => sum + +row.youthHomes, 0);
              this.SecondNumYHotels = this.SecondData.reduce((sum, row) => sum + +row.numYHotels, 0);
              this.SecondCapacity = this.SecondData.reduce((sum, row) => sum + +row.capacity, 0);
              this.SecondNum = this.SecondData.reduce((sum, row) => sum + +row.num, 0);
              this.SecondEducationalPlaces = this.SecondData.reduce((sum, row) => sum + +row.educationalPlaces, 0);
              this.SecondNumSportsAssociations = this.SecondData.reduce((sum, row) => sum + +row.numSportsAssociations, 0);
              this.SecondNumActiveAssociations = this.SecondData.reduce((sum, row) => sum + +row.numActiveAssociations, 0);
              this.SecondNumAffiliates = this.SecondData.reduce((sum, row) => sum + +row.numAffiliates, 0);
              this.updateCharts();
            }
          
            exportTableToExcel1() {
              const table = document.getElementById('PopulationTable');
              if (table) {
                const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
                const wb: XLSX.WorkBook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                XLSX.writeFile(wb, 'Youth_Facilities.xlsx');
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
                XLSX.writeFile(wb, 'Youth_Facilities_Details.xlsx');
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
                youthCamps: row.youthCamps,
                youthCenters: row.youthCenters,
                youthHomes: row.youthHomes,
                numYHotels: row.numYHotels,
                capacity: row.capacity,
                num: row.num,
                educationalPlaces: row.educationalPlaces,
                numSportsAssociations: row.numSportsAssociations,
                numActiveAssociations: row.numActiveAssociations,
                numAffiliates: row.numAffiliates,
                daira: 'Bouira',
              }));
              
              const secondData = this.SecondData.map((row) => ({
                code: row.code,
                state: row.state,
                youthCamps: row.youthCamps,
                youthCenters: row.youthCenters,
                youthHomes: row.youthHomes,
                numYHotels: row.numYHotels,
                capacity: row.capacity,
                num: row.num,
                educationalPlaces: row.educationalPlaces,
                numSportsAssociations: row.numSportsAssociations,
                numActiveAssociations: row.numActiveAssociations,
                numAffiliates: row.numAffiliates,
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
    setTimeout(() => this.initCharts(), 100);
  }

  private initCharts() {
    // Destroy existing charts if they exist
    if (this.stateChart) this.stateChart.destroy();
    if (this.dairaTotalsChart) this.dairaTotalsChart.destroy();

    // State Youth Chart
    const stateCtx = document.getElementById('stateChart') as HTMLCanvasElement;
    if (stateCtx) {
      this.stateChart = new Chart(stateCtx.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Youth Camps', 'Youth Centers', 'Youth Homes', 'Youth Hostels', 'Capacity', 'Number', 'Educational Places', 'Sports Associations', 'Active Associations', 'Affiliates'],
          datasets: [{
            label: 'State Total',
            data: this.getStateDataTotals(),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: this.getChartOptions('Youth Facilities Overview')
      });
    }

    // Daira Comparison Chart
    const dairaCtx = document.getElementById('dairaTotalsChart') as HTMLCanvasElement;
    if (dairaCtx) {
      this.dairaTotalsChart = new Chart(dairaCtx.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Youth Camps', 'Youth Centers', 'Youth Homes', 'Youth Hostels', 'Capacity', 'Number', 'Educational Places', 'Sports Associations', 'Active Associations', 'Affiliates'],
          datasets: [
            {
              label: 'Bouira',
              data: [
                this.FirstYouthCamps,
                this.FirstYouthCenters,
                this.FirstYouthHomes,
                this.FirstNumYHotels,
                this.FirstCapacity,
                this.FirstNum,
                this.FirstEducationalPlaces,
                this.FirstNumSportsAssociations,
                this.FirstNumActiveAssociations,
                this.FirstNumAffiliates
              ],
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Sour El Ghozlane',
              data: [
                this.SecondYouthCamps,
                this.SecondYouthCenters,
                this.SecondYouthHomes,
                this.SecondNumYHotels,
                this.SecondCapacity,
                this.SecondNum,
                this.SecondEducationalPlaces,
                this.SecondNumSportsAssociations,
                this.SecondNumActiveAssociations,
                this.SecondNumAffiliates
              ],
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        },
        options: this.getChartOptions('Daira Comparison: Youth Facilities')
      });
    }
  }

  private getStateDataTotals(): number[] {
    return [
      this.tableData.reduce((sum, row) => sum + row.youthCamps, 0),
      this.tableData.reduce((sum, row) => sum + row.youthCenters, 0),
      this.tableData.reduce((sum, row) => sum + row.youthHomes, 0),
      this.tableData.reduce((sum, row) => sum + row.numYHotels, 0),
      this.tableData.reduce((sum, row) => sum + row.capacity, 0),
      this.tableData.reduce((sum, row) => sum + row.num, 0),
      this.tableData.reduce((sum, row) => sum + row.educationalPlaces, 0),
      this.tableData.reduce((sum, row) => sum + row.numSportsAssociations, 0),
      this.tableData.reduce((sum, row) => sum + row.numActiveAssociations, 0),
      this.tableData.reduce((sum, row) => sum + row.numAffiliates, 0)
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
        this.FirstYouthCamps,
        this.FirstYouthCenters,
        this.FirstYouthHomes,
        this.FirstNumYHotels,
        this.FirstCapacity,
        this.FirstNum,
        this.FirstEducationalPlaces,
        this.FirstNumSportsAssociations,
        this.FirstNumActiveAssociations,
        this.FirstNumAffiliates
      ];
      this.dairaTotalsChart.data.datasets[1].data = [
        this.SecondYouthCamps,
        this.SecondYouthCenters,
        this.SecondYouthHomes,
        this.SecondNumYHotels,
        this.SecondCapacity,
        this.SecondNum,
        this.SecondEducationalPlaces,
        this.SecondNumSportsAssociations,
        this.SecondNumActiveAssociations,
        this.SecondNumAffiliates
      ];
      this.dairaTotalsChart.update();
    }
  }
}