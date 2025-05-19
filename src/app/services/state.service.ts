import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface State {
  id: number;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private endpoint = 'states';

  constructor(private apiService: ApiService) {}

  getAll(): Observable<State[]> {
    return this.apiService.getAll<State>(this.endpoint);
  }

  getById(id: number): Observable<State> {
    return this.apiService.getById<State>(this.endpoint, id);
  }
}
