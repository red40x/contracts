import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

export interface MenuItem {
  name: string;
  queryParams?: string;
  subMenuItems?: MenuItem[];
}

export interface Contract {
  id: number;
  type: string;
  name: string;
  age?: number;
  nickname?: string;
  employee: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getMenuItems(): Observable<MenuItem[]> {
    return this.httpClient.get<MenuItem[]>(
      `${this.API}/menu-items`
    ).pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getContractItems(type: string): Observable<Contract[]> {
    let params = new HttpParams();
    params = params.append('type', type);
    return this.httpClient.get<Contract[]>(
      `${this.API}/contracts`,
      {
        params
      }
    ).pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  postContractItem(contract: Contract): Observable<Contract> {
    return this.httpClient.post<Contract>(
      `${this.API}/contracts`,
      contract
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  putContractItem(id: number, contract: Contract): Observable<Contract> {
    return this.httpClient.put<Contract>(
      `${this.API}/contracts/${id}`,
      contract
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  deleteContractItem(id: number): Observable<any> {
    return this.httpClient.delete<void>(
      `${this.API}/contracts/${id}`
    ).pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getContractItem(id: number): Observable<Contract> {
    return this.httpClient.get<Contract>(
      `${this.API}/contracts/${id}`
    ).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
