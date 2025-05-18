import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-population-table',
  templateUrl: './urban-n-suburban.component.html',
  styleUrls: ['./urban-n-suburban.component.css'],
  standalone: false,
})

export class UrbanNSuburbanComponent {
  isTableHidden = false;
   isDetailTableHidden = false;
   constructor(private http: HttpClient, private router: Router) {}
               
        tableData: any[] = [
          {
            code: '',
            state: '',
            NumUrbanStations: 0,
            numPassengers: 0,
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
      exportTableToExcel() {
            const table = document.getElementById('PopulationTable'); // Get the table by ID
            if (table) {
              const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
              const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
              XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
              XLSX.writeFile(wb, 'Urban&Suburban.xlsx'); // Export the workbook as an Excel file
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