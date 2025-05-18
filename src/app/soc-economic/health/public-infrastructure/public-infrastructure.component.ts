import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare var Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './public-infrastructure.component.html',
  styleUrls: ['./public-infrastructure.component.css'],
  standalone: false,
})

export class PublicInfrastructureComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private facilitiesChart: any;
  private bedsChart: any;
  private maternityChart: any;

  constructor(private http: HttpClient, private router: Router) {}
                     
  tableData: any[] = [
    {
      code: '',
      state: '',
      numCHU: 0,
      numCHUbeds: 0,
      numEPH: 0,
      numEPHbeds: 0,
      numEPS: 0,
      numEPSbeds: 0,
      numEHS: 0,
      numEHSbeds: 0,
      numMaternity: 0,
      numMidwives: 0,
      deficitMidwife: 0,
      polyclinic: 0,
    },
  ];

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
    }, 0);
  }

  private initCharts() {
    this.initFacilitiesChart();
    this.initBedsChart();
    this.initMaternityChart();
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
            label: 'CHU',
            data: this.tableData.map(item => item.numCHU),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'EPH',
            data: this.tableData.map(item => item.numEPH),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'EPS',
            data: this.tableData.map(item => item.numEPS),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'EHS',
            data: this.tableData.map(item => item.numEHS),
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          }
        ]
      },
      options: this.getChartOptions('Healthcare Facilities by State')
    });
  }

  private initBedsChart() {
    const ctx = document.getElementById('bedsChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.bedsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.tableData.map(item => item.state),
        datasets: [
          {
            label: 'CHU Beds',
            data: this.tableData.map(item => item.numCHUbeds),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'EPH Beds',
            data: this.tableData.map(item => item.numEPHbeds),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'EPS Beds',
            data: this.tableData.map(item => item.numEPSbeds),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'EHS Beds',
            data: this.tableData.map(item => item.numEHSbeds),
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          }
        ]
      },
      options: this.getChartOptions('Bed Capacity by State')
    });
  }

  private initMaternityChart() {
    const ctx = document.getElementById('maternityChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.maternityChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.tableData.map(item => item.state),
        datasets: [
          {
            label: 'Maternity Units',
            data: this.tableData.map(item => item.numMaternity),
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          },
          {
            label: 'Midwives',
            data: this.tableData.map(item => item.numMidwives),
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
          },
          {
            label: 'Midwife Deficit',
            data: this.tableData.map(item => item.deficitMidwife),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: this.getChartOptions('Maternity Services by State')
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
            text: 'Number of Units/Personnel',
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
      this.facilitiesChart.data.datasets[0].data = this.tableData.map(item => item.numCHU);
      this.facilitiesChart.data.datasets[1].data = this.tableData.map(item => item.numEPH);
      this.facilitiesChart.data.datasets[2].data = this.tableData.map(item => item.numEPS);
      this.facilitiesChart.data.datasets[3].data = this.tableData.map(item => item.numEHS);
      this.facilitiesChart.update();
    }

    if (this.bedsChart) {
      this.bedsChart.data.labels = this.tableData.map(item => item.state);
      this.bedsChart.data.datasets[0].data = this.tableData.map(item => item.numCHUbeds);
      this.bedsChart.data.datasets[1].data = this.tableData.map(item => item.numEPHbeds);
      this.bedsChart.data.datasets[2].data = this.tableData.map(item => item.numEPSbeds);
      this.bedsChart.data.datasets[3].data = this.tableData.map(item => item.numEHSbeds);
      this.bedsChart.update();
    }

    if (this.maternityChart) {
      this.maternityChart.data.labels = this.tableData.map(item => item.state);
      this.maternityChart.data.datasets[0].data = this.tableData.map(item => item.numMaternity);
      this.maternityChart.data.datasets[1].data = this.tableData.map(item => item.numMidwives);
      this.maternityChart.data.datasets[2].data = this.tableData.map(item => item.deficitMidwife);
      this.maternityChart.update();
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
      XLSX.writeFile(wb, 'Public Infrastructure.xlsx');
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
