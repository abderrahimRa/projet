import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { LoginComponent } from '@app/login/login.component';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './population-table.component.html',
  styleUrls: ['./population-table.component.css'],
  standalone: false,
})
export class PopulationTableComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private dairaTotalsChart: any;

  constructor(private http: HttpClient, private router: Router) {}
   
  tableData: any[] = [
    {
      code: 0,
      state: '',
      youngerThan6: 0,
      from6To15: 0,
      from16To24: 0,
      from25To50: 0,
      from51To60: 0,
      olderThan60: 0,
      total: 0,
    },
  ];
  
  FirstData: any[] = [
    {
      code: 0,
      town: '',
      youngerThan6: 0,
      from6To15: 0,
      from16To24: 0,
      from25To50: 0,
      from51To60: 0,
      olderThan60: 0,
      total: 0,
    },
    {
      code: 0,
      town: '',
      youngerThan6: 0,
      from6To15: 0,
      from16To24: 0,
      from25To50: 0,
      from51To60: 0,
      olderThan60: 0,
      total: 0,
    },
  ];

  SecondData: any[] = [
    {
      code: 0,
      town: '',
      youngerThan6: 0,
      from6To15: 0,
      from16To24: 0,
      from25To50: 0,
      from51To60: 0,
      olderThan60: 0,
      total: 0,
    },
    {
      code: 0,
      town: '',
      youngerThan6: 0,
      from6To15: 0,
      from16To24: 0,
      from25To50: 0,
      from51To60: 0,
      olderThan60: 0,
      total: 0,
    },
  ];

  totalYoungerThan6 = 0;
  totalFrom6To15 = 0;
  totalFrom16To24 = 0;
  totalFrom25To50 = 0;
  totalFrom51To60 = 0;
  totalOlderThan60 = 0;
  grandTotal = 0;
  
  totalBouiraYoungerThan6 = 0;
  totalBouiraFrom6To15 = 0;
  totalBouiraFrom16To24 = 0;
  totalBouiraFrom25To50 = 0;
  totalBouiraFrom51To60 = 0;
  totalBouiraOlderThan60 = 0;
  totalBouiraGrandTotal = 0;

  totalSourYoungerThan6 = 0;
  totalSourFrom6To15 = 0;
  totalSourFrom16To24 = 0;
  totalSourFrom25To50 = 0;
  totalSourFrom51To60 = 0;
  totalSourOlderThan60 = 0;
  totalSourGrandTotal = 0;

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
    
    this.calculateRowTotal(rowIndex);

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

  calculateRowTotal(rowIndex: number) {
    const row = this.tableData[rowIndex];
    row.total =
      +row.youngerThan6 +
      +row.from6To15 +
      +row.from16To24 +
      +row.from25To50 +
      +row.from51To60 +
      +row.olderThan60;
    this.updateCharts();
  }

  updateBouiraCell(rowIndex: number, field: string, event: Event) {
    const inputElement = event.target as HTMLElement;
    let newValue = inputElement.innerText;
    this.FirstData[rowIndex][field] = +newValue || 0;
    this.calculateBouiraRowTotal(rowIndex);
    this.calculateBouiraTotals();

    if (!['code', 'town'].includes(field)) {
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

  calculateBouiraRowTotal(rowIndex: number) {
    const row = this.FirstData[rowIndex];
    row.total =
      +row.youngerThan6 +
      +row.from6To15 +
      +row.from16To24 +
      +row.from25To50 +
      +row.from51To60 +
      +row.olderThan60;
  }

  calculateBouiraTotals() {
    this.totalBouiraYoungerThan6 = this.FirstData.reduce((sum, row) => sum + +row.youngerThan6, 0);
    this.totalBouiraFrom6To15 = this.FirstData.reduce((sum, row) => sum + +row.from6To15, 0);
    this.totalBouiraFrom16To24 = this.FirstData.reduce((sum, row) => sum + +row.from16To24, 0);
    this.totalBouiraFrom25To50 = this.FirstData.reduce((sum, row) => sum + +row.from25To50, 0);
    this.totalBouiraFrom51To60 = this.FirstData.reduce((sum, row) => sum + +row.from51To60, 0);
    this.totalBouiraOlderThan60 = this.FirstData.reduce((sum, row) => sum + +row.olderThan60, 0);
    this.totalBouiraGrandTotal =
      this.totalBouiraYoungerThan6 +
      this.totalBouiraFrom6To15 +
      this.totalBouiraFrom16To24 +
      this.totalBouiraFrom25To50 +
      this.totalBouiraFrom51To60 +
      this.totalBouiraOlderThan60;
    this.updateCharts();
  }

  updateSourCell(rowIndex: number, field: string, event: Event) {
    const inputElement = event.target as HTMLElement;
    let newValue = inputElement.innerText;
    this.SecondData[rowIndex][field] = +newValue || 0;
    this.calculateSourRowTotal(rowIndex);
    this.calculateSourTotals();

    if (!['code', 'town'].includes(field)) {
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

  calculateSourRowTotal(rowIndex: number) {
    const row = this.SecondData[rowIndex];
    row.total =
      +row.youngerThan6 +
      +row.from6To15 +
      +row.from16To24 +
      +row.from25To50 +
      +row.from51To60 +
      +row.olderThan60;
  }

  calculateSourTotals() {
    this.totalSourYoungerThan6 = this.SecondData.reduce((sum, row) => sum + +row.youngerThan6, 0);
    this.totalSourFrom6To15 = this.SecondData.reduce((sum, row) => sum + +row.from6To15, 0);
    this.totalSourFrom16To24 = this.SecondData.reduce((sum, row) => sum + +row.from16To24, 0);
    this.totalSourFrom25To50 = this.SecondData.reduce((sum, row) => sum + +row.from25To50, 0);
    this.totalSourFrom51To60 = this.SecondData.reduce((sum, row) => sum + +row.from51To60, 0);
    this.totalSourOlderThan60 = this.SecondData.reduce((sum, row) => sum + +row.olderThan60, 0);
    this.totalSourGrandTotal =
      this.totalSourYoungerThan6 +
      this.totalSourFrom6To15 +
      this.totalSourFrom16To24 +
      this.totalSourFrom25To50 +
      this.totalSourFrom51To60 +
      this.totalSourOlderThan60;
    this.updateCharts();
  }

  exportTableToExcel1() {
    const table = document.getElementById('PopulationTable');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'PopulationData.xlsx');
    } else {
      console.error('Table not found!');
    }
  }

  exportTableToExcel2() {
    const table = document.getElementById('detail');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'PopulationData2.xlsx');
    } else {
      console.error('Table not found!');
    }
  }

  // Add these methods to your component class
  importFromExcel1(event: any) {
    const file = event.target.files[0];
    if (!file) return;
  
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const arrayBuffer = fileReader.result as ArrayBuffer;
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        
        // Debug: Log the worksheet to see what's being read
        console.log('Worksheet:', worksheet);
        
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log('Imported Data:', jsonData);
  
        jsonData.forEach((row: any, index: number) => {
          if (index < this.tableData.length) {
            // Debug: Log each row being processed
            console.log('Processing row:', row);
            
            this.tableData[index] = {
              code: row['Code'] ?? this.tableData[index].code,
              state: row['State'] ?? this.tableData[index].state,
              youngerThan6: +row['Younger than 6 years old'] || 0,
              from6To15: +row['From 6 to 15 years old'] || 0,
              from16To24: +row['From 16 to 24 years old'] || 0,
              from25To50: +row['From 25 to 50 years old'] || 0,
              from51To60: +row['From 51 to 60 years old'] || 0,
              olderThan60: +row['Older than 60'] || 0,
              total: 0
            };
            
            this.tableData = [...this.tableData];
            this.calculateRowTotal(index);
            
            console.log('Updated row:', this.tableData[index]);
          }
        });
        
        this.updateCharts();
      } catch (error) {
        console.error('Import error:', error);
      } finally {
        event.target.value = '';
      }
    };
    fileReader.readAsArrayBuffer(file);
  }

