import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Agriculture {
  id: number;
  state_id: number;
  code: string;
  state: string;
  totalAgriArea: number;
  totalSAU: number;
  irrigatedSAU: number;
  SAUontotalAgriArea: number;
  irrigatedSAUontotalSAU: number;
  Cereals: number;
  Dairy: number;
}

@Injectable({
  providedIn: 'root',
})
export class AgricultureService {
  private endpoint = 'agriculture';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Agriculture[]> {
    return this.apiService.getAll<Agriculture>(this.endpoint);
  }

  getById(id: number): Observable<Agriculture> {
    return this.apiService.getById<Agriculture>(this.endpoint, id);
  }

  getByStateId(stateId: number): Observable<Agriculture[]> {
    return this.apiService.query<Agriculture>(this.endpoint, {
      state_id: stateId,
    });
  }

  create(data: Omit<Agriculture, 'id'>): Observable<Agriculture> {
    return this.apiService.create<Agriculture>(
      this.endpoint,
      data as Agriculture
    );
  }

  update(id: number, data: Partial<Agriculture>): Observable<Agriculture> {
    return this.apiService.update<Agriculture>(
      this.endpoint,
      id,
      data as Agriculture
    );
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
