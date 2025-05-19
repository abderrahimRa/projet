import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Energy {
  id: number;
  state_id: number;
  code: string;
  state: string;
  electricityProduction: number;
  electricityConsumption: number;
  renewablePercentage: number;
  powerStations: number;
}

@Injectable({
  providedIn: 'root',
})
export class EnergyService {
  private endpoint = 'energy';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Energy[]> {
    return this.apiService.getAll<Energy>(this.endpoint);
  }

  getById(id: number): Observable<Energy> {
    return this.apiService.getById<Energy>(this.endpoint, id);
  }

  getByStateId(stateId: number): Observable<Energy[]> {
    return this.apiService.query<Energy>(this.endpoint, { state_id: stateId });
  }

  create(data: Omit<Energy, 'id'>): Observable<Energy> {
    return this.apiService.create<Energy>(this.endpoint, data as Energy);
  }

  update(id: number, data: Partial<Energy>): Observable<Energy> {
    return this.apiService.update<Energy>(this.endpoint, id, data as Energy);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
