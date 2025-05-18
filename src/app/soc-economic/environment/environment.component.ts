import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './environment.component.html',
  styleUrls: ['./environment.component.css'],
  standalone: false,
})

export class EnvironmentComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private wasteChart: any;
  private landfillChart: any;

  constructor(private http: HttpClient, private router: Router) {}
               
              tableData: any[] = [
                {
                  code: 0,
                  state: '',
                  generatedWaste: 0,
                  numLandfills: 0,
                  numControlledLandfills: 0,
                  numUncontrolledLandfills: 0,
                  wasteRecycle: 0,
                },
              ];
              
               // Data model for Daira: Bouira
               FirstData: any[] = [
                {
                 code: 0,
                 state: '',
                 generatedWaste: 0,
                  numLandfills: 0,
                  numControlledLandfills: 0,
                  numUncontrolledLandfills: 0,
                  wasteRecycle: 0,
                },
                {
                 code: 0,
                 state: '',
                 generatedWaste: 0,
                  numLandfills: 0,
                  numControlledLandfills: 0,
                  numUncontrolledLandfills: 0,
                  wasteRecycle: 0,
                },
              ];
            
              // Data model for Daira: Sour el ghozlane
              SecondData: any[] = [
                {
                 code: 0,
                  state: '',
                  generatedWaste: 0,
                  numLandfills: 0,
                  numControlledLandfills: 0,
                  numUncontrolledLandfills: 0,
                  wasteRecycle: 0,
                },
                {
                 code: 0,
                 state: '',
                 generatedWaste: 0,
                 numLandfills: 0,
                 numControlledLandfills: 0,
                 numUncontrolledLandfills: 0,
                 wasteRecycle: 0,
                },
              ];
              
              // Totals for Daira: Bouira
              FirstgeneratedWaste = 0;
              FirstnumLandfills = 0;
              FirstnumControlledLandfills = 0;
              FirstnumUncontrolledLandfills = 0;
              FirstwasteRecycle = 0;
            
              // Totals for Daira: Sour el ghozlane
              SecondgeneratedWaste = 0;
              SecondnumLandfills = 0;
              SecondnumControlledLandfills = 0;
              SecondnumUncontrolledLandfills = 0;
              SecondwasteRecycle = 0;
      
              ngAfterViewInit() {
                setTimeout(() => {
                  this.initCharts();
                }, 0);
              }

              private initCharts() {
                this.initStateChart();
                this.initWasteChart();
                this.initLandfillChart();
              }

              private initStateChart() {
                const ctx = document.getElementById('stateChart') as HTMLCanvasElement;
                this.stateChart = new Chart(ctx, {
                  type: 'bar',
                  data: {
                    labels: ['Generated Waste', 'Landfills', 'Controlled Landfills', 'Uncontrolled Landfills', 'Waste Recycle'],
                    datasets: [{
                      label: 'State Total',
                      data: this.getStateDataTotals(),
                      backgroundColor: 'rgba(54, 162, 235, 0.5)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 1
                    }]
                  },
                  options: this.getChartOptions('Environment Overview')
                });
              }

              private initWasteChart() {
                const ctx = document.getElementById('wasteChart') as HTMLCanvasElement;
                this.wasteChart = new Chart(ctx, {
                  type: 'bar',
                  data: {
                    labels: ['Generated Waste', 'Waste Recycle'],
                    datasets: [{
                      label: 'Waste Management',
                      data: [
                        this.tableData.reduce((sum, row) => sum + row.generatedWaste, 0),
                        this.tableData.reduce((sum, row) => sum + row.wasteRecycle, 0)
                      ],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(75, 192, 192, 0.5)'
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(75, 192, 192, 1)'
                      ],
                      borderWidth: 1
                    }]
                  },
                  options: this.getChartOptions('Waste Management')
                });
              }

              private initLandfillChart() {
                const ctx = document.getElementById('landfillChart') as HTMLCanvasElement;
                this.landfillChart = new Chart(ctx, {
                  type: 'pie',
                  data: {
                    labels: ['Controlled Landfills', 'Uncontrolled Landfills'],
                    datasets: [{
                      data: [
                        this.tableData.reduce((sum, row) => sum + row.numControlledLandfills, 0),
                        this.tableData.reduce((sum, row) => sum + row.numUncontrolledLandfills, 0)
                      ],
                      backgroundColor: [
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(255, 99, 132, 0.5)'
                      ],
                      borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)'
                      ],
                      borderWidth: 1
                    }]
                  },
                  options: this.getChartOptions('Landfill Distribution')
                });
              }

              private getStateDataTotals(): number[] {
                return [
                  this.tableData.reduce((sum, row) => sum + row.generatedWaste, 0),
                  this.tableData.reduce((sum, row) => sum + row.numLandfills, 0),
                  this.tableData.reduce((sum, row) => sum + row.numControlledLandfills, 0),
                  this.tableData.reduce((sum, row) => sum + row.numUncontrolledLandfills, 0),
                  this.tableData.reduce((sum, row) => sum + row.wasteRecycle, 0)
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

                if (this.wasteChart) {
                  this.wasteChart.data.datasets[0].data = [
                    this.tableData.reduce((sum, row) => sum + row.generatedWaste, 0),
                    this.tableData.reduce((sum, row) => sum + row.wasteRecycle, 0)
                  ];
                  this.wasteChart.update();
                }

                if (this.landfillChart) {
                  this.landfillChart.data.datasets[0].data = [
                    this.tableData.reduce((sum, row) => sum + row.numControlledLandfills, 0),
                    this.tableData.reduce((sum, row) => sum + row.numUncontrolledLandfills, 0)
                  ];
                  this.landfillChart.update();
                }
              }

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
           
             // Calculate totals for Daira: Bouira
             calculateFirstTotals() {
               this.FirstgeneratedWaste = this.FirstData.reduce((sum, row) => sum + +row.generatedWaste, 0);
               this.FirstnumLandfills = this.FirstData.reduce((sum, row) => sum + +row.numLandfills, 0);
               this.FirstnumControlledLandfills = this.FirstData.reduce((sum, row) => sum + +row.numControlledLandfills, 0);
               this.FirstnumUncontrolledLandfills = this.FirstData.reduce((sum, row) => sum + +row.numUncontrolledLandfills, 0);
               this.FirstwasteRecycle = this.FirstData.reduce((sum, row) => sum + +row.wasteRecycle, 0);    
                           
         }
         
              updateSecondCell(rowIndex: number, field: string, event: Event) {
                const inputElement = event.target as HTMLElement;
                let newValue = inputElement.innerText;
               this.SecondData[rowIndex][field] = +newValue || 0;
               this.calculateSecondTotals();

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
           
             // Calculate totals for Daira: Bouira
             calculateSecondTotals() {
              this.SecondgeneratedWaste = this.SecondData.reduce((sum, row) => sum + +row.generatedWaste, 0);
              this.SecondnumLandfills = this.SecondData.reduce((sum, row) => sum + +row.numLandfills, 0);
              this.SecondnumControlledLandfills = this.SecondData.reduce((sum, row) => sum + +row.numControlledLandfills, 0);
              this.SecondnumUncontrolledLandfills = this.SecondData.reduce((sum, row) => sum + +row.numUncontrolledLandfills, 0);
              this.SecondwasteRecycle = this.SecondData.reduce((sum, row) => sum + +row.wasteRecycle, 0);                     
         }
         exportTableToExcel1() {
               const table = document.getElementById('PopulationTable'); // Get the table by ID
               if (table) {
                 const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
                 const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
                 XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
                 XLSX.writeFile(wb, 'Environment.xlsx'); // Export the workbook as an Excel file
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
                 XLSX.writeFile(wb, 'Environment.xlsx'); // Export the workbook as an Excel file
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
      generatedWaste: row.generatedWaste,
      numLandfills: row.numLandfills,
      numControlledLandfills: row.numControlledLandfills,
      numUncontrolledLandfills: row.numUncontrolledLandfills,
      wasteRecycle: row.wasteRecycle,
      daira: 'Bouira', // Add a 'daira' field to identify the source
    }));
    
    const secondData = this.SecondData.map((row) => ({
      code: row.code,
      town: row.town,
      generatedWaste: row.generatedWaste,
      numLandfills: row.numLandfills,
      numControlledLandfills: row.numControlledLandfills,
      numUncontrolledLandfills: row.numUncontrolledLandfills,
      wasteRecycle: row.wasteRecycle,
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