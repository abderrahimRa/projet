import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Tourism {
  id: number;
  state_id: number;
  code: string;
  state: string;
  hotels: number;
  bedCapacity: number;
  touristArrivals: number;
  averageStay: number;
}

@Injectable({
  providedIn: 'root',
})
export class TourismService {
  private endpoint = 'tourism';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Tourism[]> {
    return this.apiService.getAll<Tourism>(this.endpoint);
  }

  getById(id: number): Observable<Tourism> {
    return this.apiService.getById<Tourism>(this.endpoint, id);
  }

  getByStateId(stateId: number): Observable<Tourism[]> {
    return this.apiService.query<Tourism>(this.endpoint, { state_id: stateId });
  }

  create(data: Omit<Tourism, 'id'>): Observable<Tourism> {
    return this.apiService.create<Tourism>(this.endpoint, data as Tourism);
  }

  update(id: number, data: Partial<Tourism>): Observable<Tourism> {
    return this.apiService.update<Tourism>(this.endpoint, id, data as Tourism);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
