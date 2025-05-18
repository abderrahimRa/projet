import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare var Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './private-infrastructure.component.html',
  styleUrls: ['./private-infrastructure.component.css'],
  standalone: false,
})

export class PrivateInfrastructureComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private facilitiesChart: any;
  private distributionChart: any;
  private growthChart: any;

  constructor(private http: HttpClient, private router: Router) {}
                     
  tableData: any[] = [
    {
      code: '',
      state: '',
      hospitals: 0,
      clinics: 0,
      laboratories: 0,
      imagingCenters: 0,
    },
  ];

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
    }, 0);
  }

  private initCharts() {
    this.initFacilitiesChart();
    this.initDistributionChart();
    this.initGrowthChart();
  }

  private initFacilitiesChart() {
    const ctx = document.getElementById('facilitiesChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.facilitiesChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.tableData.map(item => item.state),
        datasets: [
          {
            label: 'Hospitals',
            data: this.tableData.map(item => item.hospitals),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Clinics',
            data: this.tableData.map(item => item.clinics),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: this.getChartOptions('Healthcare Facilities by State')
    });
  }

  private initDistributionChart() {
    const ctx = document.getElementById('distributionChart') as HTMLCanvasElement;
    if (!ctx) return;

    const totalHospitals = this.tableData.reduce((sum, item) => sum + item.hospitals, 0);
    const totalClinics = this.tableData.reduce((sum, item) => sum + item.clinics, 0);
    const totalLabs = this.tableData.reduce((sum, item) => sum + item.laboratories, 0);
    const totalImaging = this.tableData.reduce((sum, item) => sum + item.imagingCenters, 0);

    this.distributionChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Hospitals', 'Clinics', 'Laboratories', 'Imaging Centers'],
        datasets: [{
          data: [totalHospitals, totalClinics, totalLabs, totalImaging],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 206, 86, 0.5)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Facility Distribution')
    });
  }

  private initGrowthChart() {
    const ctx = document.getElementById('growthChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.growthChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.tableData.map(item => item.state),
        datasets: [
          {
            label: 'Laboratories',
            data: this.tableData.map(item => item.laboratories),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Imaging Centers',
            data: this.tableData.map(item => item.imagingCenters),
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          }
        ]
      },
      options: this.getChartOptions('Diagnostic Facilities by State')
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
            text: 'Number of Facilities',
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
    if (this.facilitiesChart) {
      this.facilitiesChart.data.labels = this.tableData.map(item => item.state);
      this.facilitiesChart.data.datasets[0].data = this.tableData.map(item => item.hospitals);
      this.facilitiesChart.data.datasets[1].data = this.tableData.map(item => item.clinics);
      this.facilitiesChart.update();
    }

    if (this.distributionChart) {
      const totalHospitals = this.tableData.reduce((sum, item) => sum + item.hospitals, 0);
      const totalClinics = this.tableData.reduce((sum, item) => sum + item.clinics, 0);
      const totalLabs = this.tableData.reduce((sum, item) => sum + item.laboratories, 0);
      const totalImaging = this.tableData.reduce((sum, item) => sum + item.imagingCenters, 0);
      
      this.distributionChart.data.datasets[0].data = [totalHospitals, totalClinics, totalLabs, totalImaging];
      this.distributionChart.update();
    }

    if (this.growthChart) {
      this.growthChart.data.labels = this.tableData.map(item => item.state);
      this.growthChart.data.datasets[0].data = this.tableData.map(item => item.laboratories);
      this.growthChart.data.datasets[1].data = this.tableData.map(item => item.imagingCenters);
      this.growthChart.update();
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
      XLSX.writeFile(wb, 'Private Infrastructure.xlsx');
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
