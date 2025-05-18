import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-population-table',
  templateUrl: './industrial-zone.component.html',
  styleUrls: ['./industrial-zone.component.css'],
  standalone: false,
})

export class IndustrialComponent {
  isTableHidden = false;
   isDetailTableHidden = false;

   constructor(private http: HttpClient, private router: Router) {}
      
     tableData: any[] = [
       {
         code: '',
         state: '',
         numIndZone: 0,
         totalArea: 0,
         occupiedArea: 0,
         totalEnterp: 0,
         activeEnterp: 0,
       },
       
     ];
     
      // Data model for Daira: Bouira
      FirstData: any[] = [
       {
        code: '',
        state: '',
        numIndZone: 0,
        totalArea: 0,
        occupiedArea: 0,
        totalEnterp: 0,
        activeEnterp: 0,
       },
       {
        code: '',
        state: '',
        numIndZone: 0,
        totalArea: 0,
        occupiedArea: 0,
        totalEnterp: 0,
        activeEnterp: 0,
       },
     ];
   
     // Data model for Daira: Sour el ghozlane
     SecondData: any[] = [
       {
        code: '',
         state: '',
         numIndZone: 0,
         totalArea: 0,
         occupiedArea: 0,
         totalEnterp: 0,
         activeEnterp: 0,
       },
       {
        code: '',
        state: '',
        numIndZone: 0,
        totalArea: 0,
        occupiedArea: 0,
        totalEnterp: 0,
        activeEnterp: 0,
       },
     ];
     
     // Totals for Daira: Bouira
     FirstNumIndZone = 0;
     FirstTotalArea = 0;
     FirstOccupiedArea = 0;
     FirstTotalEnterp = 0;
     FirstActiveEnterp = 0;
   
     // Totals for Daira: Sour el ghozlane
     SecondNumIndZone = 0;
     SecondTotalArea = 0;
     SecondOccupiedArea = 0;
     SecondTotalEnterp = 0;
     SecondActiveEnterp = 0;

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
  
    // Calculate totals for Daira: Bouira
    calculateFirstTotals() {
      this.FirstNumIndZone = this.FirstData.reduce((sum, row) => sum + +row.numIndZone, 0);
      this.FirstTotalArea = this.FirstData.reduce((sum, row) => sum + +row.totalArea, 0);
      this.FirstOccupiedArea = this.FirstData.reduce((sum, row) => sum + +row.occupiedArea, 0);
      this.FirstTotalEnterp = this.FirstData.reduce((sum, row) => sum + +row.totalEnterp, 0);
      this.FirstActiveEnterp = this.FirstData.reduce((sum, row) => sum + +row.activeEnterp, 0);       
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
      this.SecondNumIndZone = this.SecondData.reduce((sum, row) => sum + +row.numIndZone, 0);
      this.SecondTotalArea = this.SecondData.reduce((sum, row) => sum + +row.totalArea, 0);
      this.SecondOccupiedArea = this.SecondData.reduce((sum, row) => sum + +row.occupiedArea, 0);
      this.SecondTotalEnterp = this.SecondData.reduce((sum, row) => sum + +row.totalEnterp, 0);
      this.SecondActiveEnterp = this.SecondData.reduce((sum, row) => sum + +row.activeEnterp, 0);       
}
    exportTableToExcel1() {
      const table = document.getElementById('PopulationTable'); // Get the table by ID
      if (table) {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
        const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
        XLSX.writeFile(wb, 'IndustrialZone.xlsx'); // Export the workbook as an Excel file
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
        XLSX.writeFile(wb, 'IndustrialZone.xlsx'); // Export the workbook as an Excel file
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
      numIndZone: row.numIndZone,
      totalArea: row.totalArea,
      occupiedArea: row.occupiedArea,
      totalEnterp: row.totalEnterp,
      activeEnterp: row.activeEnterp,
      daira: 'Bouira', // Add a 'daira' field to identify the source
    }));
  
    const secondData = this.SecondData.map((row) => ({
      code: row.code,
      town: row.town,
      numIndZone: row.numIndZone,
      totalArea: row.totalArea,
      occupiedArea: row.occupiedArea,
      totalEnterp: row.totalEnterp,
      activeEnterp: row.activeEnterp,
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