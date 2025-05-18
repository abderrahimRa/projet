import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare var Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './medical-equipments.component.html',
  styleUrls: ['./medical-equipments.component.css'],
  standalone: false,
})

export class MedicalEquipmentsComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private imagingChart: any;
  private treatmentChart: any;
  private distributionChart: any;

  constructor(private http: HttpClient, private router: Router) {}
                    
  tableData: any[] = [
    {
      code: '',
      state: '',
      FixednMobileXRay: 0,
      ultrasoundScanners: 0,
      scanners: 0,
      hemodialysisMachines: 0,
      numMRI: 0,
    },
  ];

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
    }, 0);
  }

  private initCharts() {
    this.initImagingChart();
    this.initTreatmentChart();
    this.initDistributionChart();
  }

  private initImagingChart() {
    const ctx = document.getElementById('imagingChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.imagingChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.tableData.map(item => item.state),
        datasets: [
          {
            label: 'X-Ray Machines',
            data: this.tableData.map(item => item.FixednMobileXRay),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Ultrasound Scanners',
            data: this.tableData.map(item => item.ultrasoundScanners),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'MRI Machines',
            data: this.tableData.map(item => item.numMRI),
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }
        ]
      },
      options: this.getChartOptions('Medical Imaging Equipment')
    });
  }

  private initTreatmentChart() {
    const ctx = document.getElementById('treatmentChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.treatmentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.tableData.map(item => item.state),
        datasets: [
          {
            label: 'Hemodialysis Machines',
            data: this.tableData.map(item => item.hemodialysisMachines),
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          },
          {
            label: 'Scanners',
            data: this.tableData.map(item => item.scanners),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: this.getChartOptions('Treatment Equipment')
    });
  }

  private initDistributionChart() {
    const ctx = document.getElementById('distributionChart') as HTMLCanvasElement;
    if (!ctx) return;

    const totalXRay = this.tableData.reduce((sum, item) => sum + item.FixednMobileXRay, 0);
    const totalUltrasound = this.tableData.reduce((sum, item) => sum + item.ultrasoundScanners, 0);
    const totalScanners = this.tableData.reduce((sum, item) => sum + item.scanners, 0);
    const totalDialysis = this.tableData.reduce((sum, item) => sum + item.hemodialysisMachines, 0);
    const totalMRI = this.tableData.reduce((sum, item) => sum + item.numMRI, 0);

    this.distributionChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['X-Ray', 'Ultrasound', 'Scanners', 'Hemodialysis', 'MRI'],
        datasets: [{
          data: [totalXRay, totalUltrasound, totalScanners, totalDialysis, totalMRI],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Equipment Distribution')
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
            text: 'Number of Equipment',
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
    if (this.imagingChart) {
      this.imagingChart.data.labels = this.tableData.map(item => item.state);
      this.imagingChart.data.datasets[0].data = this.tableData.map(item => item.FixednMobileXRay);
      this.imagingChart.data.datasets[1].data = this.tableData.map(item => item.ultrasoundScanners);
      this.imagingChart.data.datasets[2].data = this.tableData.map(item => item.numMRI);
      this.imagingChart.update();
    }

    if (this.treatmentChart) {
      this.treatmentChart.data.labels = this.tableData.map(item => item.state);
      this.treatmentChart.data.datasets[0].data = this.tableData.map(item => item.hemodialysisMachines);
      this.treatmentChart.data.datasets[1].data = this.tableData.map(item => item.scanners);
      this.treatmentChart.update();
    }

    if (this.distributionChart) {
      const totalXRay = this.tableData.reduce((sum, item) => sum + item.FixednMobileXRay, 0);
      const totalUltrasound = this.tableData.reduce((sum, item) => sum + item.ultrasoundScanners, 0);
      const totalScanners = this.tableData.reduce((sum, item) => sum + item.scanners, 0);
      const totalDialysis = this.tableData.reduce((sum, item) => sum + item.hemodialysisMachines, 0);
      const totalMRI = this.tableData.reduce((sum, item) => sum + item.numMRI, 0);
      
      this.distributionChart.data.datasets[0].data = [totalXRay, totalUltrasound, totalScanners, totalDialysis, totalMRI];
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
    const table = document.getElementById('PopulationTable');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'Medical Equipment.xlsx');
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
}
