import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { LoginComponent } from '@app/login/login.component';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.css'],
  standalone: false,
})

export class EnergyComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private electricityChart: any;
  private gasChart: any;

  constructor(private http: HttpClient, private router: Router) {}
            
           tableData: any[] = [
             {
               code: '',
               state: '',
               overallElectricity: 0,
               urbanElecRate : 0,
               ruralElecRate: 0,
               overallGaz: 0,
               urbanGazRate: 0,
               ruralGazRate: 0,
               numSolarEnergy: 0,
             },
             
           ];
           
            // Data model for Daira: Bouira
            FirstData: any[] = [
             {
              code: '',
              state: '',
              overallElectricity: 0,
               urbanElecRate : 0,
               ruralElecRate: 0,
               overallGaz: 0,
               urbanGazRate: 0,
               ruralGazRate: 0,
               numSolarEnergy: 0,
             },
             {
              code: '',
              state: '',
              overallElectricity: 0,
               urbanElecRate : 0,
               ruralElecRate: 0,
               overallGaz: 0,
               urbanGazRate: 0,
               ruralGazRate: 0,
               numSolarEnergy: 0,
             },
           ];
         
           // Data model for Daira: Sour el ghozlane
           SecondData: any[] = [
             {
              code: '',
               state: '',
               overallElectricity: 0,
               urbanElecRate : 0,
               ruralElecRate: 0,
               overallGaz: 0,
               urbanGazRate: 0,
               ruralGazRate: 0,
               numSolarEnergy: 0,
             },
             {
              code: '',
              state: '',
              overallElectricity: 0,
               urbanElecRate : 0,
               ruralElecRate: 0,
               overallGaz: 0,
               urbanGazRate: 0,
               ruralGazRate: 0,
               numSolarEnergy: 0,
             },
           ];
           
           // Totals for Daira: Bouira
           FirstoverallElectricity = 0;
           FirsturbanElecRate = 0;   
           FirstruralElecRate = 0;   
           FirstoverallGaz = 0;      
           FirsturbanGazRate = 0;    
           FirstruralGazRate = 0;    
           FirstnumSolarEnergy = 0;  
         
           // Totals for Daira: Sour el ghozlane
           SecondoverallElectricity = 0;
           SecondurbanElecRate = 0;   
           SecondruralElecRate = 0;   
           SecondoverallGaz = 0;      
           SecondurbanGazRate = 0;    
           SecondruralGazRate = 0;    
           SecondnumSolarEnergy = 0;
   
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
      
           updateFirstCell(rowIndex: number, field: string, event: Event) {
            const inputElement = event.target as HTMLElement;
          let newValue = inputElement.innerText;
            this.FirstData[rowIndex][field] = +newValue || 0;
            this.calculateFirstTotals();

            if (!['code', 'state'].includes(field)) {
              const numericValue = parseFloat(newValue) || 0;
              this.FirstData[rowIndex][field] = numericValue;
              newValue = numericValue.toString(); 
            } else {
              this.FirstData[rowIndex][field] = newValue;
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
          }
        
          // Calculate totals for Daira: Bouira
          calculateFirstTotals() {
            this.FirstoverallElectricity = (this.FirstData.reduce((sum, row) => sum + +row.overallElectricity, 0))/2;
            this.FirsturbanElecRate = (this.FirstData.reduce((sum, row) => sum + +row.urbanElecRate, 0))/2;
            this.FirstruralElecRate = (this.FirstData.reduce((sum, row) => sum + +row.ruralElecRate, 0))/2;
            this.FirstoverallGaz = (this.FirstData.reduce((sum, row) => sum + +row.overallGaz, 0))/2;
            this.FirsturbanGazRate = (this.FirstData.reduce((sum, row) => sum + +row.urbanGazRate, 0))/2;       
            this.FirstruralGazRate = (this.FirstData.reduce((sum, row) => sum + +row.ruralGazRate, 0))/2;
            this.FirstnumSolarEnergy = (this.FirstData.reduce((sum, row) => sum + +row.numSolarEnergy, 0))/2;    
            this.updateCharts();
          }
      
           updateSecondCell(rowIndex: number, field: string, event: Event) {
            const inputElement = event.target as HTMLElement;
          let newValue = inputElement.innerText;
            this.SecondData[rowIndex][field] = +newValue || 0;
            this.calculateSecondTotals();

            if (!['code', 'state'].includes(field)) {
              const numericValue = parseFloat(newValue) || 0;
              this.SecondData[rowIndex][field] = numericValue;
              newValue = numericValue.toString(); 
            } else {
              this.SecondData[rowIndex][field] = newValue;
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
          }
        
          // Calculate totals for Daira: Bouira
          calculateSecondTotals() {
            this.SecondoverallElectricity = (this.SecondData.reduce((sum, row) => sum + +row.overallElectricity, 0))/2;
            this.SecondurbanElecRate = (this.SecondData.reduce((sum, row) => sum + +row.urbanElecRate, 0))/2;
            this.SecondruralElecRate = (this.SecondData.reduce((sum, row) => sum + +row.ruralElecRate, 0))/2;
            this.SecondoverallGaz = (this.SecondData.reduce((sum, row) => sum + +row.overallGaz, 0))/2;
            this.SecondurbanGazRate = (this.SecondData.reduce((sum, row) => sum + +row.urbanGazRate, 0))/2;       
            this.SecondruralGazRate = (this.SecondData.reduce((sum, row) => sum + +row.ruralGazRate, 0))/2;
            this.SecondnumSolarEnergy = (this.SecondData.reduce((sum, row) => sum + +row.numSolarEnergy, 0))/2;       
            this.updateCharts();
      }
      exportTableToExcel1() {
            const table = document.getElementById('PopulationTable'); // Get the table by ID
            if (table) {
              const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
              const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
              XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
              XLSX.writeFile(wb, 'Energy.xlsx'); // Export the workbook as an Excel file
            } else {
              console.error('Table not found!');
            }
          }
          exportTableToExcel2() {
            const table = document.getElementById('detail'); // Get the table by ID
            if (table) {
              const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
              const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
              XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
              XLSX.writeFile(wb, 'Energy.xlsx'); // Export the workbook as an Excel file
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
   
  combineData() {
    const firstData = this.FirstData.map((row) => ({
      code: row.code,
      town: row.town,
      overallElectricity: row.overallElectricity,
      urbanElecRate: row.urbanElecRate,
      ruralElecRate: row.ruralElecRate,   
      overallGaz: row.overallGaz,  
      urbanGazRate: row.urbanGazRate, 
      ruralGazRate: row.ruralGazRate,
      numSolarEnergy: row.numSolarEnergy,
      daira: 'Bouira', // Add a 'daira' field to identify the source
    }));
  
    const secondData = this.SecondData.map((row) => ({
      code: row.code,
      town: row.town,
      overallElectricity: row.overallElectricity,
      urbanElecRate: row.urbanElecRate,
      ruralElecRate: row.ruralElecRate,   
      overallGaz: row.overallGaz,  
      urbanGazRate: row.urbanGazRate, 
      ruralGazRate: row.ruralGazRate,
      numSolarEnergy: row.numSolarEnergy,
      daira: 'Sour el ghozlane', // Add a 'daira' field to identify the source
    }));
    return [...firstData, ...secondData];
}
saveAllData() {
  const combinedData = this.combineData(); // Combine data from both tables
  const url = 'https://your-backend-api.com/save-data'; // Replace with your backend API endpoint

  // Send the combined data to the backend
  this.http.post(url, combinedData).subscribe(
    (response) => {
      console.log('All data saved successfully!', response);
    },
    (error) => {
      console.error('Error saving data:', error);
    }
  );
}

// Initialize charts after view is ready
ngAfterViewInit() {
  setTimeout(() => {
    this.initCharts();
  }, 0);
}

private initCharts() {
  this.initStateChart();
  this.initElectricityChart();
  this.initGasChart();
}

private initStateChart() {
  const ctx = document.getElementById('stateChart') as HTMLCanvasElement;
  this.stateChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Overall Electricity', 'Overall Gas', 'Solar Energy'],
      datasets: [{
        label: 'State Total',
        data: this.getStateDataTotals(),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: this.getChartOptions('Energy Overview')
  });
}

private initElectricityChart() {
  const ctx = document.getElementById('electricityChart') as HTMLCanvasElement;
  this.electricityChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Urban Electricity Rate', 'Rural Electricity Rate'],
      datasets: [{
        data: [
          this.tableData.reduce((sum, row) => sum + row.urbanElecRate, 0),
          this.tableData.reduce((sum, row) => sum + row.ruralElecRate, 0)
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: this.getChartOptions('Electricity Distribution')
  });
}

private initGasChart() {
  const ctx = document.getElementById('gasChart') as HTMLCanvasElement;
  this.gasChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Urban Gas Rate', 'Rural Gas Rate'],
      datasets: [{
        data: [
          this.tableData.reduce((sum, row) => sum + row.urbanGazRate, 0),
          this.tableData.reduce((sum, row) => sum + row.ruralGazRate, 0)
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)'
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: this.getChartOptions('Gas Distribution')
  });
}

private getStateDataTotals(): number[] {
  return [
    this.tableData.reduce((sum, row) => sum + row.overallElectricity, 0),
    this.tableData.reduce((sum, row) => sum + row.overallGaz, 0),
    this.tableData.reduce((sum, row) => sum + row.numSolarEnergy, 0)
  ];
}

private getChartOptions(title: string): any {
  return {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
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

  if (this.electricityChart) {
    this.electricityChart.data.datasets[0].data = [
      this.tableData.reduce((sum, row) => sum + row.urbanElecRate, 0),
      this.tableData.reduce((sum, row) => sum + row.ruralElecRate, 0)
    ];
    this.electricityChart.update();
  }

  if (this.gasChart) {
    this.gasChart.data.datasets[0].data = [
      this.tableData.reduce((sum, row) => sum + row.urbanGazRate, 0),
      this.tableData.reduce((sum, row) => sum + row.ruralGazRate, 0)
    ];
    this.gasChart.update();
  }
}
}