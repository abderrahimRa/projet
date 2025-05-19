import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Population {
  id: number;
  state_id: number;
  code: string;
  state: string;
  totalPopulation: number;
  malePopulation: number;
  femalePopulation: number;
  urbanPopulation: number;
  ruralPopulation: number;
  populationDensity: number;
  birthRate: number;
  deathRate: number;
  naturalIncrease: number;
}

@Injectable({
  providedIn: 'root',
})
export class PopulationService {
  private endpoint = 'population';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Population[]> {
    return this.apiService.getAll<Population>(this.endpoint);
  }

  getById(id: number): Observable<Population> {
    return this.apiService.getById<Population>(this.endpoint, id);
  }

  getByStateId(stateId: number): Observable<Population[]> {
    return this.apiService.query<Population>(this.endpoint, {
      state_id: stateId,
    });
  }

  create(data: Omit<Population, 'id'>): Observable<Population> {
    return this.apiService.create<Population>(
      this.endpoint,
      data as Population
    );
  }

  update(id: number, data: Partial<Population>): Observable<Population> {
    return this.apiService.update<Population>(
      this.endpoint,
      id,
      data as Population
    );
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
