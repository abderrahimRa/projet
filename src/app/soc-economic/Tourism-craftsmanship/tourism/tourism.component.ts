import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './Tourism.component.html',
  styleUrls: ['./Tourism.component.css'],
  standalone: false,
})

export class TourismComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private accommodationChart: any;
  private tourismServicesChart: any;

  constructor(private http: HttpClient, private router: Router) {}
               
              tableData: any[] = [
                {
                  code: '',
                  state: '',
                  numHotels: 0,
                  numRooms: 0,
                  numBeds: 0,
                  numSpas: 0,
                  numTourismDevZones: 0,
                  numTravelAgencies: 0,
                },
                
              ];

               FirstData: any[] = [
                {
                 code: '',
                 state: '',
                  numHotels: 0,
                  numRooms: 0,
                  numBeds: 0,
                  numSpas: 0,
                  numTourismDevZones: 0,
                  numTravelAgencies: 0,
                },
                {
                 code: '',
                 state: '',
                 numHotels: 0,
                  numRooms: 0,
                  numBeds: 0,
                  numSpas: 0,
                  numTourismDevZones: 0,
                  numTravelAgencies: 0,
                },
              ];
            
              SecondData: any[] = [
                {
                 code: '',
                  state: '',
                  numHotels: 0,
                  numRooms: 0,
                  numBeds: 0,
                  numSpas: 0,
                  numTourismDevZones: 0,
                  numTravelAgencies: 0,
                },
                {
                 code: '',
                 state: '',
                 numHotels: 0,
                  numRooms: 0,
                  numBeds: 0,
                  numSpas: 0,
                  numTourismDevZones: 0,
                  numTravelAgencies: 0,
                },
              ];
              
              FirstNumHotels= 0;
              FirstNumRooms= 0;
              FirstNumBeds= 0;
              FirstNumSpas= 0;
              FirstNumTourismDevZones= 0;
              FirstNumTravelAgencies= 0;
            
              SecondNumHotels= 0;
              SecondNumRooms= 0;
              SecondNumBeds= 0;
              SecondNumSpas= 0;
              SecondNumTourismDevZones= 0;
              SecondNumTravelAgencies= 0;
      
              // Initialize charts after view is ready
              ngAfterViewInit() {
                setTimeout(() => {
                  this.initCharts();
                }, 0);
              }

              private initCharts() {
                this.initStateChart();
                this.initAccommodationChart();
                this.initTourismServicesChart();
              }

              private initStateChart() {
                const ctx = document.getElementById('stateChart') as HTMLCanvasElement;
                this.stateChart = new Chart(ctx, {
                  type: 'bar',
                  data: {
                    labels: ['Hotels', 'Rooms', 'Beds', 'Spas', 'Tourism Dev Zones', 'Travel Agencies'],
                    datasets: [{
                      label: 'State Total',
                      data: this.getStateDataTotals(),
                      backgroundColor: 'rgba(54, 162, 235, 0.5)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 1
                    }]
                  },
                  options: this.getChartOptions('Tourism Overview')
                });
              }

              private initAccommodationChart() {
                const ctx = document.getElementById('accommodationChart') as HTMLCanvasElement;
                this.accommodationChart = new Chart(ctx, {
                  type: 'pie',
                  data: {
                    labels: ['Hotels', 'Rooms', 'Beds'],
                    datasets: [{
                      data: [
                        this.tableData.reduce((sum, row) => sum + row.numHotels, 0),
                        this.tableData.reduce((sum, row) => sum + row.numRooms, 0),
                        this.tableData.reduce((sum, row) => sum + row.numBeds, 0)
                      ],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)'
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                      ],
                      borderWidth: 1
                    }]
                  },
                  options: this.getChartOptions('Accommodation Distribution')
                });
              }

              private initTourismServicesChart() {
                const ctx = document.getElementById('tourismServicesChart') as HTMLCanvasElement;
                this.tourismServicesChart = new Chart(ctx, {
                  type: 'bar',
                  data: {
                    labels: ['Spas', 'Tourism Dev Zones', 'Travel Agencies'],
                    datasets: [{
                      label: 'Tourism Services',
                      data: [
                        this.tableData.reduce((sum, row) => sum + row.numSpas, 0),
                        this.tableData.reduce((sum, row) => sum + row.numTourismDevZones, 0),
                        this.tableData.reduce((sum, row) => sum + row.numTravelAgencies, 0)
                      ],
                      backgroundColor: 'rgba(75, 192, 192, 0.5)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1
                    }]
                  },
                  options: this.getChartOptions('Tourism Services Overview')
                });
              }

              private getStateDataTotals(): number[] {
                return [
                  this.tableData.reduce((sum, row) => sum + row.numHotels, 0),
                  this.tableData.reduce((sum, row) => sum + row.numRooms, 0),
                  this.tableData.reduce((sum, row) => sum + row.numBeds, 0),
                  this.tableData.reduce((sum, row) => sum + row.numSpas, 0),
                  this.tableData.reduce((sum, row) => sum + row.numTourismDevZones, 0),
                  this.tableData.reduce((sum, row) => sum + row.numTravelAgencies, 0)
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

                if (this.accommodationChart) {
                  this.accommodationChart.data.datasets[0].data = [
                    this.tableData.reduce((sum, row) => sum + row.numHotels, 0),
                    this.tableData.reduce((sum, row) => sum + row.numRooms, 0),
                    this.tableData.reduce((sum, row) => sum + row.numBeds, 0)
                  ];
                  this.accommodationChart.update();
                }

                if (this.tourismServicesChart) {
                  this.tourismServicesChart.data.datasets[0].data = [
                    this.tableData.reduce((sum, row) => sum + row.numSpas, 0),
                    this.tableData.reduce((sum, row) => sum + row.numTourismDevZones, 0),
                    this.tableData.reduce((sum, row) => sum + row.numTravelAgencies, 0)
                  ];
                  this.tourismServicesChart.update();
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
               this.FirstNumHotels = this.FirstData.reduce((sum, row) => sum + +row.numHotels, 0);
               this.FirstNumRooms = this.FirstData.reduce((sum, row) => sum + +row.numRooms, 0);
               this.FirstNumBeds = this.FirstData.reduce((sum, row) => sum + +row.numBeds, 0);
               this.FirstNumSpas = this.FirstData.reduce((sum, row) => sum + +row.numSpas, 0);
               this.FirstNumTourismDevZones = this.FirstData.reduce((sum, row) => sum + +row.numTourismDevZones, 0); 
               this.FirstNumTravelAgencies = this.FirstData.reduce((sum, row) => sum + +row.numTravelAgencies, 0);              
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
               this.SecondNumHotels = this.SecondData.reduce((sum, row) => sum + +row.numHotels, 0);
               this.SecondNumRooms = this.SecondData.reduce((sum, row) => sum + +row.numRooms, 0);
               this.SecondNumBeds = this.SecondData.reduce((sum, row) => sum + +row.numBeds, 0);
               this.SecondNumSpas = this.SecondData.reduce((sum, row) => sum + +row.numSpas, 0);
               this.SecondNumTourismDevZones = this.SecondData.reduce((sum, row) => sum + +row.numTourismDevZones, 0);  
               this.SecondNumTravelAgencies = this.SecondData.reduce((sum, row) => sum + +row.numTravelAgencies, 0);
         }
         exportTableToExcel1() {
               const table = document.getElementById('PopulationTable'); // Get the table by ID
               if (table) {
                 const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
                 const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
                 XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
                 XLSX.writeFile(wb, 'Tourism.xlsx'); // Export the workbook as an Excel file
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
                 XLSX.writeFile(wb, 'Tourism.xlsx'); // Export the workbook as an Excel file
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
      numHotels: row.numHotels,
      numRooms: row.numRooms,
      numBeds: row.numBeds,
      numSpas: row.numSpas,
      numTourismDevZones: row.numTourismDevZones,
      numTravelAgencies: row.numTravelAgencies,
      daira: 'Bouira', // Add a 'daira' field to identify the source
    }));
    
    const secondData = this.SecondData.map((row) => ({
      code: row.code,
      town: row.town,
      numHotels: row.numHotels,
      numRooms: row.numRooms,
      numBeds: row.numBeds,
      numSpas: row.numSpas,
      numTourismDevZones: row.numTourismDevZones,
      numTravelAgencies: row.numTravelAgencies,
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