importFirstData(event: any) {
  this.importDairaData(event, 'FirstData');
}

importSecondData(event: any) {
  this.importDairaData(event, 'SecondData');
}

private importDairaData(event: any, dataProperty: 'FirstData' | 'SecondData') {
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

      // Update existing rows
      jsonData.forEach((row: any, index: number) => {
        if (index < this[dataProperty].length) {
          this[dataProperty][index] = {
            code: row['Code'] || this[dataProperty][index].code,
            town: row['Town'] || this[dataProperty][index].town,
            youngerThan6: row['Younger than 6 years old'] || 0,
            from6To15: row['From 6 to 15 years old'] || 0,
            from16To24: row['From 16 to 24 years old'] || 0,
            from25To50: row['From 25 to 50 years old'] || 0,
            from51To60: row['From 51 to 60 years old'] || 0,
            olderThan60: row['Older than 60'] || 0,
            total: 0 // Will be recalculated
          };

          // Recalculate row totals
          if (dataProperty === 'FirstData') {
            this.calculateBouiraRowTotal(index);
          } else {
            this.calculateSourRowTotal(index);
          }
        }
      });

      // Recalculate grand totals
      if (dataProperty === 'FirstData') {
        this.calculateBouiraTotals();
      } else {
        this.calculateSourTotals();
      }
    } catch (error) {
      console.error('Error importing data:', error);
    } finally {
      event.target.value = ''; // Reset input
    }
  };
  fileReader.readAsArrayBuffer(file);
}

  toggleTable() {
    this.isTableHidden = !this.isTableHidden;
  }

  toggleDetailTable() {
    this.isDetailTableHidden = !this.isDetailTableHidden;
  }

  onLogout() {
    if (confirm('Are you sure you want to log out?')) {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        LoginComponent.removeActiveUser(currentUser);
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

  combineData() {
    const bouiraData = this.FirstData.map((row) => ({
      code: row.code,
      town: row.town,
      youngerThan6: row.youngerThan6,
      from6To15: row.from6To15,
      from16To24: row.from16To24,
      from25To50: row.from25To50,
      from51To60: row.from51To60,
      olderThan60: row.olderThan60,
      total: row.total,
      daira: 'Bouira',
    }));
  
    const sourData = this.SecondData.map((row) => ({
      code: row.code,
      town: row.town,
      youngerThan6: row.youngerThan6,
      from6To15: row.from6To15,
      from16To24: row.from16To24,
      from25To50: row.from25To50,
      from51To60: row.from51To60,
      olderThan60: row.olderThan60,
      total: row.total,
      daira: 'Sour el ghozlane',
    }));
    return [...bouiraData, ...sourData];
  }

  saveAllData() {
    const combinedData = this.combineData();
    const url = 'http://localhost:8080/api/population/saveAllData';
    this.http.post(url, combinedData).subscribe(
      (response) => {
        console.log('All data saved successfully!', response);
      },
      (error) => {
        console.error('Error saving data:', error);
      }
    );
  }

  ngAfterViewInit() {
    setTimeout(() => this.initCharts(), 100); 
  }

  private initCharts() {
    // Destroy existing charts if they exist
    if (this.stateChart) this.stateChart.destroy();
    if (this.dairaTotalsChart) this.dairaTotalsChart.destroy();

    // State Population Chart
    const stateCtx = document.getElementById('stateChart') as HTMLCanvasElement;
    if (stateCtx) {
      this.stateChart = new Chart(stateCtx.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['<6', '6-15', '16-24', '25-50', '51-60', '>60'],
          datasets: [{
            label: 'State Population',
            data: this.getStateDataTotals(),
            backgroundColor: 'rgba(52, 152, 219, 0.7)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 1
          }]
        },
        options: this.getChartOptions('State Population by Age Group')
      });
    }

    // Daira Grand Totals Chart
    const dairaCtx = document.getElementById('dairaTotalsChart') as HTMLCanvasElement;
    if (dairaCtx) {
      this.dairaTotalsChart = new Chart(dairaCtx.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Bouira', 'Sour el ghozlane'],
          datasets: [{
            label: 'Total Population',
            data: [this.totalBouiraGrandTotal, this.totalSourGrandTotal],
            backgroundColor: [
              'rgba(46, 204, 113, 0.7)',
              'rgba(155, 89, 182, 0.7)'
            ],
            borderColor: [
              'rgba(46, 204, 113, 1)',
              'rgba(155, 89, 182, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: this.getChartOptions('Daira Total Population Comparison')
      });
    }
  }

  private getStateDataTotals(): number[] {
    return [
      this.tableData.reduce((sum, row) => sum + +row.youngerThan6, 0),
      this.tableData.reduce((sum, row) => sum + +row.from6To15, 0),
      this.tableData.reduce((sum, row) => sum + +row.from16To24, 0),
      this.tableData.reduce((sum, row) => sum + +row.from25To50, 0),
      this.tableData.reduce((sum, row) => sum + +row.from51To60, 0),
      this.tableData.reduce((sum, row) => sum + +row.olderThan60, 0)
    ];
  }

  private getChartOptions(title: string): any {
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
          },
          padding: {
            top: 10,
            bottom: 20
          }
        },
        legend: {
          display: title.includes('State'), 
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
          },
          ticks: {
            precision: 0
          }
        },
        x: {
          title: {
            display: true,
            text: title.includes('State') ? 'Age Groups' : 'Daira',
            font: {
              weight: 'bold'
            }
          }
        }
      }
    };
  }

  private updateCharts() {
    if (this.stateChart) {
      this.stateChart.data.datasets[0].data = this.getStateDataTotals();
      this.stateChart.update();
    }
    if (this.dairaTotalsChart) {
      this.dairaTotalsChart.data.datasets[0].data = [
        this.totalBouiraGrandTotal, 
        this.totalSourGrandTotal
      ];
      this.dairaTotalsChart.update();
    }
  }
}