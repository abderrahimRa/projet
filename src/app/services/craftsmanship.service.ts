import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Craftsmanship {
  id: number;
  state_id: number;
  code: string;
  state: string;
  workshopsNumber: number;
  artisansNumber: number;
  annualRevenue: number;
}

@Injectable({
  providedIn: 'root',
})
export class CraftsmanshipService {
  private endpoint = 'craftsmanship';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Craftsmanship[]> {
    return this.apiService.getAll<Craftsmanship>(this.endpoint);
  }

  getById(id: number): Observable<Craftsmanship> {
    return this.apiService.getById<Craftsmanship>(this.endpoint, id);
  }

  getByStateId(stateId: number): Observable<Craftsmanship[]> {
    return this.apiService.query<Craftsmanship>(this.endpoint, {
      state_id: stateId,
    });
  }

  create(data: Omit<Craftsmanship, 'id'>): Observable<Craftsmanship> {
    return this.apiService.create<Craftsmanship>(
      this.endpoint,
      data as Craftsmanship
    );
  }

  update(id: number, data: Partial<Craftsmanship>): Observable<Craftsmanship> {
    return this.apiService.update<Craftsmanship>(
      this.endpoint,
      id,
      data as Craftsmanship
    );
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
