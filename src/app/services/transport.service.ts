import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface Roads {
  id: number;
  state_id: number;
  code: string;
  state: string;
  pavedRoads: number;
  unpavedRoads: number;
  nationalHighways: number;
  roadDensity: number;
}

export interface Airports {
  id: number;
  state_id: number;
  code: string;
  state: string;
  airportName: string;
  passengers: number;
  runways: number;
  international: boolean;
}

export interface RailwayNetwork {
  id: number;
  state_id: number;
  code: string;
  state: string;
  trackLength: number;
  stations: number;
  passengerTraffic: number;
}

export interface Ports {
  id: number;
  state_id: number;
  code: string;
  state: string;
  portName: string;
  cargoVolume: number;
  containers: number;
  passengers: number;
}

export interface UrbanAndSuburban {
  id: number;
  state_id: number;
  code: string;
  state: string;
  busLines: number;
  tramLines: number;
  metroLines: number;
  dailyRides: number;
}

@Injectable({
  providedIn: 'root',
})
export class TransportService {
  private baseEndpoint = 'transport';

  constructor(private apiService: ApiService) {}

  // Roads
  getAllRoads(): Observable<Roads[]> {
    return this.apiService.getAll<Roads>(`${this.baseEndpoint}/roads`);
  }

  getRoadById(id: number): Observable<Roads> {
    return this.apiService.getById<Roads>(`${this.baseEndpoint}/roads`, id);
  }

  getRoadsByStateId(stateId: number): Observable<Roads[]> {
    return this.apiService.query<Roads>(`${this.baseEndpoint}/roads`, {
      state_id: stateId,
    });
  }

  // Airports
  getAllAirports(): Observable<Airports[]> {
    return this.apiService.getAll<Airports>(`${this.baseEndpoint}/airports`);
  }

  getAirportById(id: number): Observable<Airports> {
    return this.apiService.getById<Airports>(
      `${this.baseEndpoint}/airports`,
      id
    );
  }

  getAirportsByStateId(stateId: number): Observable<Airports[]> {
    return this.apiService.query<Airports>(`${this.baseEndpoint}/airports`, {
      state_id: stateId,
    });
  }

  // Railways
  getAllRailways(): Observable<RailwayNetwork[]> {
    return this.apiService.getAll<RailwayNetwork>(
      `${this.baseEndpoint}/railwayNetwork`
    );
  }

  getRailwayById(id: number): Observable<RailwayNetwork> {
    return this.apiService.getById<RailwayNetwork>(
      `${this.baseEndpoint}/railwayNetwork`,
      id
    );
  }

  getRailwaysByStateId(stateId: number): Observable<RailwayNetwork[]> {
    return this.apiService.query<RailwayNetwork>(
      `${this.baseEndpoint}/railwayNetwork`,
      { state_id: stateId }
    );
  }

  // Ports
  getAllPorts(): Observable<Ports[]> {
    return this.apiService.getAll<Ports>(`${this.baseEndpoint}/ports`);
  }

  getPortById(id: number): Observable<Ports> {
    return this.apiService.getById<Ports>(`${this.baseEndpoint}/ports`, id);
  }

  getPortsByStateId(stateId: number): Observable<Ports[]> {
    return this.apiService.query<Ports>(`${this.baseEndpoint}/ports`, {
      state_id: stateId,
    });
  }

  // Urban Transport
  getAllUrbanTransport(): Observable<UrbanAndSuburban[]> {
    return this.apiService.getAll<UrbanAndSuburban>(
      `${this.baseEndpoint}/urbanAndSuburban`
    );
  }

  getUrbanTransportById(id: number): Observable<UrbanAndSuburban> {
    return this.apiService.getById<UrbanAndSuburban>(
      `${this.baseEndpoint}/urbanAndSuburban`,
      id
    );
  }

  getUrbanTransportByStateId(stateId: number): Observable<UrbanAndSuburban[]> {
    return this.apiService.query<UrbanAndSuburban>(
      `${this.baseEndpoint}/urbanAndSuburban`,
      { state_id: stateId }
    );
  }
}
