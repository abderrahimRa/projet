import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare var Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './paramedics.component.html',
  styleUrls: ['./paramedics.component.css'],
  standalone: false,
})

export class ParamedicsComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private institutesChart: any;
  private capacityChart: any;
  private distributionChart: any;

  constructor(private http: HttpClient, private router: Router) {}
                     
  tableData: any[] = [
    {
      code: '',
      state: '',
      numInstitutesSchools: 0,
      educationalCapacity: 0,
    },
  ];

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
    }, 0);
  }

  private initCharts() {
    this.initInstitutesChart();
    this.initCapacityChart();
    this.initDistributionChart();
  }

  private initInstitutesChart() {
    const ctx = document.getElementById('institutesChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.institutesChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.tableData.map(item => item.state),
        datasets: [{
          label: 'Number of Institutes/Schools',
          data: this.tableData.map(item => item.numInstitutesSchools),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Paramedical Institutes Distribution')
    });
  }

  private initCapacityChart() {
    const ctx = document.getElementById('capacityChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.capacityChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.tableData.map(item => item.state),
        datasets: [{
          label: 'Educational Capacity',
          data: this.tableData.map(item => item.educationalCapacity),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Educational Capacity by State')
    });
  }

  private initDistributionChart() {
    const ctx = document.getElementById('distributionChart') as HTMLCanvasElement;
    if (!ctx) return;

    const totalInstitutes = this.tableData.reduce((sum, item) => sum + item.numInstitutesSchools, 0);
    const totalCapacity = this.tableData.reduce((sum, item) => sum + item.educationalCapacity, 0);

    this.distributionChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Total Institutes', 'Total Capacity'],
        datasets: [{
          data: [totalInstitutes, totalCapacity],
          backgroundColor: [
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 206, 86, 0.5)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Overall Distribution')
    });
  }

  private getChartOptions(title: string) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
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
            text: 'Count',
            font: {
              weight: 'bold'
            }
          }
        },
        x: {
          title: {
            display: true,
            text: 'State',
            font: {
              weight: 'bold'
            }
          }
        }
      }
    };
  }

  private updateCharts() {
    if (this.institutesChart) {
      this.institutesChart.data.labels = this.tableData.map(item => item.state);
      this.institutesChart.data.datasets[0].data = this.tableData.map(item => item.numInstitutesSchools);
      this.institutesChart.update();
    }

    if (this.capacityChart) {
      this.capacityChart.data.labels = this.tableData.map(item => item.state);
      this.capacityChart.data.datasets[0].data = this.tableData.map(item => item.educationalCapacity);
      this.capacityChart.update();
    }

    if (this.distributionChart) {
      const totalInstitutes = this.tableData.reduce((sum, item) => sum + item.numInstitutesSchools, 0);
      const totalCapacity = this.tableData.reduce((sum, item) => sum + item.educationalCapacity, 0);
      this.distributionChart.data.datasets[0].data = [totalInstitutes, totalCapacity];
      this.distributionChart.update();
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

  exportTableToExcel() {
    const table = document.getElementById('PopulationTable'); // Get the table by ID
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new(); 
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
      XLSX.writeFile(wb, 'Ports.xlsx'); // Export the workbook as an Excel file
    } else {
      console.error('Table not found!');
    }
  }
  
  toggleTable() {
    this.isTableHidden = !this.isTableHidden;
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
}