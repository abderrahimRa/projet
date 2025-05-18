import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './posts-telecom.component.html',
  styleUrls: ['./posts-telecom.component.css'],
  standalone: false,
})

export class PostTeleComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private postalChart: any;
  private telecomChart: any;

  constructor(private http: HttpClient, private router: Router) {}
              
             tableData: any[] = [
               {
                 code: '',
                 state: '',
                 numPostOffices: 0,
                 postOfficeAgencies: 0,
                 postalDensity: 0,
                 telephoneExchangeCapacity: 0,
                 numSubscribers: 0,
                 telephoneDensity: 0,
                 fiberConnectionRate: 0,
               },

             ];
             
              // Data model for Daira: Bouira
              FirstData: any[] = [
               {
                code: '',
                state: '',
                numPostOffices: 0,
                 postOfficeAgencies: 0,
                 postalDensity: 0,
                 telephoneExchangeCapacity: 0,
                 numSubscribers: 0,
                 telephoneDensity: 0,
                 fiberConnectionRate: 0,
               },
               {
                code: '',
                state: '',
                numPostOffices: 0,
                 postOfficeAgencies: 0,
                 postalDensity: 0,
                 telephoneExchangeCapacity: 0,
                 numSubscribers: 0,
                 telephoneDensity: 0,
                 fiberConnectionRate: 0,
               },
             ];
           
             // Data model for Daira: Sour el ghozlane
             SecondData: any[] = [
               {
                code: '',
                 state: '',
                 numPostOffices: 0,
                 postOfficeAgencies: 0,
                 postalDensity: 0,
                 telephoneExchangeCapacity: 0,
                 numSubscribers: 0,
                 telephoneDensity: 0,
                 fiberConnectionRate: 0,
               },
               {
                code: '',
                state: '',
                numPostOffices: 0,
                 postOfficeAgencies: 0,
                 postalDensity: 0,
                 telephoneExchangeCapacity: 0,
                 numSubscribers: 0,
                 telephoneDensity: 0,
                 fiberConnectionRate: 0,
               },
             ];
             
             // Totals for Daira: Bouira
             FirstNumPostOffices = 0;
             FirstPostOfficeAgencies = 0;
             FirstPostalDensity = 0;
             FirstTelephoneExchangeCapacity = 0;
             FirstNumSubscribers = 0;
             FirstTelephoneDensity = 0;
             FirstFiberConnectionRate = 0;
           
             // Totals for Daira: Sour el ghozlane
             SecondNumPostOffices = 0;
             SecondPostOfficeAgencies = 0;
             SecondPostalDensity = 0;
             SecondTelephoneExchangeCapacity = 0;
             SecondNumSubscribers = 0;
             SecondTelephoneDensity = 0;
             SecondFiberConnectionRate = 0;
     
             // Initialize charts after view is ready
             ngAfterViewInit() {
               setTimeout(() => {
                 this.initCharts();
               }, 0);
             }

             private initCharts() {
               this.initStateChart();
               this.initPostalChart();
               this.initTelecomChart();
             }

             private initStateChart() {
               const ctx = document.getElementById('stateChart') as HTMLCanvasElement;
               this.stateChart = new Chart(ctx, {
                 type: 'bar',
                 data: {
                   labels: ['Post Offices', 'Post Office Agencies', 'Postal Density', 'Telephone Exchange Capacity', 'Subscribers', 'Telephone Density', 'Fiber Connection Rate'],
                   datasets: [{
                     label: 'State Total',
                     data: this.getStateDataTotals(),
                     backgroundColor: 'rgba(54, 162, 235, 0.5)',
                     borderColor: 'rgba(54, 162, 235, 1)',
                     borderWidth: 1
                   }]
                 },
                 options: this.getChartOptions('Posts & Telecom Overview')
               });
             }

             private initPostalChart() {
               const ctx = document.getElementById('postalChart') as HTMLCanvasElement;
               this.postalChart = new Chart(ctx, {
                 type: 'pie',
                 data: {
                   labels: ['Post Offices', 'Post Office Agencies'],
                   datasets: [{
                     data: [
                       this.tableData.reduce((sum, row) => sum + row.numPostOffices, 0),
                       this.tableData.reduce((sum, row) => sum + row.postOfficeAgencies, 0)
                     ],
                     backgroundColor: [
                       'rgba(255, 99, 132, 0.5)',
                       'rgba(54, 162, 235, 0.5)'
                     ],
                     borderColor: [
                       'rgba(255, 99, 132, 1)',
                       'rgba(54, 162, 235, 1)'
                     ],
                     borderWidth: 1
                   }]
                 },
                 options: this.getChartOptions('Postal Services Distribution')
               });
             }

             private initTelecomChart() {
               const ctx = document.getElementById('telecomChart') as HTMLCanvasElement;
               this.telecomChart = new Chart(ctx, {
                 type: 'bar',
                 data: {
                   labels: ['Exchange Capacity', 'Subscribers', 'Telephone Density', 'Fiber Connection Rate'],
                   datasets: [{
                     label: 'Telecom Metrics',
                     data: [
                       this.tableData.reduce((sum, row) => sum + row.telephoneExchangeCapacity, 0),
                       this.tableData.reduce((sum, row) => sum + row.numSubscribers, 0),
                       this.tableData.reduce((sum, row) => sum + row.telephoneDensity, 0),
                       this.tableData.reduce((sum, row) => sum + row.fiberConnectionRate, 0)
                     ],
                     backgroundColor: 'rgba(75, 192, 192, 0.5)',
                     borderColor: 'rgba(75, 192, 192, 1)',
                     borderWidth: 1
                   }]
                 },
                 options: this.getChartOptions('Telecom Services Overview')
               });
             }

             private getStateDataTotals(): number[] {
               return [
                 this.tableData.reduce((sum, row) => sum + row.numPostOffices, 0),
                 this.tableData.reduce((sum, row) => sum + row.postOfficeAgencies, 0),
                 this.tableData.reduce((sum, row) => sum + row.postalDensity, 0),
                 this.tableData.reduce((sum, row) => sum + row.telephoneExchangeCapacity, 0),
                 this.tableData.reduce((sum, row) => sum + row.numSubscribers, 0),
                 this.tableData.reduce((sum, row) => sum + row.telephoneDensity, 0),
                 this.tableData.reduce((sum, row) => sum + row.fiberConnectionRate, 0)
               ];
             }

             private getChartOptions(title: string): any {
               return {
                 responsive: true,
                 scales: {
                   y: {
                     beginAtZero: true
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

               if (this.postalChart) {
                 this.postalChart.data.datasets[0].data = [
                   this.tableData.reduce((sum, row) => sum + row.numPostOffices, 0),
                   this.tableData.reduce((sum, row) => sum + row.postOfficeAgencies, 0)
                 ];
                 this.postalChart.update();
               }

               if (this.telecomChart) {
                 this.telecomChart.data.datasets[0].data = [
                   this.tableData.reduce((sum, row) => sum + row.telephoneExchangeCapacity, 0),
                   this.tableData.reduce((sum, row) => sum + row.numSubscribers, 0),
                   this.tableData.reduce((sum, row) => sum + row.telephoneDensity, 0),
                   this.tableData.reduce((sum, row) => sum + row.fiberConnectionRate, 0)
                 ];
                 this.telecomChart.update();
               }
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
              
              this.updateCharts();

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
          
            // Calculate totals for Daira: Bouira
            calculateFirstTotals() {
              this.FirstNumPostOffices = this.FirstData.reduce((sum, row) => sum + +row.numPostOffices, 0);
              this.FirstPostOfficeAgencies = this.FirstData.reduce((sum, row) => sum + +row.postOfficeAgencies, 0);
              this.FirstPostalDensity = this.FirstData.reduce((sum, row) => sum + +row.postalDensity, 0);
              this.FirstTelephoneExchangeCapacity = this.FirstData.reduce((sum, row) => sum + +row.telephoneExchangeCapacity, 0);
              this.FirstNumSubscribers = this.FirstData.reduce((sum, row) => sum + +row.numSubscribers, 0);   
              this.FirstTelephoneDensity = this.FirstData.reduce((sum, row) => sum + +row.telephoneDensity, 0); 
              this.FirstFiberConnectionRate = this.FirstData.reduce((sum, row) => sum + +row.fiberConnectionRate, 0);  
    
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
          
            // Calculate totals for Daira: Bouira
            calculateSecondTotals() {
              this.SecondNumPostOffices = this.SecondData.reduce((sum, row) => sum + +row.numPostOffices, 0);
              this.SecondPostOfficeAgencies = this.SecondData.reduce((sum, row) => sum + +row.postOfficeAgencies, 0);
              this.SecondPostalDensity = this.SecondData.reduce((sum, row) => sum + +row.postalDensity, 0);
              this.SecondTelephoneExchangeCapacity = this.SecondData.reduce((sum, row) => sum + +row.telephoneExchangeCapacity, 0);
              this.SecondNumSubscribers = this.SecondData.reduce((sum, row) => sum + +row.numSubscribers, 0);   
              this.SecondTelephoneDensity = this.SecondData.reduce((sum, row) => sum + +row.telephoneDensity, 0); 
              this.SecondFiberConnectionRate = this.SecondData.reduce((sum, row) => sum + +row.fiberConnectionRate, 0);                    
        }
        exportTableToExcel1() {
              const table = document.getElementById('PopulationTable'); // Get the table by ID
              if (table) {
                const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
                const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
                XLSX.writeFile(wb, 'post&telecom.xlsx'); // Export the workbook as an Excel file
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
                XLSX.writeFile(wb, 'post&telecom.xlsx'); // Export the workbook as an Excel file
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
    const url = 'https://your-backend-api.com/save-data'; // Replace with your backend API endpoint

    // Send the table data to the backend
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
      town: row.town,
      numPostOffices: row.numPostOffices,
      postOfficeAgencies: row.postOfficeAgencies,
      postalDensity: row.postalDensity,
      telephoneExchangeCapacity: row.telephoneExchangeCapacity,
      numSubscribers: row.numSubscribers,
      telephoneDensity: row.telephoneDensity,
      fiberConnectionRate: row.fiberConnectionRate,
      daira: 'Bouira', // Add a 'daira' field to identify the source
    }));
    
    const secondData = this.SecondData.map((row) => ({
      code: row.code,
      town: row.town,
      numPostOffices: row.numPostOffices,
      postOfficeAgencies: row.postOfficeAgencies,
      postalDensity: row.postalDensity,
      telephoneExchangeCapacity: row.telephoneExchangeCapacity,
      numSubscribers: row.numSubscribers,
      telephoneDensity: row.telephoneDensity,
      fiberConnectionRate: row.fiberConnectionRate,
      daira: 'Sour el ghozlane', // Add a 'daira' field to identify the source
    }));
    return [...firstData, ...secondData];
}
saveAllData() {
  const combinedData = this.combineData(); // Combine data from both tables
  const url = 'https://your-backend-api.com/save-data'; // Replace with your backend API endpoint

  // Send the combined data to the backend
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