import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { LoginComponent } from '@app/login/login.component';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './agriculture.component.html',
  styleUrls: ['./agriculture.component.css'],
  standalone: false,
})

export class AgricultureComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private agricultureChart: any;

  constructor(private http: HttpClient, private router: Router) {}

  tableData: any[] = [
    {
      code: '',
      state: '',
      totalAgriArea: 0,
      totalSAU: 0,
      irrigatedSAU: 0,
      SAUontotalAgriArea: 0,
      irrigatedSAUontotalSAU: 0,
      Cereals: 0,
      Dairy: 0,
    }
  ];

  // Calculate percentages
  calculatePercentages(row: any) {
    return {
      SAUontotalAgriArea: row.totalAgriArea ? (row.totalSAU / row.totalAgriArea) * 100 : 0,
      irrigatedSAUontotalSAU: row.totalSAU ? (row.irrigatedSAU / row.totalSAU) * 100 : 0
    };
  }

  // Initialize chart after view is ready
  ngAfterViewInit() {
    setTimeout(() => this.initChart(), 100);
  }

  private initChart() {
    const ctx = document.getElementById('agricultureChart') as HTMLCanvasElement;
    if (ctx) {
      this.agricultureChart = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
          labels: this.tableData.map(row => row.state || 'State ' + row.code),
          datasets: [
            {
              label: 'Total Agricultural Area',
              data: this.tableData.map(row => row.totalAgriArea),
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Total SAU',
              data: this.tableData.map(row => row.totalSAU),
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Irrigated SAU',
              data: this.tableData.map(row => row.irrigatedSAU),
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Agricultural Statistics',
              font: {
                size: 16,
                weight: 'bold'
              }
            },
            legend: {
              position: 'top'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Area (ha)',
                font: {
                  weight: 'bold'
                }
              }
            },
            x: {
              title: {
                display: true,
                text: 'States',
                font: {
                  weight: 'bold'
                }
              }
            }
          }
        }
      });
    }
  }

  private updateChart() {
    if (this.agricultureChart) {
      this.agricultureChart.data.labels = this.tableData.map(row => row.state || 'State ' + row.code);
      this.agricultureChart.data.datasets[0].data = this.tableData.map(row => row.totalAgriArea);
      this.agricultureChart.data.datasets[1].data = this.tableData.map(row => row.totalSAU);
      this.agricultureChart.data.datasets[2].data = this.tableData.map(row => row.irrigatedSAU);
      this.agricultureChart.update();
    }
  }

  // Update the updateCell method to include chart updates
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

    // Update chart when relevant fields change
    if (['totalAgriArea', 'totalSAU', 'irrigatedSAU'].includes(field)) {
      this.updateChart();
    }
  }

  exportTableToExcel() {
    const table = document.getElementById('PopulationTable'); // Get the table by ID
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
      XLSX.writeFile(wb, 'Agriculture.xlsx'); // Export the workbook as an Excel file
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

  // Function to save table data to the backend
  saveTableData() {
    const url = 'http://localhost:8082/api/agriculture/savedata'; // Replace with your backend API endpoint
  
    // Send the table data to the backend
    this.http.post(url, this.tableData).subscribe(
      (response) => {
        console.log('Data saved successfully!', response);
      },
      (error) => {
        console.error('Error saving data:', error);
    });
  }
}
  