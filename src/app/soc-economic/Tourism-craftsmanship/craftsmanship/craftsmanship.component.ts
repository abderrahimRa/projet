import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './craftsmanship.component.html',
  styleUrls: ['./craftsmanship.component.css'],
  standalone: false,
})

export class CraftsmanshipComponent implements AfterViewInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private facilitiesChart: any;
  private artisansChart: any;

  constructor(private http: HttpClient, private router: Router) {}
            
           tableData: any[] = [
             {
               code: '',
               state: '',
               craftRooms: 0,
               craftHouses: 0,
               craftMuseums: 0,
               craftExhibitiongalleries: 0,
               numArtisans: 0,
             },
             
           ];
           
            // Data model for Daira: Bouira
            FirstData: any[] = [
             {
              code: '',
              state: '',
              craftRooms: 0,
               craftHouses: 0,
               craftMuseums: 0,
               craftExhibitiongalleries: 0,
               numArtisans: 0,
             },
             {
              code: '',
              state: '',
              craftRooms: 0,
               craftHouses: 0,
               craftMuseums: 0,
               craftExhibitiongalleries: 0,
               numArtisans: 0,
             },
           ];
         
           // Data model for Daira: Sour el ghozlane
           SecondData: any[] = [
             {
              code: '',
               state: '',
               craftRooms: 0,
               craftHouses: 0,
               craftMuseums: 0,
               craftExhibitiongalleries: 0,
               numArtisans: 0,
             },
             {
              code: '',
              state: '',
              craftRooms: 0,
               craftHouses: 0,
               craftMuseums: 0,
               craftExhibitiongalleries: 0,
               numArtisans: 0,
             },
           ];
           
           // Totals for Daira: Bouira
           FirstcraftRooms = 0;
           FirstcraftHouses = 0;
           FirstcraftMuseums = 0;
           FirstcraftExhibitiongalleries = 0;
           FirstnumArtisans = 0;
         
           // Totals for Daira: Sour el ghozlane
           SecondcraftRooms = 0;
           SecondcraftHouses = 0;
           SecondcraftMuseums = 0;
           SecondcraftExhibitiongalleries = 0;
           SecondnumArtisans = 0;
   
           // Initialize charts after view is ready
           ngAfterViewInit() {
             setTimeout(() => {
               this.initCharts();
             }, 0);
           }

           private initCharts() {
             this.initStateChart();
             this.initFacilitiesChart();
             this.initArtisansChart();
           }

           private initStateChart() {
             const ctx = document.getElementById('stateChart') as HTMLCanvasElement;
             this.stateChart = new Chart(ctx, {
               type: 'bar',
               data: {
                 labels: ['Craft Rooms', 'Craft Houses', 'Craft Museums', 'Exhibition Galleries', 'Artisans'],
                 datasets: [{
                   label: 'State Total',
                   data: this.getStateDataTotals(),
                   backgroundColor: 'rgba(54, 162, 235, 0.5)',
                   borderColor: 'rgba(54, 162, 235, 1)',
                   borderWidth: 1
                 }]
               },
               options: this.getChartOptions('Craftsmanship Overview')
             });
           }

           private initFacilitiesChart() {
             const ctx = document.getElementById('facilitiesChart') as HTMLCanvasElement;
             this.facilitiesChart = new Chart(ctx, {
               type: 'pie',
               data: {
                 labels: ['Craft Rooms', 'Craft Houses', 'Craft Museums', 'Exhibition Galleries'],
                 datasets: [{
                   data: [
                     this.tableData.reduce((sum, row) => sum + row.craftRooms, 0),
                     this.tableData.reduce((sum, row) => sum + row.craftHouses, 0),
                     this.tableData.reduce((sum, row) => sum + row.craftMuseums, 0),
                     this.tableData.reduce((sum, row) => sum + row.craftExhibitiongalleries, 0)
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
               options: this.getChartOptions('Craftsmanship Facilities Distribution')
             });
           }

           private initArtisansChart() {
             const ctx = document.getElementById('artisansChart') as HTMLCanvasElement;
             this.artisansChart = new Chart(ctx, {
               type: 'bar',
               data: {
                 labels: ['Artisans'],
                 datasets: [{
                   label: 'Number of Artisans',
                   data: [this.tableData.reduce((sum, row) => sum + row.numArtisans, 0)],
                   backgroundColor: 'rgba(75, 192, 192, 0.5)',
                   borderColor: 'rgba(75, 192, 192, 1)',
                   borderWidth: 1
                 }]
               },
               options: this.getChartOptions('Artisans Overview')
             });
           }

           private getStateDataTotals(): number[] {
             return [
               this.tableData.reduce((sum, row) => sum + row.craftRooms, 0),
               this.tableData.reduce((sum, row) => sum + row.craftHouses, 0),
               this.tableData.reduce((sum, row) => sum + row.craftMuseums, 0),
               this.tableData.reduce((sum, row) => sum + row.craftExhibitiongalleries, 0),
               this.tableData.reduce((sum, row) => sum + row.numArtisans, 0)
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

             if (this.facilitiesChart) {
               this.facilitiesChart.data.datasets[0].data = [
                 this.tableData.reduce((sum, row) => sum + row.craftRooms, 0),
                 this.tableData.reduce((sum, row) => sum + row.craftHouses, 0),
                 this.tableData.reduce((sum, row) => sum + row.craftMuseums, 0),
                 this.tableData.reduce((sum, row) => sum + row.craftExhibitiongalleries, 0)
               ];
               this.facilitiesChart.update();
             }

             if (this.artisansChart) {
               this.artisansChart.data.datasets[0].data = [this.tableData.reduce((sum, row) => sum + row.numArtisans, 0)];
               this.artisansChart.update();
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
            this.FirstcraftRooms = this.FirstData.reduce((sum, row) => sum + +row.craftRooms, 0);
            this.FirstcraftHouses = this.FirstData.reduce((sum, row) => sum + +row.craftHouses, 0);
            this.FirstcraftMuseums = this.FirstData.reduce((sum, row) => sum + +row.craftMuseums, 0);
            this.FirstcraftExhibitiongalleries = this.FirstData.reduce((sum, row) => sum + +row.craftExhibitiongalleries, 0);
            this.FirstnumArtisans = this.FirstData.reduce((sum, row) => sum + +row.numArtisans, 0);    
                    
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
            this.SecondcraftRooms = this.SecondData.reduce((sum, row) => sum + +row.craftRooms, 0);
            this.SecondcraftHouses = this.SecondData.reduce((sum, row) => sum + +row.craftHouses, 0);
            this.SecondcraftMuseums = this.SecondData.reduce((sum, row) => sum + +row.craftMuseums, 0);
            this.SecondcraftExhibitiongalleries = this.SecondData.reduce((sum, row) => sum + +row.craftExhibitiongalleries, 0);
            this.SecondnumArtisans = this.SecondData.reduce((sum, row) => sum + +row.numArtisans, 0);                     
      }
      exportTableToExcel1() {
            const table = document.getElementById('PopulationTable'); // Get the table by ID
            if (table) {
              const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
              const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
              XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
              XLSX.writeFile(wb, 'Craftsmanship.xlsx'); // Export the workbook as an Excel file
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
              XLSX.writeFile(wb, 'Craftsmanship.xlsx'); // Export the workbook as an Excel file
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
      craftRooms: row.craftRooms,
      craftHouses: row.craftHouses,
      craftMuseums: row.craftMuseums,
      craftExhibitiongalleries: row.craftExhibitiongalleries,
      numArtisans: row.numArtisans,
      daira: 'Bouira', // Add a 'daira' field to identify the source
    }));
    
    const secondData = this.SecondData.map((row) => ({
      code: row.code,
      town: row.town,
      craftRooms: row.craftRooms,
      craftHouses: row.craftHouses,
      craftMuseums: row.craftMuseums,
      craftExhibitiongalleries: row.craftExhibitiongalleries,
      numArtisans: row.numArtisans,
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