import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { LoginComponent } from '@app/login/login.component';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './habitat.component.html',
  styleUrls: ['./habitat.component.css'],
  standalone: false,
})
export class HabitatComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private dairaTotalsChart: any;

  constructor(private http: HttpClient, private router: Router) {}
  
  tableData: any[] = [{
    code: '',
    state: '',
    totalHousing: 0,
    urbanHousing: 0,
    ruralHousing: 0,
    numSocialHousing: 0,
    numParticipatoryHousing: 0,
    numRentalSaleHousing: 0,
    developmentalHousing: 0,
    lppHousing: 0,
    numPrecariousHousing: 0,
    housingOccupancyRate: 0,
  }];

  FirstData: any[] = [{
    code: '',
    state: '',
    totalHousing: 0,
    urbanHousing: 0,
    ruralHousing: 0,
    numSocialHousing: 0,
    numParticipatoryHousing: 0,
    numRentalSaleHousing: 0,
    developmentalHousing: 0,
    lppHousing: 0,
    numPrecariousHousing: 0,
    housingOccupancyRate: 0,
  }, {
    code: '',
    state: '',
    totalHousing: 0,
    urbanHousing: 0,
    ruralHousing: 0,
    numSocialHousing: 0,
    numParticipatoryHousing: 0,
    numRentalSaleHousing: 0,
    developmentalHousing: 0,
    lppHousing: 0,
    numPrecariousHousing: 0,
    housingOccupancyRate: 0,
  }];
  
  SecondData: any[] = [{
    code: '',
    state: '',
    totalHousing: 0,
    urbanHousing: 0,
    ruralHousing: 0,
    numSocialHousing: 0,
    numParticipatoryHousing: 0,
    numRentalSaleHousing: 0,
    developmentalHousing: 0,
    lppHousing: 0,
    numPrecariousHousing: 0,
    housingOccupancyRate: 0,
  }, {
    code: '',
    state: '',
    totalHousing: 0,
    urbanHousing: 0,
    ruralHousing: 0,
    numSocialHousing: 0,
    numParticipatoryHousing: 0,
    numRentalSaleHousing: 0,
    developmentalHousing: 0,
    lppHousing: 0,
    numPrecariousHousing: 0,
    housingOccupancyRate: 0,
  }];
  
  FirstotalHousing = 0;
  FirsturbanHousing = 0;
  FirstruralHousing = 0;
  FirstnumSocialHousing = 0;
  FirstnumParticipatoryHousing = 0;
  FirstnumRentalSaleHousing = 0;
  FirstdevelopmentalHousing = 0;
  FirstlppHousing = 0;
  FirstnumPrecariousHousing = 0;
  FirsthousingOccupancyRate = 0;

  SecondtotalHousing = 0;
  SecondurbanHousing = 0;
  SecondruralHousing = 0;
  SecondnumSocialHousing = 0;
  SecondnumParticipatoryHousing = 0;
  SecondnumRentalSaleHousing = 0;
  SeconddevelopmentalHousing = 0;
  SecondlppHousing = 0;
  SecondnumPrecariousHousing = 0;
  SecondhousingOccupancyRate = 0;

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

  calculateFirstTotals() {
    this.FirstotalHousing = this.FirstData.reduce((sum, row) => sum + +row.totalHousing, 0);
    this.FirsturbanHousing = this.FirstData.reduce((sum, row) => sum + +row.urbanHousing, 0);
    this.FirstruralHousing = this.FirstData.reduce((sum, row) => sum + +row.ruralHousing, 0);
    this.FirstnumSocialHousing = this.FirstData.reduce((sum, row) => sum + +row.numSocialHousing, 0);
    this.FirstnumParticipatoryHousing = this.FirstData.reduce((sum, row) => sum + +row.numParticipatoryHousing, 0);
    this.FirstnumRentalSaleHousing = this.FirstData.reduce((sum, row) => sum + +row.numRentalSaleHousing, 0);
    this.FirstdevelopmentalHousing = this.FirstData.reduce((sum, row) => sum + +row.developmentalHousing, 0);
    this.FirstlppHousing = this.FirstData.reduce((sum, row) => sum + +row.lppHousing, 0);
    this.FirstnumPrecariousHousing = this.FirstData.reduce((sum, row) => sum + +row.numPrecariousHousing, 0);
    this.FirsthousingOccupancyRate = this.FirstData.reduce((sum, row) => sum + +row.housingOccupancyRate, 0) / this.FirstData.length;
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

  calculateSecondTotals() {
    this.SecondtotalHousing = this.SecondData.reduce((sum, row) => sum + +row.totalHousing, 0);
    this.SecondurbanHousing = this.SecondData.reduce((sum, row) => sum + +row.urbanHousing, 0);
    this.SecondruralHousing = this.SecondData.reduce((sum, row) => sum + +row.ruralHousing, 0);
    this.SecondnumSocialHousing = this.SecondData.reduce((sum, row) => sum + +row.numSocialHousing, 0);
    this.SecondnumParticipatoryHousing = this.SecondData.reduce((sum, row) => sum + +row.numParticipatoryHousing, 0);
    this.SecondnumRentalSaleHousing = this.SecondData.reduce((sum, row) => sum + +row.numRentalSaleHousing, 0);
    this.SeconddevelopmentalHousing = this.SecondData.reduce((sum, row) => sum + +row.developmentalHousing, 0);
    this.SecondlppHousing = this.SecondData.reduce((sum, row) => sum + +row.lppHousing, 0);
    this.SecondnumPrecariousHousing = this.SecondData.reduce((sum, row) => sum + +row.numPrecariousHousing, 0);
    this.SecondhousingOccupancyRate = this.SecondData.reduce((sum, row) => sum + +row.housingOccupancyRate, 0) / this.SecondData.length;
    this.updateCharts();
  }

  exportTableToExcel1() {
    const table = document.getElementById('PopulationTable');
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'Housing_Summary.xlsx');
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
      XLSX.writeFile(wb, 'Housing_Details.xlsx');
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
    const firstData = this.FirstData.map((row) => ({
      code: row.code,
      state: row.state,
      totalHousing: row.totalHousing,
      urbanHousing: row.urbanHousing,
      ruralHousing: row.ruralHousing,
      numSocialHousing: row.numSocialHousing,
      numParticipatoryHousing: row.numParticipatoryHousing,
      numRentalSaleHousing: row.numRentalSaleHousing,
      developmentalHousing: row.developmentalHousing,
      lppHousing: row.lppHousing,
      numPrecariousHousing: row.numPrecariousHousing,
      housingOccupancyRate: row.housingOccupancyRate,
      daira: 'Bouira',
    }));
    
    const secondData = this.SecondData.map((row) => ({
      code: row.code,
      state: row.state,
      totalHousing: row.totalHousing,
      urbanHousing: row.urbanHousing,
      ruralHousing: row.ruralHousing,
      numSocialHousing: row.numSocialHousing,
      numParticipatoryHousing: row.numParticipatoryHousing,
      numRentalSaleHousing: row.numRentalSaleHousing,
      developmentalHousing: row.developmentalHousing,
      lppHousing: row.lppHousing,
      numPrecariousHousing: row.numPrecariousHousing,
      housingOccupancyRate: row.housingOccupancyRate,
      daira: 'Sour el ghozlane',
    }));
    return [...firstData, ...secondData];
  }

  saveAllData() {
    const combinedData = this.combineData();
    const url = 'https://your-backend-api.com/save-data';
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
    setTimeout(() => this.initCharts(), 100);
  }

  private initCharts() {
    // Destroy existing charts if they exist
    if (this.stateChart) this.stateChart.destroy();
    if (this.dairaTotalsChart) this.dairaTotalsChart.destroy();

    // State Housing Chart
    const stateCtx = document.getElementById('stateChart') as HTMLCanvasElement;
    if (stateCtx) {
      this.stateChart = new Chart(stateCtx.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Total Housing', 'Urban Housing', 'Rural Housing', 'Social Housing', 'Participatory Housing', 'Rental/Sale Housing', 'Developmental Housing', 'LPP Housing', 'Precarious Housing'],
          datasets: [{
            label: 'Housing Statistics',
            data: this.getStateDataTotals(),
            backgroundColor: 'rgba(52, 152, 219, 0.7)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 1
          }]
        },
        options: this.getChartOptions('Housing Overview')
      });
    }

    // Daira Comparison Chart
    const dairaCtx = document.getElementById('dairaTotalsChart') as HTMLCanvasElement;
    if (dairaCtx) {
      this.dairaTotalsChart = new Chart(dairaCtx.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Bouira', 'Sour el ghozlane'],
          datasets: [
            {
              label: 'Total Housing',
              data: [this.FirstotalHousing, this.SecondtotalHousing],
              backgroundColor: 'rgba(46, 204, 113, 0.7)',
              borderColor: 'rgba(46, 204, 113, 1)',
              borderWidth: 1
            },
            {
              label: 'Social Housing',
              data: [this.FirstnumSocialHousing, this.SecondnumSocialHousing],
              backgroundColor: 'rgba(155, 89, 182, 0.7)',
              borderColor: 'rgba(155, 89, 182, 1)',
              borderWidth: 1
            }
          ]
        },
        options: this.getChartOptions('Daira Comparison')
      });
    }
  }

  private getStateDataTotals(): number[] {
    return [
      this.tableData.reduce((sum, row) => sum + +row.totalHousing, 0),
      this.tableData.reduce((sum, row) => sum + +row.urbanHousing, 0),
      this.tableData.reduce((sum, row) => sum + +row.ruralHousing, 0),
      this.tableData.reduce((sum, row) => sum + +row.numSocialHousing, 0),
      this.tableData.reduce((sum, row) => sum + +row.numParticipatoryHousing, 0),
      this.tableData.reduce((sum, row) => sum + +row.numRentalSaleHousing, 0),
      this.tableData.reduce((sum, row) => sum + +row.developmentalHousing, 0),
      this.tableData.reduce((sum, row) => sum + +row.lppHousing, 0),
      this.tableData.reduce((sum, row) => sum + +row.numPrecariousHousing, 0)
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
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Units',
            font: {
              weight: 'bold'
            }
          }
        },
        x: {
          title: {
            display: true,
            text: title.includes('Daira') ? 'Daira' : 'Housing Types',
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
      this.dairaTotalsChart.data.datasets[0].data = [this.FirstotalHousing, this.SecondtotalHousing];
      this.dairaTotalsChart.data.datasets[1].data = [this.FirstnumSocialHousing, this.SecondnumSocialHousing];
      this.dairaTotalsChart.update();
    }
  }
}