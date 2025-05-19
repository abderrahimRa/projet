import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { LoginComponent } from '@app/login/login.component';
import { StateService, State } from '@app/services/state.service';
import {
  PopulationService,
  Population,
} from '@app/services/population.service';
import { forkJoin } from 'rxjs';
declare const Chart: any;

@Component({
  selector: 'app-population-table',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.css'],
  standalone: false,
})
export class GeneralDataComponent implements OnInit {
  isTableHidden = false;
  isDetailTableHidden = false;
  private stateChart: any;
  private dairaTotalsChart: any;
  states: State[] = [];
  populations: Population[] = [];
  isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private stateService: StateService,
    private populationService: PopulationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    // Use forkJoin to make parallel API calls
    forkJoin({
      states: this.stateService.getAll(),
      populations: this.populationService.getAll(),
    }).subscribe({
      next: (result) => {
        this.states = result.states;
        this.populations = result.populations;
        this.populateTableData();
        this.populateDetailData();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.isLoading = false;
      },
    });
  }

  populateTableData(): void {
    // Clear existing data
    this.TableData = [];

    // Map population data to the TableData format
    this.populations.forEach((population) => {
      const state = this.states.find((s) => s.id === population.state_id);
      if (state) {
        this.TableData.push({
          code: parseInt(state.code.replace('ST', '')),
          town: state.name,
          area: 0, // This information might not be in the population data
          urbanHabitants: population.urbanPopulation,
          ruralHabitants: population.ruralPopulation,
          totalHabitants: population.totalPopulation,
          density: population.populationDensity,
        });
      }
    });

    // Recalculate totals
    this.calculateTotals();
  }

  populateDetailData(): void {
    // Clear existing data
    this.FirstData = [];
    this.SecondData = [];

    // For this example, we'll split the data between the two dairas
    // based on some condition (like odd/even or first half/second half)
    const halfLength = Math.ceil(this.populations.length / 2);

    this.populations.forEach((population, index) => {
      const state = this.states.find((s) => s.id === population.state_id);
      if (!state) return;

      const dataObj = {
        code: parseInt(state.code.replace('ST', '')),
        town: state.name,
        area: 0, // This might need to come from another source
        urbanHabitants: population.urbanPopulation,
        ruralHabitants: population.ruralPopulation,
        totalHabitants: population.totalPopulation,
        density: population.populationDensity,
      };

      // Assign to FirstData or SecondData based on index
      if (index < halfLength) {
        this.FirstData.push(dataObj);
      } else {
        this.SecondData.push(dataObj);
      }
    });

    // Calculate totals for both datasets
    this.calculateFirstTotals();
    this.calculateSecondTotals();
  }

  calculateTotals(): void {
    this.totalArea = this.TableData.reduce((sum, row) => sum + +row.area, 0);
    this.totalUrbanHabitants = this.TableData.reduce(
      (sum, row) => sum + +row.urbanHabitants,
      0
    );
    this.totalRuralHabitants = this.TableData.reduce(
      (sum, row) => sum + +row.ruralHabitants,
      0
    );
    this.totalTotalHabitants =
      this.totalUrbanHabitants + this.totalRuralHabitants;
    this.totalDensity =
      this.totalArea !== 0 ? this.totalTotalHabitants / this.totalArea : 0;
  }

  get isAdmin(): boolean {
    return localStorage.getItem('userRole') === 'admin';
  }
  TableData: any[] = [
    {
      code: 0,
      town: '',
      area: 0,
      urbanHabitants: 0,
      ruralHabitants: 0,
      totalHabitants: 0,
      density: 0,
    },
  ];
  FirstData: any[] = [
    {
      code: 0,
      town: '',
      area: 0,
      urbanHabitants: 0,
      ruralHabitants: 0,
      totalHabitants: 0,
      density: 0,
    },
    {
      code: 0,
      town: '',
      area: 0,
      urbanHabitants: 0,
      ruralHabitants: 0,
      totalHabitants: 0,
      density: 0,
    },
  ];

  SecondData: any[] = [
    {
      code: 0,
      town: '',
      area: 0,
      urbanHabitants: 0,
      ruralHabitants: 0,
      totalHabitants: 0,
      density: 0,
    },
    {
      code: 0,
      town: '',
      area: 0,
      urbanHabitants: 0,
      ruralHabitants: 0,
      totalHabitants: 0,
      density: 0,
    },
  ];

  totalArea = 0;
  totalUrbanHabitants = 0;
  totalRuralHabitants = 0;
  totalTotalHabitants = 0;
  totalDensity = 0;
  // Totals for Daira 1
  totalFirstArea = 0;
  totalFirstUrbanHabitants = 0;
  totalFirstRuralHabitants = 0;
  totalFirstTotalHabitants = 0;
  totalFirstDensity = 0;
  // Totals for Daira 2
  totalSecondArea = 0;
  totalSecondUrbanHabitants = 0;
  totalSecondRuralHabitants = 0;
  totalSecondTotalHabitants = 0;
  totalSecondDensity = 0;

  updateCell(rowIndex: number, field: string, event: Event) {
    const inputElement = event.target as HTMLElement;
    let newValue = inputElement.innerText;

    if (field === 'code') {
      const numericValue = parseInt(newValue) || 0;
      this.TableData[rowIndex][field] = numericValue;
      newValue = numericValue.toString();
    } else if (field === 'town') {
      this.TableData[rowIndex][field] = newValue;
    } else {
      const numericValue = parseFloat(newValue) || 0;
      this.TableData[rowIndex][field] = numericValue;
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
    const row = this.TableData[rowIndex];
    row.totalHabitants = +row.urbanHabitants + +row.ruralHabitants;
    row.density = (row.area !== 0 ? row.totalHabitants / +row.area : 0).toFixed(
      4
    );
    this.updateCharts();
  }

  // Update a cell in Daira: Bouira
  updateFirstCell(rowIndex: number, field: string, event: Event) {
    const inputElement = event.target as HTMLElement;
    let newValue = inputElement.innerText;

    if (field === 'code') {
      const numericValue = parseInt(newValue) || 0;
      this.FirstData[rowIndex][field] = numericValue;
      newValue = numericValue.toString();
    } else if (field === 'town') {
      this.FirstData[rowIndex][field] = newValue;
    } else {
      const numericValue = parseFloat(newValue) || 0;
      this.FirstData[rowIndex][field] = numericValue;
      newValue = numericValue.toString();
    }

    this.calculateFirstRowTotal(rowIndex);

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
  calculateFirstRowTotal(rowIndex: number) {
    const row = this.FirstData[rowIndex];
    row.totalHabitants = +row.urbanHabitants + +row.ruralHabitants;
    row.density = (row.area !== 0 ? row.totalHabitants / +row.area : 0).toFixed(
      4
    );
  }

  // Calculate totals for Daira: Bouira
  calculateFirstTotals() {
    this.totalFirstArea = this.FirstData.reduce(
      (sum, row) => sum + +row.area,
      0
    );
    this.totalFirstUrbanHabitants = this.FirstData.reduce(
      (sum, row) => sum + +row.urbanHabitants,
      0
    );
    this.totalFirstRuralHabitants = this.FirstData.reduce(
      (sum, row) => sum + +row.ruralHabitants,
      0
    );
    this.totalFirstTotalHabitants =
      this.totalFirstUrbanHabitants + this.totalFirstRuralHabitants;
    this.totalFirstDensity =
      this.totalFirstTotalHabitants / this.totalFirstArea || 0;
    this.updateCharts();
  }

  // Update a cell in Daira: Sour el ghozlane
  updateSecondCell(rowIndex: number, field: string, event: Event) {
    const inputElement = event.target as HTMLElement;
    let newValue = inputElement.innerText;

    if (field === 'code') {
      const numericValue = parseInt(newValue) || 0;
      this.SecondData[rowIndex][field] = numericValue;
      newValue = numericValue.toString();
    } else if (field === 'town') {
      this.SecondData[rowIndex][field] = newValue;
    } else {
      const numericValue = parseFloat(newValue) || 0;
      this.SecondData[rowIndex][field] = numericValue;
      newValue = numericValue.toString();
    }

    this.calculateSecondRowTotal(rowIndex);

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
  calculateSecondRowTotal(rowIndex: number) {
    const row = this.SecondData[rowIndex];
    row.totalHabitants = +row.urbanHabitants + +row.ruralHabitants;
    row.density = (row.area !== 0 ? row.totalHabitants / +row.area : 0).toFixed(
      4
    );
  }

  // Calculate totals for Sour el ghozlane
  calculateSecondTotals() {
    this.totalSecondArea = this.SecondData.reduce(
      (sum, row) => sum + +row.area,
      0
    );
    this.totalSecondUrbanHabitants = this.SecondData.reduce(
      (sum, row) => sum + +row.urbanHabitants,
      0
    );
    this.totalSecondRuralHabitants = this.SecondData.reduce(
      (sum, row) => sum + +row.ruralHabitants,
      0
    );
    this.totalSecondTotalHabitants =
      this.totalSecondUrbanHabitants + this.totalSecondRuralHabitants;
    this.totalSecondDensity =
      this.totalSecondTotalHabitants / this.totalSecondArea || 0;
    this.updateCharts();
  }
  exportTableToExcel1() {
    const table = document.getElementById('PopulationTable'); // Get the table by ID
    if (table) {
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // Convert table to worksheet
      const wb: XLSX.WorkBook = XLSX.utils.book_new(); // Create a new workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Add the worksheet to the workbook
      XLSX.writeFile(wb, 'GeneralData.xlsx'); // Export the workbook as an Excel file
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
      XLSX.writeFile(wb, 'GeneralData.xlsx'); // Export the workbook as an Excel file
    } else {
      console.error('Table not found!');
    }
  }

  importFromExcel1(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const arrayBuffer = fileReader.result as ArrayBuffer;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Clear existing data
      this.TableData = [];

      // Import new data
      jsonData.forEach((row: any) => {
        this.TableData.push({
          code: row['Code'] || 0,
          town: row['State'] || row['Town'] || '',
          area: row['Area ( km 2)'] || 0,
          urbanHabitants: row['Urbain (Habitants)'] || 0,
          ruralHabitants: row['Rural (Habitants)'] || 0,
          totalHabitants: row['Total (Habitants)'] || 0,
          density: row['Density(Habitant/km 2)'] || 0,
        });
      });

      // Recalculate totals
      this.TableData.forEach((row, index) => {
        this.calculateRowTotal(index);
      });
    };
    fileReader.readAsArrayBuffer(file);
  }

  importFromExcel2(event: any) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const arrayBuffer = fileReader.result as ArrayBuffer;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Clear existing data
      this.FirstData = [];
      this.SecondData = [];

      // Import new data
      jsonData.forEach((row: any) => {
        const newRow = {
          code: row['Code'] || 0,
          town: row['Town'] || '',
          area: row['Area ( km 2)'] || 0,
          urbanHabitants: row['Urbain (Habitants)'] || 0,
          ruralHabitants: row['Rural (Habitants)'] || 0,
          totalHabitants: row['Total (Habitants)'] || 0,
          density: row['Density(Habitant/km 2)'] || 0,
        };

        if (row['Daira'] === 'Bouira') {
          this.FirstData.push(newRow);
        } else if (row['Daira'] === 'Sour el ghozlane') {
          this.SecondData.push(newRow);
        }
      });

      // Recalculate totals
      this.calculateFirstTotals();
      this.calculateSecondTotals();
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
    // For each item in TableData, update the corresponding population record
    this.TableData.forEach((row) => {
      const state = this.states.find((s) => s.name === row.town);
      if (state) {
        const populationRecord = this.populations.find(
          (p) => p.state_id === state.id
        );
        if (populationRecord) {
          // Update the population data
          const updatedData: Partial<Population> = {
            urbanPopulation: row.urbanHabitants,
            ruralPopulation: row.ruralHabitants,
            totalPopulation: row.totalHabitants,
            populationDensity: parseFloat(row.density),
          };

          this.populationService
            .update(populationRecord.id, updatedData)
            .subscribe({
              next: (response) => {
                console.log(
                  `Data saved successfully for ${state.name}!`,
                  response
                );
              },
              error: (error) => {
                console.error(`Error saving data for ${state.name}:`, error);
              },
            });
        }
      }
    });
  }

  combineData() {
    // Add a 'daira' field to each row in FirstData and SecondData
    const firstData = this.FirstData.map((row) => ({
      code: row.code,
      town: row.town,
      area: row.area,
      urbanHabitants: row.urbanHabitants,
      ruralHabitants: row.ruralHabitants,
      totalHabitants: row.totalHabitants,
      density: row.density,
      daira: 'Bouira', // Add a 'daira' field to identify the source
    }));

    const secondData = this.SecondData.map((row) => ({
      code: row.code,
      town: row.town,
      area: row.area,
      urbanHabitants: row.urbanHabitants,
      ruralHabitants: row.ruralHabitants,
      totalHabitants: row.totalHabitants,
      density: row.density,
      daira: 'Sour el ghozlane', // Add a 'daira' field to identify the source
    }));
    return [...firstData, ...secondData];
  }
  saveAllData() {
    const combinedData = this.combineData(); // Combine data from both tables

    // Process each item in the combined data
    combinedData.forEach((row) => {
      const state = this.states.find((s) => s.name === row.town);
      if (state) {
        const populationRecord = this.populations.find(
          (p) => p.state_id === state.id
        );
        if (populationRecord) {
          // Update the population data
          const updatedData: Partial<Population> = {
            urbanPopulation: row.urbanHabitants,
            ruralPopulation: row.ruralHabitants,
            totalPopulation: row.totalHabitants,
            populationDensity: parseFloat(row.density),
          };

          this.populationService
            .update(populationRecord.id, updatedData)
            .subscribe({
              next: (response) => {
                console.log(
                  `Data saved successfully for ${state.name}!`,
                  response
                );
              },
              error: (error) => {
                console.error(`Error saving data for ${state.name}:`, error);
              },
            });
        }
      }
    });
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
          labels: ['Area', 'Urban', 'Rural', 'Total', 'Density'],
          datasets: [
            {
              label: 'General Data',
              data: this.getStateDataTotals(),
              backgroundColor: 'rgba(52, 152, 219, 0.7)',
              borderColor: 'rgba(52, 152, 219, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: this.getChartOptions('General Data Overview'),
      });
    }

    // Daira Grand Totals Chart
    const dairaCtx = document.getElementById(
      'dairaTotalsChart'
    ) as HTMLCanvasElement;
    if (dairaCtx) {
      this.dairaTotalsChart = new Chart(dairaCtx.getContext('2d'), {
        type: 'bar',
        data: {
          labels: ['Bouira', 'Sour el ghozlane'],
          datasets: [
            {
              label: 'Total Area',
              data: [this.totalFirstArea, this.totalSecondArea],
              backgroundColor: 'rgba(46, 204, 113, 0.7)',
              borderColor: 'rgba(46, 204, 113, 1)',
              borderWidth: 1,
            },
            {
              label: 'Total Population',
              data: [
                this.totalFirstTotalHabitants,
                this.totalSecondTotalHabitants,
              ],
              backgroundColor: 'rgba(155, 89, 182, 0.7)',
              borderColor: 'rgba(155, 89, 182, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: this.getChartOptions('Daira Comparison'),
      });
    }
  }

  private getStateDataTotals(): number[] {
    return [
      this.TableData.reduce((sum, row) => sum + +row.area, 0),
      this.TableData.reduce((sum, row) => sum + +row.urbanHabitants, 0),
      this.TableData.reduce((sum, row) => sum + +row.ruralHabitants, 0),
      this.TableData.reduce((sum, row) => sum + +row.totalHabitants, 0),
      this.TableData.reduce((sum, row) => sum + +row.density, 0) /
        this.TableData.length,
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
            weight: 'bold',
          },
          padding: {
            top: 10,
            bottom: 20,
          },
        },
        legend: {
          position: 'top',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Value',
            font: {
              weight: 'bold',
            },
          },
        },
        x: {
          title: {
            display: true,
            text: title.includes('Daira') ? 'Daira' : 'Metrics',
            font: {
              weight: 'bold',
            },
          },
        },
      },
    };
  }

  private updateCharts() {
    if (this.stateChart) {
      this.stateChart.data.datasets[0].data = this.getStateDataTotals();
      this.stateChart.update();
    }
    if (this.dairaTotalsChart) {
      this.dairaTotalsChart.data.datasets[0].data = [
        this.totalFirstArea,
        this.totalSecondArea,
      ];
      this.dairaTotalsChart.data.datasets[1].data = [
        this.totalFirstTotalHabitants,
        this.totalSecondTotalHabitants,
      ];
      this.dairaTotalsChart.update();
    }
  }
  importFirstData(event: any) {
    this.importDairaData(event, 'FirstData');
  }

  importSecondData(event: any) {
    this.importDairaData(event, 'SecondData');
  }

  private importDairaData(
    event: any,
    dataProperty: 'FirstData' | 'SecondData'
  ) {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const arrayBuffer = fileReader.result as ArrayBuffer;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Clear existing data
      this[dataProperty] = [];

      // Import new data
      jsonData.forEach((row: any) => {
        this[dataProperty].push({
          code: row['Code'] || 0,
          town: row['Town'] || '',
          area: row['Area ( km 2)'] || 0,
          urbanHabitants: row['Urbain (Habitants)'] || 0,
          ruralHabitants: row['Rural (Habitants)'] || 0,
          totalHabitants: 0, // Will be calculated
          density: 0, // Will be calculated
        });
      });

      // Recalculate totals and row values
      this[dataProperty].forEach((row, index) => {
        if (dataProperty === 'FirstData') {
          this.calculateFirstRowTotal(index);
        } else {
          this.calculateSecondRowTotal(index);
        }
      });

      if (dataProperty === 'FirstData') {
        this.calculateFirstTotals();
      } else {
        this.calculateSecondTotals();
      }

      // Reset file input
      event.target.value = '';
    };

    fileReader.readAsArrayBuffer(file);
  }
}
