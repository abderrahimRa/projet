import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './university-residences.component.html',
  styleUrls: ['./university-residences.component.css'],
  standalone: false,
})

export class UniversityResidencesComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private accommodationChart: any;
  private restaurantChart: any;

  constructor(private http: HttpClient, private router: Router) {}
                  
  tableData: any[] = [
    {
      code: '',
      state: '',
      numResidenceHalls: 0,
      numAccommodationBeds: 0,
      totalResidentStudents: 0,
      accommodationUtilRate: 0,
      NumRestaurants: 0,
      capacity: 0,
      utilizationRate: 0,
    },
  ];

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
    }, 0);
  }

  private initCharts() {
    this.initStateChart();
    this.initAccommodationChart();
    this.initRestaurantChart();
  }

  private initStateChart() {
    const ctx = document.getElementById('stateChart') as HTMLCanvasElement;
    this.stateChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Residence Halls', 'Accommodation Beds', 'Resident Students', 'Restaurants'],
        datasets: [{
          label: 'State Total',
          data: this.getStateDataTotals(),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('University Residences Overview')
    });
  }

  private initAccommodationChart() {
    const ctx = document.getElementById('accommodationChart') as HTMLCanvasElement;
    this.accommodationChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Accommodation Utilization Rate'],
        datasets: [{
          label: 'Utilization Rate (%)',
          data: [this.tableData[0].accommodationUtilRate],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Accommodation Utilization')
    });
  }

  private initRestaurantChart() {
    const ctx = document.getElementById('restaurantChart') as HTMLCanvasElement;
    this.restaurantChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Restaurant Utilization Rate'],
        datasets: [{
          label: 'Utilization Rate (%)',
          data: [this.tableData[0].utilizationRate],
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Restaurant Utilization')
    });
  }

  private getStateDataTotals(): number[] {
    return [
      this.tableData.reduce((sum, row) => sum + row.numResidenceHalls, 0),
      this.tableData.reduce((sum, row) => sum + row.numAccommodationBeds, 0),
      this.tableData.reduce((sum, row) => sum + row.totalResidentStudents, 0),
      this.tableData.reduce((sum, row) => sum + row.NumRestaurants, 0)
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
            text: title.includes('Utilization') ? 'Utilization Rate (%)' : 'Number'
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

    if (this.accommodationChart) {
      this.accommodationChart.data.datasets[0].data = [this.tableData[0].accommodationUtilRate];
      this.accommodationChart.update();
    }

    if (this.restaurantChart) {
      this.restaurantChart.data.datasets[0].data = [this.tableData[0].utilizationRate];
      this.restaurantChart.update();
    }
  }

  calculatePercentages(row: any) {
    return {
      accommodationUtilRate: row.numAccommodationBeds ? (row.totalResidentStudents / row.numAccommodationBeds) * 100 : 0,
      utilizationRate: row.capacity ? (row.totalResidentStudents / row.capacity) * 100 : 0,
    };
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

  exportTableToExcel() {
    const table = document.getElementById('PopulationTable');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'University Residences.xlsx');
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