import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Education {
  id: number;
  state_id: number;
  code: string;
  state: string;
  primarySchools: number;
  secondarySchools: number;
  universities: number;
  numTeachers: number;
  numStudents: number;
  studentTeacherRatio: number;
}

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private endpoint = 'education';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<Education[]> {
    return this.apiService.getAll<Education>(this.endpoint);
  }

  getById(id: number): Observable<Education> {
    return this.apiService.getById<Education>(this.endpoint, id);
  }

  getByStateId(stateId: number): Observable<Education[]> {
    return this.apiService.query<Education>(this.endpoint, {
      state_id: stateId,
    });
  }

  create(data: Omit<Education, 'id'>): Observable<Education> {
    return this.apiService.create<Education>(this.endpoint, data as Education);
  }

  update(id: number, data: Partial<Education>): Observable<Education> {
    return this.apiService.update<Education>(
      this.endpoint,
      id,
      data as Education
    );
  }

  delete(id: number): Observable<void> {
    return this.apiService.delete(this.endpoint, id);
  }
}
