import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare var Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './middle.component.html',
  styleUrls: ['./middle.component.css'],
  standalone: false,
})

export class MiddleComponent implements AfterViewInit {
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
      pubNumCEMs: 0,
      pubNumClasses: 0,
      pubNumClassesUsed: 0,
      pubNumStudentsEnrolled: 0,
      pubClassOccupancyRate: 0,
      pubNumHalfboardPrograms: 0,
      priNumCEMs: 0,
      priNumClasses: 0,
      priNumClassesUsed: 0,
      priNumStudentsEnrolled: 0,
      priClassOccupancyRate: 0,
      priNumHalfboardPrograms: 0,
    },
    
  ];

  FirstData: any[] = [
    {
     code: '',
     state: '',
     pubNumCEMs: 0,
     pubNumClasses: 0,
     pubNumClassesUsed: 0,
     pubNumStudentsEnrolled: 0,
     pubClassOccupancyRate: 0,
     pubNumHalfboardPrograms: 0,
     priNumCEMs: 0,
     priNumClasses: 0,
     priNumClassesUsed: 0,
     priNumStudentsEnrolled: 0,
     priClassOccupancyRate: 0,
     priNumHalfboardPrograms: 0,
    },
    {
     code: '',
     state: '',
     pubNumCEMs: 0,
      pubNumClasses: 0,
      pubNumClassesUsed: 0,
      pubNumStudentsEnrolled: 0,
      pubClassOccupancyRate: 0,
      pubNumHalfboardPrograms: 0,
      priNumCEMs: 0,
      priNumClasses: 0,
      priNumClassesUsed: 0,
      priNumStudentsEnrolled: 0,
      priClassOccupancyRate: 0,
      priNumHalfboardPrograms: 0,
    },
  ];
          
  SecondData: any[] = [
    {
     code: '',
      state: '',
      pubNumCEMs: 0,
      pubNumClasses: 0,
      pubNumClassesUsed: 0,
      pubNumStudentsEnrolled: 0,
      pubClassOccupancyRate: 0,
      pubNumHalfboardPrograms: 0,
      priNumCEMs: 0,
      priNumClasses: 0,
      priNumClassesUsed: 0,
      priNumStudentsEnrolled: 0,
      priClassOccupancyRate: 0,
      priNumHalfboardPrograms: 0,
    },
    {
     code: '',
     state: '',
     pubNumCEMs: 0,
      pubNumClasses: 0,
      pubNumClassesUsed: 0,
      pubNumStudentsEnrolled: 0,
      pubClassOccupancyRate: 0,
      pubNumHalfboardPrograms: 0,
      priNumCEMs: 0,
      priNumClasses: 0,
      priNumClassesUsed: 0,
      priNumStudentsEnrolled: 0,
      priClassOccupancyRate: 0,
      priNumHalfboardPrograms: 0,
    },
  ];
  
  FirstpubNumCEMs = 0;
  FirstpubNumClasses = 0;
  FirstpubNumClassesUsed = 0;
  FirstpubNumStudentsEnrolled = 0;
  FirstpubClassOccupancyRate = 0;
  FirstpubNumHalfboardPrograms = 0;
  FirstPriNumCEMs = 0;
  FirstPriNumClasses = 0;
  FirstPriNumClassesUsed = 0;
  FirstPriNumStudentsEnrolled = 0;
  FirstPriClassOccupancyRate = 0;
  FirstPriNumHalfboardPrograms = 0


  SecondpubNumCEMs = 0;
  SecondpubNumClasses = 0;
  SecondpubNumClassesUsed = 0;
  SecondpubNumStudentsEnrolled = 0;
  SecondpubClassOccupancyRate = 0;
  SecondpubNumHalfboardPrograms = 0;
  SecondPriNumCEMs = 0;
  SecondPriNumClasses = 0;
  SecondPriNumClassesUsed = 0;
  SecondPriNumStudentsEnrolled = 0;
  SecondPriClassOccupancyRate = 0;
  SecondPriNumHalfboardPrograms = 0;

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
        
        Object.assign(this.FirstData[rowIndex], this.calculatePercentages(this.FirstData[rowIndex]));
        this.calculateFirstTotals();
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
     
       calculateFirstTotals() {
         this.FirstpubNumCEMs = this.FirstData.reduce((sum, row) => sum + +row.pubNumCEMs, 0);
         this.FirstpubNumClasses = this.FirstData.reduce((sum, row) => sum + +row.pubNumClasses, 0);
         this.FirstpubNumClassesUsed = this.FirstData.reduce((sum, row) => sum + +row.pubNumClassesUsed, 0);
         this.FirstpubNumStudentsEnrolled = this.FirstData.reduce((sum, row) => sum + +row.pubNumStudentsEnrolled, 0);
         this.FirstpubClassOccupancyRate = this.FirstpubNumClasses ? (this.FirstpubNumStudentsEnrolled / this.FirstpubNumClasses) * 100 : 0;
         this.FirstpubNumHalfboardPrograms = this.FirstData.reduce((sum, row) => sum + +row.pubNumHalfboardPrograms, 0);
         this.FirstPriNumCEMs = this.FirstData.reduce((sum, row) => sum + +row.priNumCEMs, 0);
         this.FirstPriNumClasses = this.FirstData.reduce((sum, row) => sum + +row.priNumClasses, 0);
         this.FirstPriNumClassesUsed = this.FirstData.reduce((sum, row) => sum + +row.priNumClassesUsed, 0);
         this.FirstPriNumStudentsEnrolled = this.FirstData.reduce((sum, row) => sum + +row.priNumStudentsEnrolled, 0);
         this.FirstPriClassOccupancyRate = this.FirstPriNumClasses ? (this.FirstPriNumStudentsEnrolled / this.FirstPriNumClasses) * 100 : 0;
         this.FirstPriNumHalfboardPrograms = this.FirstData.reduce((sum, row) => sum + +row.priNumHalfboardPrograms, 0);              
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
    this.calculateSecondTotals();
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
 
         // Calculate totals for Daira: Bouira
         calculateSecondTotals() {
           this.SecondpubNumCEMs = this.SecondData.reduce((sum, row) => sum + +row.pubNumCEMs, 0);
           this.SecondpubNumClasses = this.SecondData.reduce((sum, row) => sum + +row.pubNumClasses, 0);
           this.SecondpubNumClassesUsed = this.SecondData.reduce((sum, row) => sum + +row.pubNumClassesUsed, 0);
           this.SecondpubNumStudentsEnrolled = this.SecondData.reduce((sum, row) => sum + +row.pubNumStudentsEnrolled, 0);
           this.SecondpubClassOccupancyRate = this.SecondpubNumClasses ? (this.SecondpubNumStudentsEnrolled / this.SecondpubNumClasses) * 100 : 0;
           this.SecondpubNumHalfboardPrograms = this.SecondData.reduce((sum, row) => sum + +row.pubNumHalfboardPrograms, 0);
           this.SecondPriNumCEMs = this.SecondData.reduce((sum, row) => sum + +row.priNumCEMs, 0);
           this.SecondPriNumClasses = this.SecondData.reduce((sum, row) => sum + +row.priNumClasses, 0);
           this.SecondPriNumClassesUsed = this.SecondData.reduce((sum, row) => sum + +row.priNumClassesUsed, 0);
           this.SecondPriNumStudentsEnrolled = this.SecondData.reduce((sum, row) => sum + +row.priNumStudentsEnrolled, 0);
           this.SecondPriClassOccupancyRate = this.SecondPriNumClasses ? (this.SecondPriNumStudentsEnrolled / this.SecondPriNumClasses) * 100 : 0;
           this.SecondPriNumHalfboardPrograms = this.SecondData.reduce((sum, row) => sum + +row.priNumHalfboardPrograms, 0);
           }
     exportTableToExcel1() {
             const table = document.getElementById('PopulationTable'); // Get the table by ID
             if (table) {
               const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
               const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
               XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
               XLSX.writeFile(wb, 'middle.xlsx'); // Export the workbook as an Excel file
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
               XLSX.writeFile(wb, 'middle.xlsx'); // Export the workbook as an Excel file
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
        pubNumCEMs: row.pubNumCEMs,
        pubNumClasses: row.pubNumClasses,
        pubNumClassesUsed: row.pubNumClassesUsed,
        pubNumStudentsEnrolled: row.pubNumStudentsEnrolled,
        pubClassOccupancyRate: row.pubClassOccupancyRate,
        pubNumHalfboardPrograms: row.pubNumHalfboardPrograms,
        priNumCEMs: row.priNumCEMs,
        priNumClasses: row.priNumClasses,
        priNumClassesUsed: row.priNumClassesUsed,
        priNumStudentsEnrolled: row.priNumStudentsEnrolled,
        priClassOccupancyRate: row.priClassOccupancyRate,
        priNumHalfboardPrograms: row.priNumHalfboardPrograms,
         daira: 'Bouira', // Add a 'daira' field to identify the source
       }));
       
       const secondData = this.SecondData.map((row) => ({
         code: row.code,
         town: row.town,
        pubNumCEMs: row.pubNumCEMs,
        pubNumClasses: row.pubNumClasses,
        pubNumClassesUsed: row.pubNumClassesUsed,
        pubNumStudentsEnrolled: row.pubNumStudentsEnrolled,
        pubClassOccupancyRate: row.pubClassOccupancyRate,
        pubNumHalfboardPrograms: row.pubNumHalfboardPrograms,
        priNumCEMs: row.priNumCEMs,
        priNumClasses: row.priNumClasses,
        priNumClassesUsed: row.priNumClassesUsed,
        priNumStudentsEnrolled: row.priNumStudentsEnrolled,
        priClassOccupancyRate: row.priClassOccupancyRate,
        priNumHalfboardPrograms: row.priNumHalfboardPrograms,
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
        labels: ['CEMs', 'Classes', 'Students Enrolled', 'Half-board Programs'],
        datasets: [
          {
            label: 'Public',
            data: [
              this.tableData.reduce((sum, row) => sum + row.pubNumCEMs, 0),
              this.tableData.reduce((sum, row) => sum + row.pubNumClasses, 0),
              this.tableData.reduce((sum, row) => sum + row.pubNumStudentsEnrolled, 0),
              this.tableData.reduce((sum, row) => sum + row.pubNumHalfboardPrograms, 0)
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Private',
            data: [
              this.tableData.reduce((sum, row) => sum + row.priNumCEMs, 0),
              this.tableData.reduce((sum, row) => sum + row.priNumClasses, 0),
              this.tableData.reduce((sum, row) => sum + row.priNumStudentsEnrolled, 0),
              this.tableData.reduce((sum, row) => sum + row.priNumHalfboardPrograms, 0)
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
        labels: ['CEMs', 'Classes', 'Students', 'Half-board'],
        datasets: [
          {
            label: 'Bouira - Public',
            data: [
              this.FirstpubNumCEMs,
              this.FirstpubNumClasses,
              this.FirstpubNumStudentsEnrolled,
              this.FirstpubNumHalfboardPrograms
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Bouira - Private',
            data: [
              this.FirstPriNumCEMs,
              this.FirstPriNumClasses,
              this.FirstPriNumStudentsEnrolled,
              this.FirstPriNumHalfboardPrograms
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Sour El Ghozlane - Public',
            data: [
              this.SecondpubNumCEMs,
              this.SecondpubNumClasses,
              this.SecondpubNumStudentsEnrolled,
              this.SecondpubNumHalfboardPrograms
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Sour El Ghozlane - Private',
            data: [
              this.SecondPriNumCEMs,
              this.SecondPriNumClasses,
              this.SecondPriNumStudentsEnrolled,
              this.SecondPriNumHalfboardPrograms
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
              this.FirstpubClassOccupancyRate,
              this.SecondpubClassOccupancyRate
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
        this.tableData.reduce((sum, row) => sum + row.pubNumCEMs, 0),
        this.tableData.reduce((sum, row) => sum + row.pubNumClasses, 0),
        this.tableData.reduce((sum, row) => sum + row.pubNumStudentsEnrolled, 0),
        this.tableData.reduce((sum, row) => sum + row.pubNumHalfboardPrograms, 0)
      ];
      this.stateChart.data.datasets[1].data = [
        this.tableData.reduce((sum, row) => sum + row.priNumCEMs, 0),
        this.tableData.reduce((sum, row) => sum + row.priNumClasses, 0),
        this.tableData.reduce((sum, row) => sum + row.priNumStudentsEnrolled, 0),
        this.tableData.reduce((sum, row) => sum + row.priNumHalfboardPrograms, 0)
      ];
      this.stateChart.update();
    }

    if (this.dairaComparisonChart) {
      this.dairaComparisonChart.data.datasets[0].data = [
        this.FirstpubNumCEMs,
        this.FirstpubNumClasses,
        this.FirstpubNumStudentsEnrolled,
        this.FirstpubNumHalfboardPrograms
      ];
      this.dairaComparisonChart.data.datasets[1].data = [
        this.FirstPriNumCEMs,
        this.FirstPriNumClasses,
        this.FirstPriNumStudentsEnrolled,
        this.FirstPriNumHalfboardPrograms
      ];
      this.dairaComparisonChart.data.datasets[2].data = [
        this.SecondpubNumCEMs,
        this.SecondpubNumClasses,
        this.SecondpubNumStudentsEnrolled,
        this.SecondpubNumHalfboardPrograms
      ];
      this.dairaComparisonChart.data.datasets[3].data = [
        this.SecondPriNumCEMs,
        this.SecondPriNumClasses,
        this.SecondPriNumStudentsEnrolled,
        this.SecondPriNumHalfboardPrograms
      ];
      this.dairaComparisonChart.update();
    }

    if (this.occupancyTrendChart) {
      this.occupancyTrendChart.data.datasets[0].data = [
        this.tableData.reduce((sum, row) => sum + row.pubClassOccupancyRate, 0) / this.tableData.length,
        this.FirstpubClassOccupancyRate,
        this.SecondpubClassOccupancyRate
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