import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './schools-n-institutes.component.html',
  styleUrls: ['./schools-n-institutes.component.css'],
  standalone: false,
})

export class SchoolsNInstitutesComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private utilizationChart: any;
  private supervisionChart: any;

  constructor(private http: HttpClient, private router: Router) {}
                  
  tableData: any[] = [
    {
      code: '',
      state: '',
      numInstitutionsNColleges: 0,
      numTeachingPlaces: 0,
      numberEnrolledStudents: 0,
      capacityUtilizationRate: 0,
      numProfessors: 0,
      supervisionRatio: 0,
    },
  ];

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
    }, 0);
  }

  private initCharts() {
    this.initStateChart();
    this.initUtilizationChart();
    this.initSupervisionChart();
  }

  private initStateChart() {
    const ctx = document.getElementById('stateChart') as HTMLCanvasElement;
    this.stateChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Institutions & Colleges', 'Teaching Places', 'Enrolled Students', 'Professors'],
        datasets: [{
          label: 'State Total',
          data: this.getStateDataTotals(),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Schools & Institutes Overview')
    });
  }

  private initUtilizationChart() {
    const ctx = document.getElementById('utilizationChart') as HTMLCanvasElement;
    this.utilizationChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Capacity Utilization Rate'],
        datasets: [{
          label: 'Utilization Rate (%)',
          data: [this.tableData[0].capacityUtilizationRate],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Capacity Utilization')
    });
  }

  private initSupervisionChart() {
    const ctx = document.getElementById('supervisionChart') as HTMLCanvasElement;
    this.supervisionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Student-Professor Ratio'],
        datasets: [{
          label: 'Students per Professor',
          data: [this.tableData[0].supervisionRatio],
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Supervision Ratio')
    });
  }

  private getStateDataTotals(): number[] {
    return [
      this.tableData.reduce((sum, row) => sum + row.numInstitutionsNColleges, 0),
      this.tableData.reduce((sum, row) => sum + row.numTeachingPlaces, 0),
      this.tableData.reduce((sum, row) => sum + row.numberEnrolledStudents, 0),
      this.tableData.reduce((sum, row) => sum + row.numProfessors, 0)
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
            text: title.includes('Utilization') ? 'Utilization Rate (%)' : 
                  title.includes('Ratio') ? 'Students per Professor' : 'Number'
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

    if (this.utilizationChart) {
      this.utilizationChart.data.datasets[0].data = [this.tableData[0].capacityUtilizationRate];
      this.utilizationChart.update();
    }

    if (this.supervisionChart) {
      this.supervisionChart.data.datasets[0].data = [this.tableData[0].supervisionRatio];
      this.supervisionChart.update();
    }
  }

  calculatePercentages(row: any) {
    return {
      capacityUtilizationRate: row.numTeachingPlaces ? (row.numberEnrolledStudents / row.numTeachingPlaces) * 100 : 0,
      supervisionRatio: row.numProfessors ? (row.numberEnrolledStudents / row.numProfessors) : 0,   
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
      XLSX.writeFile(wb, 'Schools & Institutes.xlsx');
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