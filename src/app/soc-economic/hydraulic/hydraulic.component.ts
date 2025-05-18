import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-population-table',
  templateUrl: './hydraulic.component.html',
  styleUrls: ['./hydraulic.component.css'],
  standalone: false,
})
export class HydraulicComponent {
  isTableHidden = false;
  isDetailTableHidden = false;
  constructor(private http: HttpClient, private router: Router) {}
              
       tableData: any[] = [
         {
           code: '',
           state: '',
           numBarrages: 0,
           barragesCapacity: 0,
           numHillReservoirs: 0,
           hillReservoirsCapacity: 0,
           numDrillings: 0,
           drillingCapacity: 0,
           avgWaterSupplyPerCapita: 0,
           connectionRate: 0,
           networkLossRate: 0,
           numWastewaterPlants: 0,
           wastewaterConnectionRate: 0,
           numDesalinationPlants: 0,
           desalinationCapacity: 0,
  
         },
       ];
       FirstData: any[] = [
        {
          code: '',
          state: '',
          localisation: 0,
          productionCost: 0,
          commissioningYear: 0,
          productionCapacity: 0,
          beneficiaryStates: 0,
          numBeneficiaryDistricts: 0,
          Observations: 0,
 
        },
      ];
      SecondData: any[] = [
        {
          code: '',
          state: '',
          localisation: 0,
          productionCost: 0,
          commissioningYear: 0,
          productionCapacity: 0,
          beneficiaryStates: 0,
          numBeneficiaryDistricts: 0,
          Observations: 0,
 
        },
      ];
     
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

    updateSecondCell(rowIndex: number, field: string, event: Event) {
      const inputElement = event.target as HTMLElement;
      let newValue = inputElement.innerText;
     this.SecondData[rowIndex][field] = +newValue || 0;
   
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

     exportTableToExcel() {
           const table = document.getElementById('PopulationTable'); // Get the table by ID
           if (table) {
             const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
             const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
             XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
             XLSX.writeFile(wb, 'Forests.xlsx'); // Export the workbook as an Excel file
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

   // Function to save both FirstData and SecondData tables to the backend
   saveAllData() {
     const url = 'https://your-backend-api.com/save-all-data'; // Replace with your backend API endpoint

     // Create an object containing both tables' data
     const allData = {
       firstTable: this.FirstData,
       secondTable: this.SecondData
     };

     // Send both tables' data to the backend
     this.http.post(url, allData).subscribe(
       (response) => {
         console.log('All data saved successfully!', response);
       },
       (error) => {
         console.error('Error saving all data:', error);
       }
     );
   }
}