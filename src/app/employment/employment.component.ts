import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { UserService } from '../services/user.service';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.css'],
  standalone: false,
})
export class EmploymentComponent implements AfterViewInit {
  isTableHidden = false;
  private employmentChart: any;
  

  constructor(
    private http: HttpClient, 
    private router: Router,
    private userService: UserService
  ) {}

  tableData: any[] = [
    {
      code: 0,
      state: '',
      active: 0, 
      occupied: 0, 
      unemployed: 0, 
      unemploymentRate: 0, 
    },
  ];

  // Update a cell and recalculate the unemployment rate
  updateCell(rowIndex: number, field: string, event: Event) {
    const inputElement = event.target as HTMLElement;
    let newValue = inputElement.innerText;
  
    if (field === 'code') {
      const numericValue = parseInt(newValue) || 0;
      this.tableData[rowIndex][field] = numericValue;
      newValue = numericValue.toString();
    } else if (field === 'state') {
      this.tableData[rowIndex][field] = newValue;
    } else {
      const numericValue = parseFloat(newValue) || 0;
      this.tableData[rowIndex][field] = numericValue;
      newValue = numericValue.toString(); 
    }

    if (field === 'active' || field === 'unemployed') {
      this.calculateUnemploymentRate(rowIndex);
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
    if (['active', 'occupied', 'unemployed'].includes(field)) {
      this.updateChart();
    }
  }

  // Calculate the unemployment rate
  calculateUnemploymentRate(rowIndex: number) {
    const row = this.tableData[rowIndex];
    const active = row.active;
    const unemployed = row.unemployed;

    if (active > 0) {
      row.unemploymentRate = ((unemployed / active) * 100).toFixed(2);
    } else {
      row.unemploymentRate = 0;
    }
  }

  exportTableToExcel() {
    const table = document.getElementById('PopulationTable');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'EmploymentData.xlsx');
    } else {
      console.error('Table not found!');
    }
  }

  toggleTable() {
    this.isTableHidden = !this.isTableHidden;
  }

  onLogout() {
    if (confirm('Are you sure you want to log out?')) {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        this.userService.removeActiveUser(currentUser);
      }
      
      localStorage.removeItem('userRole');
      localStorage.removeItem('sessionExpires');
      localStorage.removeItem('currentUser');
  
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
      const employmentData = {
        state: {
          id: parseInt(row.code) // Assuming code is the state ID
        },
        population: row.active, // Using active as population
        active: row.active,
        occupied: row.occupied,
        unemployed: row.unemployed,
        unemploymentRate: parseFloat(row.unemploymentRate)
      };

      // First try to update existing data
      this.http.put(`${'http://localhost:8082/api/employment'}/${row.code}`, employmentData).subscribe({
        next: (response) => {
          console.log('Data updated successfully for state:', row.code);
        },
        error: (error) => {
          if (error.status === 404) {
            // If not found, create new entry
            this.http.post('http://localhost:8082/api/employment/savedata', employmentData).subscribe({
              next: (response) => {
                console.log('Data created successfully for state:', row.code);
              },
              error: (createError) => {
                console.error('Error creating data for state:', row.code, createError);
              }
            });
          } else {
            console.error('Error updating data for state:', row.code, error);
          }
        }
      });
    });
  }

  // Import Excel data
  importFromExcel(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Clear existing data
        this.tableData = [];
        
        // Import new data
        jsonData.forEach((row: any) => {
          const newRow = {
            code: row['Code'] || 0,
            state: row['State'] || '',
            active: +row['Active'] || 0,
            occupied: +row['Ocupied'] || 0,
            unemployed: +row['Unemployed'] || 0,
            unemploymentRate: 0 // Will be calculated
          };
          this.tableData.push(newRow);
        });
        
        // Recalculate unemployment rates
        this.tableData.forEach((_, index) => {
          this.calculateUnemploymentRate(index);
        });
        
        this.updateChart();
      } catch (error) {
        console.error('Error importing data:', error);
      } finally {
        event.target.value = ''; // Reset input
      }
    };
    fileReader.readAsArrayBuffer(file);
  }

  // Initialize chart after view is ready
  ngAfterViewInit() {
    setTimeout(() => this.initChart(), 100);
  }

  private initChart() {
    const ctx = document.getElementById('employmentChart') as HTMLCanvasElement;
    if (ctx) {
      this.employmentChart = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
          labels: this.tableData.map(row => row.state || 'State ' + row.code),
          datasets: [
            {
              label: 'Active Population',
              data: this.tableData.map(row => row.active),
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Occupied',
              data: this.tableData.map(row => row.occupied),
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Unemployed',
              data: this.tableData.map(row => row.unemployed),
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
              text: 'Employment Statistics',
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
                text: 'Population',
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
    if (this.employmentChart) {
      this.employmentChart.data.labels = this.tableData.map(row => row.state || 'State ' + row.code);
      this.employmentChart.data.datasets[0].data = this.tableData.map(row => row.active);
      this.employmentChart.data.datasets[1].data = this.tableData.map(row => row.occupied);
      this.employmentChart.data.datasets[2].data = this.tableData.map(row => row.unemployed);
      this.employmentChart.update();
    }
  }
}