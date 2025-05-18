import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare var Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './primary.component.html',
  styleUrls: ['./primary.component.css'],
  standalone: false,
})

export class PrimaryComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private dairaComparisonChart: any;
  private occupancyTrendChart: any;
  constructor(private http: HttpClient, private router: Router) {}
                  
  tableData: any[] = [
    {
      code: '',
      state: '',
      pubNumSchools: 0,
      pubNumClasses: 0,
      pubNumClassesUsed: 0,
      pubNumStudentsEnrolled: 0,
      pubClassOccupancyRate: 0,
      pubNumCanteens: 0,

      priNumSchools: 0,
      priNumClasses: 0,
      priNumClassesUsed: 0,
      priNumStudentsEnrolled: 0,
      priClassOccupancyRate: 0,
      priNumCanteens: 0,
    },
    
  ];

  FirstData: any[] = [
    {
     code: '',
     state: '',
     pubNumSchools: 0,
     pubNumClasses: 0,
     pubNumClassesUsed: 0,
     pubNumStudentsEnrolled: 0,
     pubClassOccupancyRate: 0,
     pubNumCanteens: 0,

     priNumSchools: 0,
     priNumClasses: 0,
     priNumClassesUsed: 0,
     priNumStudentsEnrolled: 0,
     priClassOccupancyRate: 0,
     priNumCanteens: 0,
    },
    {
     code: '',
     state: '',
     pubNumSchools: 0,
      pubNumClasses: 0,
      pubNumClassesUsed: 0,
      pubNumStudentsEnrolled: 0,
      pubClassOccupancyRate: 0,
      pubNumCanteens: 0,

      priNumSchools: 0,
      priNumClasses: 0,
      priNumClassesUsed: 0,
      priNumStudentsEnrolled: 0,
      priClassOccupancyRate: 0,
      priNumCanteens: 0,
    },
  ];
          
  SecondData: any[] = [
    {
     code: '',
      state: '',
      pubNumSchools: 0,
      pubNumClasses: 0,
      pubNumClassesUsed: 0,
      pubNumStudentsEnrolled: 0,
      pubClassOccupancyRate: 0,
      pubNumCanteens: 0,

      priNumSchools: 0,
      priNumClasses: 0,
      priNumClassesUsed: 0,
      priNumStudentsEnrolled: 0,
      priClassOccupancyRate: 0,
      priNumCanteens: 0,
    },
    {
     code: '',
     state: '',
     pubNumSchools: 0,
      pubNumClasses: 0,
      pubNumClassesUsed: 0,
      pubNumStudentsEnrolled: 0,
      pubClassOccupancyRate: 0,
      pubNumCanteens: 0,

      priNumSchools: 0,
      priNumClasses: 0,
      priNumClassesUsed: 0,
      priNumStudentsEnrolled: 0,
      priClassOccupancyRate: 0,
      priNumCanteens: 0,
    },
  ];
  
  FirstPubNumSchools = 0;
  FirstPubNumClasses = 0;
  FirstPubNumClassesUsed = 0;
  FirstPubNumStudentsEnrolled = 0;
  FirstPubClassOccupancyRate = 0;
  FirstPubNumCanteens = 0;

  FirstPriNumSchools = 0;
  FirstPriNumClasses = 0;
  FirstPriNumClassesUsed = 0;
  FirstPriNumStudentsEnrolled = 0;
  FirstPriClassOccupancyRate = 0;
  FirstPriNumCanteens = 0


  SecondPubNumSchools = 0;
  SecondPubNumClasses = 0;
  SecondPubNumClassesUsed = 0;
  SecondPubNumStudentsEnrolled = 0;
  SecondPubClassOccupancyRate = 0;
  SecondPubNumCanteens = 0;

  SecondPriNumSchools = 0;
  SecondPriNumClasses = 0;
  SecondPriNumClassesUsed = 0;
  SecondPriNumStudentsEnrolled = 0;
  SecondPriClassOccupancyRate = 0;
  SecondPriNumCanteens = 0;

        calculatePercentages(row: any) {
         return {
           pubClassOccupancyRate: row.pubNumClasses ? (row.pubNumStudentsEnrolled / row.pubNumClasses) * 100 : 0,
           priClassOccupancyRate: row.priNumClasses ? (row.priNumStudentsEnrolled / row.priNumClasses) * 100 : 0,    };
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
          
          Object.assign(this.tableData[rowIndex], this.calculatePercentages(this.tableData[rowIndex]));

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
          this.updateCharts();
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
        
        Object.assign(this.FirstData[rowIndex], this.calculatePercentages(this.FirstData[rowIndex]));

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
         this.FirstPubNumSchools = this.FirstData.reduce((sum, row) => sum + +row.pubNumSchools, 0);
         this.FirstPubNumClasses = this.FirstData.reduce((sum, row) => sum + +row.pubNumClasses, 0);
         this.FirstPubNumClassesUsed = this.FirstData.reduce((sum, row) => sum + +row.pubNumClassesUsed, 0);
         this.FirstPubNumStudentsEnrolled = this.FirstData.reduce((sum, row) => sum + +row.pubNumStudentsEnrolled, 0);
         this.FirstPubClassOccupancyRate = this.FirstPubNumClasses ? (this.FirstPubNumStudentsEnrolled / this.FirstPubNumClasses) * 100 : 0;
         this.FirstPubNumCanteens = this.FirstData.reduce((sum, row) => sum + +row.pubNumCanteens, 0);
         this.FirstPriNumSchools = this.FirstData.reduce((sum, row) => sum + +row.priNumSchools, 0);
         this.FirstPriNumClasses = this.FirstData.reduce((sum, row) => sum + +row.priNumClasses, 0);
         this.FirstPriNumClassesUsed = this.FirstData.reduce((sum, row) => sum + +row.priNumClassesUsed, 0);
         this.FirstPriNumStudentsEnrolled = this.FirstData.reduce((sum, row) => sum + +row.priNumStudentsEnrolled, 0);
         this.FirstPriClassOccupancyRate = this.FirstPriNumClasses ? (this.FirstPriNumStudentsEnrolled / this.FirstPriNumClasses) * 100 : 0;
         this.FirstPriNumCanteens = this.FirstData.reduce((sum, row) => sum + +row.priNumCanteens, 0);              
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
    
    Object.assign(this.SecondData[rowIndex], this.calculatePercentages(this.SecondData[rowIndex]));

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
           this.SecondPubNumSchools = this.SecondData.reduce((sum, row) => sum + +row.priNumSchools, 0);
           this.SecondPubNumClasses = this.SecondData.reduce((sum, row) => sum + +row.pubNumClasses, 0);
           this.SecondPubNumClassesUsed = this.SecondData.reduce((sum, row) => sum + +row.pubNumClassesUsed, 0);
           this.SecondPubNumStudentsEnrolled = this.SecondData.reduce((sum, row) => sum + +row.pubNumStudentsEnrolled, 0);
           this.SecondPubClassOccupancyRate = this.SecondPubNumClasses ? (this.SecondPubNumStudentsEnrolled / this.SecondPubNumClasses) * 100 : 0;
           this.SecondPubNumCanteens = this.SecondData.reduce((sum, row) => sum + +row.pubNumCanteens, 0);
           this.SecondPriNumSchools = this.SecondData.reduce((sum, row) => sum + +row.priNumSchools, 0);
           this.SecondPriNumClasses = this.SecondData.reduce((sum, row) => sum + +row.priNumClasses, 0);
           this.SecondPriNumClassesUsed = this.SecondData.reduce((sum, row) => sum + +row.priNumClassesUsed, 0);
           this.SecondPriNumStudentsEnrolled = this.SecondData.reduce((sum, row) => sum + +row.priNumStudentsEnrolled, 0);
           this.SecondPriClassOccupancyRate = this.SecondPriNumClasses ? (this.SecondPriNumStudentsEnrolled / this.SecondPriNumClasses) * 100 : 0;
           this.SecondPubNumCanteens = this.SecondData.reduce((sum, row) => sum + +row.priNumCanteens, 0);
           }
     exportTableToExcel1() {
             const table = document.getElementById('PopulationTable'); // Get the table by ID
             if (table) {
               const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
               const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
               XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
               XLSX.writeFile(wb, 'Primary.xlsx'); // Export the workbook as an Excel file
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
               XLSX.writeFile(wb, 'Primary.xlsx'); // Export the workbook as an Excel file
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
       const url = 'http://localhost:8082/api/primary-schools'; // Replace with your backend API endpoint
   
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
         pubNumSchools: row.pubNumSchools,
        pubNumClasses: row.pubNumClasses,
        pubNumClassesUsed: row.pubNumClassesUsed,
        pubNumStudentsEnrolled: row.pubNumStudentsEnrolled,
        pubClassOccupancyRate: row.pubClassOccupancyRate,
        pubNumCanteens: row.pubNumCanteens,
        priNumSchools: row.priNumSchools,
        priNumClasses: row.priNumClasses,
        priNumClassesUsed: row.priNumClassesUsed,
        priNumStudentsEnrolled: row.priNumStudentsEnrolled,
        priClassOccupancyRate: row.priClassOccupancyRate,
        priNumCanteens: row.priNumCanteens,
         daira: 'Bouira', // Add a 'daira' field to identify the source
       }));
       
       const secondData = this.SecondData.map((row) => ({
         code: row.code,
         town: row.town,
         pubNumSchools: row.pubNumSchools,
        pubNumClasses: row.pubNumClasses,
        pubNumClassesUsed: row.pubNumClassesUsed,
        pubNumStudentsEnrolled: row.pubNumStudentsEnrolled,
        pubClassOccupancyRate: row.pubClassOccupancyRate,
        pubNumCanteens: row.pubNumCanteens,
        priNumSchools: row.priNumSchools,
        priNumClasses: row.priNumClasses,
        priNumClassesUsed: row.priNumClassesUsed,
        priNumStudentsEnrolled: row.priNumStudentsEnrolled,
        priClassOccupancyRate: row.priClassOccupancyRate,
        priNumCanteens: row.priNumCanteens,
         daira: 'Sour el ghozlane', // Add a 'daira' field to identify the source
       }));
       return [...firstData, ...secondData];
   }
   saveAllData() {
     const combinedData = this.combineData(); // Combine data from both tables
     const url = 'http://localhost:8082/api/primary-schools/savedata'; // Replace with your backend API endpoint
   
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

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
    }, 0);
  }

  private initCharts() {
    this.initStateChart();
    this.initDairaComparisonChart();
    this.initOccupancyTrendChart();
  }

  private initStateChart() {
    const ctx = document.getElementById('stateChart') as HTMLCanvasElement;
    this.stateChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Schools', 'Classes', 'Students Enrolled', 'Canteens'],
        datasets: [
          {
            label: 'Public',
            data: [
              this.tableData.reduce((sum, row) => sum + row.pubNumSchools, 0),
              this.tableData.reduce((sum, row) => sum + row.pubNumClasses, 0),
              this.tableData.reduce((sum, row) => sum + row.pubNumStudentsEnrolled, 0),
              this.tableData.reduce((sum, row) => sum + row.pubNumCanteens, 0)
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Private',
            data: [
              this.tableData.reduce((sum, row) => sum + row.priNumSchools, 0),
              this.tableData.reduce((sum, row) => sum + row.priNumClasses, 0),
              this.tableData.reduce((sum, row) => sum + row.priNumStudentsEnrolled, 0),
              this.tableData.reduce((sum, row) => sum + row.priNumCanteens, 0)
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'State Overview: Public vs Private Education'
          }
        }
      }
    });
  }

  private initDairaComparisonChart() {
    const ctx = document.getElementById('dairaComparisonChart') as HTMLCanvasElement;
    this.dairaComparisonChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Schools', 'Classes', 'Students', 'Canteens'],
        datasets: [
          {
            label: 'Bouira - Public',
            data: [
              this.FirstPubNumSchools,
              this.FirstPubNumClasses,
              this.FirstPubNumStudentsEnrolled,
              this.FirstPubNumCanteens
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Bouira - Private',
            data: [
              this.FirstPriNumSchools,
              this.FirstPriNumClasses,
              this.FirstPriNumStudentsEnrolled,
              this.FirstPriNumCanteens
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Sour El Ghozlane - Public',
            data: [
              this.SecondPubNumSchools,
              this.SecondPubNumClasses,
              this.SecondPubNumStudentsEnrolled,
              this.SecondPubNumCanteens
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Sour El Ghozlane - Private',
            data: [
              this.SecondPriNumSchools,
              this.SecondPriNumClasses,
              this.SecondPriNumStudentsEnrolled,
              this.SecondPriNumCanteens
            ],
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Daira Comparison: Education Metrics'
          }
        }
      }
    });
  }

  private initOccupancyTrendChart() {
    const ctx = document.getElementById('occupancyTrendChart') as HTMLCanvasElement;
    this.occupancyTrendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['State Average', 'Bouira', 'Sour El Ghozlane'],
        datasets: [
          {
            label: 'Public Schools',
            data: [
              this.tableData.reduce((sum, row) => sum + row.pubClassOccupancyRate, 0) / this.tableData.length,
              this.FirstPubClassOccupancyRate,
              this.SecondPubClassOccupancyRate
            ],
            borderColor: 'rgba(54, 162, 235, 1)',
            tension: 0.1,
            fill: false
          },
          {
            label: 'Private Schools',
            data: [
              this.tableData.reduce((sum, row) => sum + row.priClassOccupancyRate, 0) / this.tableData.length,
              this.FirstPriClassOccupancyRate,
              this.SecondPriClassOccupancyRate
            ],
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.1,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Occupancy Rate (%)'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Class Occupancy Rate Trends'
          }
        }
      }
    });
  }

  private updateCharts() {
    if (this.stateChart) {
      this.stateChart.data.datasets[0].data = [
        this.tableData.reduce((sum, row) => sum + row.pubNumSchools, 0),
        this.tableData.reduce((sum, row) => sum + row.pubNumClasses, 0),
        this.tableData.reduce((sum, row) => sum + row.pubNumStudentsEnrolled, 0),
        this.tableData.reduce((sum, row) => sum + row.pubNumCanteens, 0)
      ];
      this.stateChart.data.datasets[1].data = [
        this.tableData.reduce((sum, row) => sum + row.priNumSchools, 0),
        this.tableData.reduce((sum, row) => sum + row.priNumClasses, 0),
        this.tableData.reduce((sum, row) => sum + row.priNumStudentsEnrolled, 0),
        this.tableData.reduce((sum, row) => sum + row.priNumCanteens, 0)
      ];
      this.stateChart.update();
    }

    if (this.dairaComparisonChart) {
      this.dairaComparisonChart.data.datasets[0].data = [
        this.FirstPubNumSchools,
        this.FirstPubNumClasses,
        this.FirstPubNumStudentsEnrolled,
        this.FirstPubNumCanteens
      ];
      this.dairaComparisonChart.data.datasets[1].data = [
        this.FirstPriNumSchools,
        this.FirstPriNumClasses,
        this.FirstPriNumStudentsEnrolled,
        this.FirstPriNumCanteens
      ];
      this.dairaComparisonChart.data.datasets[2].data = [
        this.SecondPubNumSchools,
        this.SecondPubNumClasses,
        this.SecondPubNumStudentsEnrolled,
        this.SecondPubNumCanteens
      ];
      this.dairaComparisonChart.data.datasets[3].data = [
        this.SecondPriNumSchools,
        this.SecondPriNumClasses,
        this.SecondPriNumStudentsEnrolled,
        this.SecondPriNumCanteens
      ];
      this.dairaComparisonChart.update();
    }

    if (this.occupancyTrendChart) {
      this.occupancyTrendChart.data.datasets[0].data = [
        this.tableData.reduce((sum, row) => sum + row.pubClassOccupancyRate, 0) / this.tableData.length,
        this.FirstPubClassOccupancyRate,
        this.SecondPubClassOccupancyRate
      ];
      this.occupancyTrendChart.data.datasets[1].data = [
        this.tableData.reduce((sum, row) => sum + row.priClassOccupancyRate, 0) / this.tableData.length,
        this.FirstPriClassOccupancyRate,
        this.SecondPriClassOccupancyRate
      ];
      this.occupancyTrendChart.update();
    }
  }
}