import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { UserService } from '../../../services/user.service';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './ports.component.html',
  styleUrls: ['./ports.component.css'],
  standalone: false,
})

export class PortsComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private typeChart: any;
  private passengerChart: any;


  constructor(
    private http: HttpClient, 
    private router: Router,
    private userService: UserService
  ) {}
               
  tableData: any[] = [
    {
      code: '',
      state: '',
      ports: 0,
      commercialPorts: 0,
      pleasureMarinas: 0,
      dryPorts: 0,
      numPassengers: 0,
    },
  ];

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
    }, 0);
  }

  private initCharts() {
    this.initStateChart();
    this.initTypeChart();
    this.initPassengerChart();
  }

  private initStateChart() {
    const ctx = document.getElementById('stateChart') as HTMLCanvasElement;
    this.stateChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Ports', 'Commercial Ports', 'Pleasure Marinas', 'Dry Ports', 'Passengers'],
        datasets: [{
          label: 'State Total',
          data: this.getStateDataTotals(),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Ports Overview')
    });
  }

  private initTypeChart() {
    const ctx = document.getElementById('typeChart') as HTMLCanvasElement;
    this.typeChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Commercial Ports', 'Pleasure Marinas', 'Dry Ports'],
        datasets: [{
          data: [
            this.tableData.reduce((sum, row) => sum + row.commercialPorts, 0),
            this.tableData.reduce((sum, row) => sum + row.pleasureMarinas, 0),
            this.tableData.reduce((sum, row) => sum + row.dryPorts, 0)
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Port Type Distribution')
    });
  }

  private initPassengerChart() {
    const ctx = document.getElementById('passengerChart') as HTMLCanvasElement;
    this.passengerChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Passenger Traffic'],
        datasets: [{
          label: 'Number of Passengers',
          data: [this.tableData.reduce((sum, row) => sum + row.numPassengers, 0)],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Passenger Traffic')
    });
  }

  private getStateDataTotals(): number[] {
    return [
      this.tableData.reduce((sum, row) => sum + row.ports, 0),
      this.tableData.reduce((sum, row) => sum + row.commercialPorts, 0),
      this.tableData.reduce((sum, row) => sum + row.pleasureMarinas, 0),
      this.tableData.reduce((sum, row) => sum + row.dryPorts, 0),
      this.tableData.reduce((sum, row) => sum + row.numPassengers, 0)
    ];
  }

  private getChartOptions(title: string): any {
    return {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number'
          }
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

    if (this.typeChart) {
      this.typeChart.data.datasets[0].data = [
        this.tableData.reduce((sum, row) => sum + row.commercialPorts, 0),
        this.tableData.reduce((sum, row) => sum + row.pleasureMarinas, 0),
        this.tableData.reduce((sum, row) => sum + row.dryPorts, 0)
      ];
      this.typeChart.update();
    }

    if (this.passengerChart) {
      this.passengerChart.data.datasets[0].data = [this.tableData.reduce((sum, row) => sum + row.numPassengers, 0)];
      this.passengerChart.update();
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

  exportTableToExcel() {
    const table = document.getElementById('PopulationTable');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'Ports.xlsx');
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
    this.tableData.forEach(row => {
      const portData = {
        state: {
          id: parseInt(row.code) // Assuming code is the state ID
        },
        totalPorts: row.ports,
        commercialPorts: row.commercialPorts,
        pleasureMarinas: row.pleasureMarinas,
        dryPorts: row.dryPorts,
        passengerCount: row.numPassengers,
        lastUpdated: new Date().toISOString()
      };

      // First try to update existing data
      this.http.put(`${'http://localhost:8082/api/port/savedata'}/${row.code}`, portData).subscribe({
        next: () => {
          console.log('Port data updated successfully for state:', row.code);
        },
        error: (error) => {
          if (error.status === 404) {
            // If not found, create new entry
            this.http.post('http://localhost:8082/api/port/savedata', portData).subscribe({
              next: () => {
                console.log('Port data created successfully for state:', row.code);
              },
              error: (createError) => {
                console.error('Error creating port data for state:', row.code, createError);
              }
            });
          } else {
            console.error('Error updating port data for state:', row.code, error);
          }
        }
      });
    });
  }
  
}