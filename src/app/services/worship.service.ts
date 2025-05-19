import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Worship {
  id: number;
  state_id: number;
  code: string;
  state: string;
  mosques: number;
  churches: number;
  synagogues: number;
  otherPlaces: number;
}

@Injectable({
  providedIn: 'root',
})
export class WorshipService {
  private endpoint = 'worship';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Worship[]> {
    return this.apiService.getAll<Worship>(this.endpoint);
  }

  getById(id: number): Observable<Worship> {
    return this.apiService.getById<Worship>(this.endpoint, id);
  }

  getByStateId(stateId: number): Observable<Worship[]> {
    return this.apiService.query<Worship>(this.endpoint, { state_id: stateId });
  }

  create(data: Omit<Worship, 'id'>): Observable<Worship> {
    return this.apiService.create<Worship>(this.endpoint, data as Worship);
  }

  update(id: number, data: Partial<Worship>): Observable<Worship> {
    return this.apiService.update<Worship>(this.endpoint, id, data as Worship);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
