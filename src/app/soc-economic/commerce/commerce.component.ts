import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { LoginComponent } from '@app/login/login.component';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './commerce.component.html',
  styleUrls: ['./commerce.component.css'],
  standalone: false,
})

export class CommerceComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private marketChart: any;
  private qualityChart: any;

  constructor(private http: HttpClient, private router: Router) {}

  tableData: any[] = [
    {
      code: 0,
      state: '',
      numWholesaleMarkets: 0,
      numRetailMarkets: 0,
      numConvenienceMarkets: 0,
      numCoveredMarkets: 0,
      observedDeficit: 0,
      numQualityControlLabs: 0,
    },
  ];
  
  // Data model for Daira: Bouira
  FirstData: any[] = [
    {
     code: 0,
     state: '',
     numWholesaleMarkets: 0,
      numRetailMarkets: 0,
      numConvenienceMarkets: 0,
      numCoveredMarkets: 0,
      observedDeficit: 0,
      numQualityControlLabs: 0,
    },
    {
     code: 0,
     state: '',
     numWholesaleMarkets: 0,
      numRetailMarkets: 0,
      numConvenienceMarkets: 0,
      numCoveredMarkets: 0,
      observedDeficit: 0,
      numQualityControlLabs: 0,
    },
  ];

  // Data model for Daira: Sour el ghozlane
  SecondData: any[] = [
    {
     code: 0,
      state: '',
      numWholesaleMarkets: 0,
      numRetailMarkets: 0,
      numConvenienceMarkets: 0,
      numCoveredMarkets: 0,
      observedDeficit: 0,
      numQualityControlLabs: 0,
    },
    {
     code: 0,
     state: '',
     numWholesaleMarkets: 0,
      numRetailMarkets: 0,
      numConvenienceMarkets: 0,
      numCoveredMarkets: 0,
      observedDeficit: 0,
      numQualityControlLabs: 0,
    },
  ];
  
  // Totals for Daira: Bouira
  FirstnumWholesaleMarkets= 0;
  FirstnumRetailMarkets= 0;
  FirstnumConvenienceMarkets= 0;
  FirstnumCoveredMarkets= 0;
  FirstobservedDeficit= 0;
  FirstnumQualityControlLabs= 0;

  // Totals for Daira: Sour el ghozlane
  SecondnumWholesaleMarkets= 0;
  SecondnumRetailMarkets= 0;
  SecondnumConvenienceMarkets= 0;
  SecondnumCoveredMarkets= 0;
  SecondobservedDeficit= 0;
  SecondnumQualityControlLabs= 0;

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
   
    if (field === 'code') {
      const numericValue = parseInt(newValue) || 0;
      this.FirstData[rowIndex][field] = numericValue;
      newValue = numericValue.toString();
    } else if (field === 'state') {
      this.FirstData[rowIndex][field] = newValue;
    } else {
    const numericValue = parseFloat(newValue) || 0;
    this.FirstData[rowIndex][field] = numericValue;
    newValue = numericValue.toString(); 
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
    this.FirstnumWholesaleMarkets = this.FirstData.reduce((sum, row) => sum + +row.numWholesaleMarkets, 0);
    this.FirstnumRetailMarkets = this.FirstData.reduce((sum, row) => sum + +row.numRetailMarkets, 0);
    this.FirstnumConvenienceMarkets = this.FirstData.reduce((sum, row) => sum + +row.numConvenienceMarkets, 0);
    this.FirstnumCoveredMarkets = this.FirstData.reduce((sum, row) => sum + +row.numCoveredMarkets, 0);
    this.FirstobservedDeficit = this.FirstData.reduce((sum, row) => sum + +row.observedDeficit, 0);    
    this.FirstnumQualityControlLabs = this.FirstData.reduce((sum, row) => sum + +row.numQualityControlLabs, 0);
    this.updateCharts();
  }

  updateSecondCell(rowIndex: number, field: string, event: Event) {
    const inputElement = event.target as HTMLElement;
    let newValue = inputElement.innerText;
   
    if (field === 'code') {
      const numericValue = parseInt(newValue) || 0;
      this.SecondData[rowIndex][field] = numericValue;
      newValue = numericValue.toString();
    } else if (field === 'state') {
      this.SecondData[rowIndex][field] = newValue;
    } else {
    const numericValue = parseFloat(newValue) || 0;
    this.SecondData[rowIndex][field] = numericValue;
    newValue = numericValue.toString(); 
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
    this.SecondnumWholesaleMarkets = this.SecondData.reduce((sum, row) => sum + +row.numWholesaleMarkets, 0);
    this.SecondnumRetailMarkets = this.SecondData.reduce((sum, row) => sum + +row.numRetailMarkets, 0);
    this.SecondnumConvenienceMarkets = this.SecondData.reduce((sum, row) => sum + +row.numConvenienceMarkets, 0);
    this.SecondnumCoveredMarkets = this.SecondData.reduce((sum, row) => sum + +row.numCoveredMarkets, 0);
    this.SecondobservedDeficit = this.SecondData.reduce((sum, row) => sum + +row.observedDeficit, 0);    
    this.SecondnumQualityControlLabs = this.SecondData.reduce((sum, row) => sum + +row.numQualityControlLabs, 0);
    this.updateCharts();
  }

  exportTableToExcel1() {
    const table = document.getElementById('PopulationTable'); // Get the table by ID
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
      XLSX.writeFile(wb, 'Commerce.xlsx'); // Export the workbook as an Excel file
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
      XLSX.writeFile(wb, 'Commerce.xlsx'); // Export the workbook as an Excel file
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
      numWholesaleMarkets: row.numWholesaleMarkets,
      numRetailMarkets: row.numRetailMarkets,
      numConvenienceMarkets: row.numConvenienceMarkets,
      numCoveredMarkets: row.numCoveredMarkets,
      observedDeficit: row.observedDeficit,
      numQualityControlLabs: row.numQualityControlLabs,
      daira: 'Bouira', // Add a 'daira' field to identify the source
    }));
    
    const secondData = this.SecondData.map((row) => ({
      code: row.code,
      town: row.town,
      numWholesaleMarkets: row.numWholesaleMarkets,
      numRetailMarkets: row.numRetailMarkets,
      numConvenienceMarkets: row.numConvenienceMarkets,
      numCoveredMarkets: row.numCoveredMarkets,
      observedDeficit: row.observedDeficit,
      numQualityControlLabs: row.numQualityControlLabs,
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
    this.initMarketChart();
    this.initQualityChart();
  }

  private initStateChart() {
    const ctx = document.getElementById('stateChart') as HTMLCanvasElement;
    this.stateChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Wholesale Markets', 'Retail Markets', 'Convenience Markets', 'Covered Markets', 'Observed Deficit', 'Quality Control Labs'],
        datasets: [{
          label: 'State Total',
          data: this.getStateDataTotals(),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Commerce Overview')
    });
  }

  private initMarketChart() {
    const ctx = document.getElementById('marketChart') as HTMLCanvasElement;
    this.marketChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Wholesale Markets', 'Retail Markets', 'Convenience Markets', 'Covered Markets'],
        datasets: [{
          data: [
            this.tableData.reduce((sum, row) => sum + row.numWholesaleMarkets, 0),
            this.tableData.reduce((sum, row) => sum + row.numRetailMarkets, 0),
            this.tableData.reduce((sum, row) => sum + row.numConvenienceMarkets, 0),
            this.tableData.reduce((sum, row) => sum + row.numCoveredMarkets, 0)
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Market Distribution')
    });
  }

  private initQualityChart() {
    const ctx = document.getElementById('qualityChart') as HTMLCanvasElement;
    this.qualityChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Quality Control Labs'],
        datasets: [{
          label: 'Number of Labs',
          data: [this.tableData.reduce((sum, row) => sum + row.numQualityControlLabs, 0)],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Quality Control')
    });
  }

  private getStateDataTotals(): number[] {
    return [
      this.tableData.reduce((sum, row) => sum + row.numWholesaleMarkets, 0),
      this.tableData.reduce((sum, row) => sum + row.numRetailMarkets, 0),
      this.tableData.reduce((sum, row) => sum + row.numConvenienceMarkets, 0),
      this.tableData.reduce((sum, row) => sum + row.numCoveredMarkets, 0),
      this.tableData.reduce((sum, row) => sum + row.observedDeficit, 0),
      this.tableData.reduce((sum, row) => sum + row.numQualityControlLabs, 0)
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

    if (this.marketChart) {
      this.marketChart.data.datasets[0].data = [
        this.tableData.reduce((sum, row) => sum + row.numWholesaleMarkets, 0),
        this.tableData.reduce((sum, row) => sum + row.numRetailMarkets, 0),
        this.tableData.reduce((sum, row) => sum + row.numConvenienceMarkets, 0),
        this.tableData.reduce((sum, row) => sum + row.numCoveredMarkets, 0)
      ];
      this.marketChart.update();
    }

    if (this.qualityChart) {
      this.qualityChart.data.datasets[0].data = [this.tableData.reduce((sum, row) => sum + row.numQualityControlLabs, 0)];
      this.qualityChart.update();
    }
  }
}