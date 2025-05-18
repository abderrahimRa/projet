import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare var Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './ratios.component.html',
  styleUrls: ['./ratios.component.css'],
  standalone: false,
})

export class RatiosComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private bedsChart: any;
  private facilitiesChart: any;
  private professionalsChart: any;

  constructor(private http: HttpClient, private router: Router) {}
                     
  tableData: any[] = [
    {
      code: '',
      state: '',
      bedsPer1000Population: 0,
      populationPerPolyclinic: 0,
      populationPerTreatmentRoom: 0,
      populationPerGeneralPractitioner: 0,
      populationPerSpecialistPhysician: 0,
      populationPerDentalSurgeon: 0,
      populationPerPharmacist: 0,
      populationPerParamedic: 0,
      populationPerAMAR: 0,
    },
  ];

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
    }, 0);
  }

  private initCharts() {
    this.initBedsChart();
    this.initFacilitiesChart();
    this.initProfessionalsChart();
  }

  private initBedsChart() {
    const ctx = document.getElementById('bedsChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.bedsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.tableData.map(item => item.state),
        datasets: [{
          label: 'Beds per 1000 Population',
          data: this.tableData.map(item => item.bedsPer1000Population),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Bed Capacity Ratio')
    });
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
            label: 'Population per Polyclinic',
            data: this.tableData.map(item => item.populationPerPolyclinic),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Population per Treatment Room',
            data: this.tableData.map(item => item.populationPerTreatmentRoom),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: this.getChartOptions('Healthcare Facilities Coverage')
    });
  }

  private initProfessionalsChart() {
    const ctx = document.getElementById('professionalsChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.professionalsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.tableData.map(item => item.state),
        datasets: [
          {
            label: 'Population per General Practitioner',
            data: this.tableData.map(item => item.populationPerGeneralPractitioner),
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          },
          {
            label: 'Population per Specialist Physician',
            data: this.tableData.map(item => item.populationPerSpecialistPhysician),
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          },
          {
            label: 'Population per Dental Surgeon',
            data: this.tableData.map(item => item.populationPerDentalSurgeon),
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
          }
        ]
      },
      options: this.getChartOptions('Healthcare Professionals Coverage')
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
            text: 'Population Ratio',
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
    if (this.bedsChart) {
      this.bedsChart.data.labels = this.tableData.map(item => item.state);
      this.bedsChart.data.datasets[0].data = this.tableData.map(item => item.bedsPer1000Population);
      this.bedsChart.update();
    }

    if (this.facilitiesChart) {
      this.facilitiesChart.data.labels = this.tableData.map(item => item.state);
      this.facilitiesChart.data.datasets[0].data = this.tableData.map(item => item.populationPerPolyclinic);
      this.facilitiesChart.data.datasets[1].data = this.tableData.map(item => item.populationPerTreatmentRoom);
      this.facilitiesChart.update();
    }

    if (this.professionalsChart) {
      this.professionalsChart.data.labels = this.tableData.map(item => item.state);
      this.professionalsChart.data.datasets[0].data = this.tableData.map(item => item.populationPerGeneralPractitioner);
      this.professionalsChart.data.datasets[1].data = this.tableData.map(item => item.populationPerSpecialistPhysician);
      this.professionalsChart.data.datasets[2].data = this.tableData.map(item => item.populationPerDentalSurgeon);
      this.professionalsChart.update();
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
      XLSX.writeFile(wb, 'Ratios.xlsx'); // Export the workbook as an Excel file
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
