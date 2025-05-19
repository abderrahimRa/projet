import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface SocialProtection {
  id: number;
  state_id: number;
  code: string;
  state: string;
  socialCenters: number;
  beneficiaries: number;
  coverageRate: number;
}

@Injectable({
  providedIn: 'root',
})
export class SocialProtectionService {
  private endpoint = 'socialProtection';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<SocialProtection[]> {
    return this.apiService.getAll<SocialProtection>(this.endpoint);
  }

  getById(id: number): Observable<SocialProtection> {
    return this.apiService.getById<SocialProtection>(this.endpoint, id);
  }

  getByStateId(stateId: number): Observable<SocialProtection[]> {
    return this.apiService.query<SocialProtection>(this.endpoint, {
      state_id: stateId,
    });
  }

  create(data: Omit<SocialProtection, 'id'>): Observable<SocialProtection> {
    return this.apiService.create<SocialProtection>(
      this.endpoint,
      data as SocialProtection
    );
  }

  update(
    id: number,
    data: Partial<SocialProtection>
  ): Observable<SocialProtection> {
    return this.apiService.update<SocialProtection>(
      this.endpoint,
      id,
      data as SocialProtection
    );
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
