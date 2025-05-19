import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Youth {
  id: number;
  state_id: number;
  code: string;
  state: string;
  youthCenters: number;
  youthOrganizations: number;
  programParticipants: number;
}

@Injectable({
  providedIn: 'root',
})
export class YouthService {
  private endpoint = 'youth';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Youth[]> {
    return this.apiService.getAll<Youth>(this.endpoint);
  }

  getById(id: number): Observable<Youth> {
    return this.apiService.getById<Youth>(this.endpoint, id);
  }

  getByStateId(stateId: number): Observable<Youth[]> {
    return this.apiService.query<Youth>(this.endpoint, { state_id: stateId });
  }

  create(data: Omit<Youth, 'id'>): Observable<Youth> {
    return this.apiService.create<Youth>(this.endpoint, data as Youth);
  }

  update(id: number, data: Partial<Youth>): Observable<Youth> {
    return this.apiService.update<Youth>(this.endpoint, id, data as Youth);
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
