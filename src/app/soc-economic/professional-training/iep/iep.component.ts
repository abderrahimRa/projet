import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './iep.component.html',
  styleUrls: ['./iep.component.css'],
  standalone: false,
})

export class IEPComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private dairaComparisonChart: any;
  private utilizationChart: any;

  constructor(private http: HttpClient, private router: Router) {}
                        
         tableData: any[] = [
           {
             code: '',
             state: '',
             numIEPs: 0,
             numTeachingPlaces: 0,
             numTrainees: 0,
             capacityUtilRate: 0,
           },
           
         ];
      
           FirstData: any[] = [
           {
            code: '',
            state: '',
            numIEPs: 0,
            numTeachingPlaces: 0,
            numTrainees: 0,
            capacityUtilRate: 0,
           },
           {
            code: '',
            state: '',
            numIEPs: 0,
            numTeachingPlaces: 0,
            numTrainees: 0,
            capacityUtilRate: 0,
           },
         ];
                   
         SecondData: any[] = [
           {
            code: '',
             state: '',
             numIEPs: 0,
             numTeachingPlaces: 0,
             numTrainees: 0,
             capacityUtilRate: 0,
           },
           {
            code: '',
            state: '',
            numIEPs: 0,
            numTeachingPlaces: 0,
            numTrainees: 0,
            capacityUtilRate: 0,
           },
         ];
         
         FirstnumIEPs = 0;
         FirstnumTeachingPlaces = 0;
         FirstnumTrainees = 0;
         FirstcapacityUtilRate = 0;
      
      
         SecondnumIEPs = 0;
         SecondnumTeachingPlaces = 0;
         SecondnumTrainees = 0;
         SecondcapacityUtilRate = 0;
      
      
         calculateCapacityUtilization(row: any) {
           return {
             capacityUtilRate: row.numTeachingPlaces ? 
               (row.numTrainees / row.numTeachingPlaces) * 100 : 0
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
           this.FirstnumIEPs = this.FirstData.reduce((sum, row) => sum + +row.numIEPs, 0);
           this.FirstnumTeachingPlaces = this.FirstData.reduce((sum, row) => sum + +row.numTeachingPlaces, 0);
           this.FirstnumTrainees = this.FirstData.reduce((sum, row) => sum + +row.numTrainees, 0);
           this.FirstcapacityUtilRate = this.FirstnumTeachingPlaces ? 
             (this.FirstnumTrainees / this.FirstnumTeachingPlaces) * 100 : 0;
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
           this.SecondnumIEPs = this.SecondData.reduce((sum, row) => sum + +row.numIEPs, 0);
           this.SecondnumTeachingPlaces = this.SecondData.reduce((sum, row) => sum + +row.numTeachingPlaces, 0);
           this.SecondnumTrainees = this.SecondData.reduce((sum, row) => sum + +row.numTrainees, 0);
           this.SecondcapacityUtilRate = this.SecondnumTeachingPlaces ? 
             (this.SecondnumTrainees / this.SecondnumTeachingPlaces) * 100 : 0;
           this.updateCharts();
         }
       
         exportTableToExcel1() {
           const table = document.getElementById('PopulationTable');
           if (table) {
             const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
             const wb: XLSX.WorkBook = XLSX.utils.book_new();
             XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
             XLSX.writeFile(wb, 'INSFP.xlsx');
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
             XLSX.writeFile(wb, 'INSFP_Details.xlsx');
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
             numINSFPs: row.numINSFPs,
             numTeachingPlaces: row.numTeachingPlaces,
             numTrainees: row.numTrainees,
             capacityUtilRate: row.capacityUtilRate,
             daira: 'Bouira',
           }));
           
           const secondData = this.SecondData.map((row) => ({
             code: row.code,
             state: row.state,
             numINSFPs: row.numINSFPs,
             numTeachingPlaces: row.numTeachingPlaces,
             numTrainees: row.numTrainees,
             capacityUtilRate: row.capacityUtilRate,
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
        labels: ['IEPs', 'Teaching Places', 'Trainees'],
        datasets: [{
          label: 'State Total',
          data: this.getStateDataTotals(),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('IEP Facilities Overview')
    });
  }

  private initDairaComparisonChart() {
    const ctx = document.getElementById('dairaComparisonChart') as HTMLCanvasElement;
    this.dairaComparisonChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['IEPs', 'Teaching Places', 'Trainees'],
        datasets: [
          {
            label: 'Bouira',
            data: [
              this.FirstnumIEPs,
              this.FirstnumTeachingPlaces,
              this.FirstnumTrainees
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Sour El Ghozlane',
            data: [
              this.SecondnumIEPs,
              this.SecondnumTeachingPlaces,
              this.SecondnumTrainees
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: this.getChartOptions('Daira Comparison: IEP Facilities')
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
            this.FirstcapacityUtilRate,
            this.SecondcapacityUtilRate
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('IEP Capacity Utilization')
    });
  }

  private getStateDataTotals(): number[] {
    return [
      this.tableData.reduce((sum, row) => sum + row.numIEPs, 0),
      this.tableData.reduce((sum, row) => sum + row.numTeachingPlaces, 0),
      this.tableData.reduce((sum, row) => sum + row.numTrainees, 0)
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
        this.FirstnumIEPs,
        this.FirstnumTeachingPlaces,
        this.FirstnumTrainees
      ];
      this.dairaComparisonChart.data.datasets[1].data = [
        this.SecondnumIEPs,
        this.SecondnumTeachingPlaces,
        this.SecondnumTrainees
      ];
      this.dairaComparisonChart.update();
    }

    if (this.utilizationChart) {
      this.utilizationChart.data.datasets[0].data = [
        this.FirstcapacityUtilRate,
        this.SecondcapacityUtilRate
      ];
      this.utilizationChart.update();
    }
  }
}