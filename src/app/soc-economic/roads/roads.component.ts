import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './roads.component.html',
  styleUrls: ['./roads.component.css'],
  standalone: false,
})

export class RoadsComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private typeChart: any;
  private networkChart: any;

  constructor(private http: HttpClient, private router: Router) {}
                 
  tableData: any[] = [
    {
      code: '',
      state: '',
      totalRoadNetworkLength: 0,
      highwayCrossingLength: 0,
      nationalRoadsLength: 0,
      wilayaRoadsLength: 0,
      municipalRoadsLength: 0,
      tracksLength: 0,
    },
  ];

  FirstData: any[] = [
    {
     code: '',
     state: '',
     totalRoadNetworkLength: 0,
     highwayCrossingLength: 0,
     nationalRoadsLength: 0,
     wilayaRoadsLength: 0,
     municipalRoadsLength: 0,
     tracksLength: 0,
    },
    {
     code: '',
     state: '',
     totalRoadNetworkLength: 0,
     highwayCrossingLength: 0,
     nationalRoadsLength: 0,
     wilayaRoadsLength: 0,
     municipalRoadsLength: 0,
     tracksLength: 0,
    },
  ];

  SecondData: any[] = [
    {
     code: '',
      state: '',
      totalRoadNetworkLength: 0,
      highwayCrossingLength: 0,
      nationalRoadsLength: 0,
      wilayaRoadsLength: 0,
      municipalRoadsLength: 0,
      tracksLength: 0,
    },
    {
     code: '',
     state: '',
     totalRoadNetworkLength: 0,
     highwayCrossingLength: 0,
     nationalRoadsLength: 0,
     wilayaRoadsLength: 0,
     municipalRoadsLength: 0,
     tracksLength: 0,
    },
  ];
  
  FirsttotalRoadNetworkLength = 0;
  FirsthighwayCrossingLength = 0;
  FirstnationalRoadsLength = 0;
  FirstwilayaRoadsLength = 0;
  FirstmunicipalRoadsLength = 0;
  FirsttracksLength = 0;


  SecondtotalRoadNetworkLength = 0;
  SecondhighwayCrossingLength = 0;
  SecondnationalRoadsLength = 0;
  SecondwilayaRoadsLength = 0;
  SecondmunicipalRoadsLength = 0;
  SecondtracksLength = 0;

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
    }, 0);
  }

  private initCharts() {
    this.initStateChart();
    this.initTypeChart();
    this.initNetworkChart();
  }

  private initStateChart() {
    const ctx = document.getElementById('stateChart') as HTMLCanvasElement;
    this.stateChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Road Network', 'Highway Crossing', 'National Roads', 'Wilaya Roads', 'Municipal Roads', 'Tracks'],
        datasets: [{
          label: 'State Total',
          data: this.getStateDataTotals(),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Roads Overview')
    });
  }

  private initTypeChart() {
    const ctx = document.getElementById('typeChart') as HTMLCanvasElement;
    this.typeChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Highway Crossing', 'National Roads', 'Wilaya Roads', 'Municipal Roads', 'Tracks'],
        datasets: [{
          data: [
            this.tableData.reduce((sum, row) => sum + row.highwayCrossingLength, 0),
            this.tableData.reduce((sum, row) => sum + row.nationalRoadsLength, 0),
            this.tableData.reduce((sum, row) => sum + row.wilayaRoadsLength, 0),
            this.tableData.reduce((sum, row) => sum + row.municipalRoadsLength, 0),
            this.tableData.reduce((sum, row) => sum + row.tracksLength, 0)
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Road Type Distribution')
    });
  }

  private initNetworkChart() {
    const ctx = document.getElementById('networkChart') as HTMLCanvasElement;
    this.networkChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Road Network Length'],
        datasets: [{
          label: 'Total Length (km)',
          data: [this.tableData.reduce((sum, row) => sum + row.totalRoadNetworkLength, 0)],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: this.getChartOptions('Total Road Network Length')
    });
  }

  private getStateDataTotals(): number[] {
    return [
      this.tableData.reduce((sum, row) => sum + row.totalRoadNetworkLength, 0),
      this.tableData.reduce((sum, row) => sum + row.highwayCrossingLength, 0),
      this.tableData.reduce((sum, row) => sum + row.nationalRoadsLength, 0),
      this.tableData.reduce((sum, row) => sum + row.wilayaRoadsLength, 0),
      this.tableData.reduce((sum, row) => sum + row.municipalRoadsLength, 0),
      this.tableData.reduce((sum, row) => sum + row.tracksLength, 0)
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
            text: 'Length (km)'
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
        this.tableData.reduce((sum, row) => sum + row.highwayCrossingLength, 0),
        this.tableData.reduce((sum, row) => sum + row.nationalRoadsLength, 0),
        this.tableData.reduce((sum, row) => sum + row.wilayaRoadsLength, 0),
        this.tableData.reduce((sum, row) => sum + row.municipalRoadsLength, 0),
        this.tableData.reduce((sum, row) => sum + row.tracksLength, 0)
      ];
      this.typeChart.update();
    }

    if (this.networkChart) {
      this.networkChart.data.datasets[0].data = [this.tableData.reduce((sum, row) => sum + row.totalRoadNetworkLength, 0)];
      this.networkChart.update();
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
  this.FirsttotalRoadNetworkLength = this.FirstData.reduce((sum, row) => sum + +row.totalRoadNetworkLength, 0);
  this.FirsthighwayCrossingLength = this.FirstData.reduce((sum, row) => sum + +row.highwayCrossingLength, 0);
  this.FirstnationalRoadsLength = this.FirstData.reduce((sum, row) => sum + +row.nationalRoadsLength, 0);
  this.FirstwilayaRoadsLength = this.FirstData.reduce((sum, row) => sum + +row.wilayaRoadsLength, 0);
  this.FirstmunicipalRoadsLength = this.FirstData.reduce((sum, row) => sum + +row.municipalRoadsLength, 0);
  this.FirsttracksLength = this.FirstData.reduce((sum, row) => sum + +row.tracksLength, 0);              
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
 this.SecondtotalRoadNetworkLength = this.SecondData.reduce((sum, row) => sum + +row.totalRoadNetworkLength, 0);
 this.SecondhighwayCrossingLength = this.SecondData.reduce((sum, row) => sum + +row.highwayCrossingLength, 0);
 this.SecondnationalRoadsLength = this.SecondData.reduce((sum, row) => sum + +row.nationalRoadsLength, 0);
 this.SecondwilayaRoadsLength = this.SecondData.reduce((sum, row) => sum + +row.wilayaRoadsLength, 0);
 this.SecondmunicipalRoadsLength = this.SecondData.reduce((sum, row) => sum + +row.municipalRoadsLength, 0);
 this.SecondtracksLength = this.SecondData.reduce((sum, row) => sum + +row.tracksLength, 0);
}
exportTableToExcel1() {
  const table = document.getElementById('PopulationTable'); // Get the table by ID
  if (table) {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
    XLSX.writeFile(wb, 'Roads.xlsx'); // Export the workbook as an Excel file
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
    XLSX.writeFile(wb, 'Roads.xlsx'); // Export the workbook as an Excel file
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
    totalRoadNetworkLength: row.totalRoadNetworkLength,
    highwayCrossingLength: row.highwayCrossingLength,
    nationalRoadsLength: row.nationalRoadsLength,
    wilayaRoadsLength: row.wilayaRoadsLength,
    municipalRoadsLength: row.municipalRoadsLength,
    tracksLength: row.tracksLength,
    daira: 'Bouira', // Add a 'daira' field to identify the source
  }));
  
  const secondData = this.SecondData.map((row) => ({
    code: row.code,
    town: row.town,
    totalRoadNetworkLength: row.totalRoadNetworkLength,
    highwayCrossingLength: row.highwayCrossingLength,
    nationalRoadsLength: row.nationalRoadsLength,
    wilayaRoadsLength: row.wilayaRoadsLength,
    municipalRoadsLength: row.municipalRoadsLength,
    tracksLength: row.tracksLength,
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
}