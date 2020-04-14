import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Интерфейс для элемента таблицы menuItems
 * @param name - наименование пункта меню
 * @param queryParams - пареметр, для позиционирования на нужном пукте меню - необязательный
 * @param subMenuItems - подчиненные пункты меню - необязательный
 */
export interface MenuItem {
  name: string;
  queryParams?: string;
  subMenuItems?: MenuItem[];
}

/**
 * Интерфейс для элемента таблицы contracts
 * @param id - уникальный код
 * @param type - тип договора
 * @param name - наименование пользователя
 * @param age - возвраст пользователя - необязательный
 * @param nickname - никнейм пользователя - необязательный
 * @param employee - признак сотрудника у пользователя
 */
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

  private API = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  /**
   * Получение элементов бокового меню
   * @return MenuItem - обсервебел возвращающий массив элементов для бокового меню
   */
  getMenuItems(): Observable<MenuItem[]> {
    return this.httpClient.get<MenuItem[]>(
      `${this.API}/menuitems`
    ).pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  /**
   * Получение элементов для таблицы договоров
   * @param type - тип договора
   * @return Contract - обсервебел возвращающий массив элементов для таблицы договоров
   */
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

  /**
   * Создание элемента для таблицы договоров
   * @param contract - элемент таблицы договоров
   * @return Contract - обсервебел возвращающий элемент таблицы договоров
   */
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

  /**
   * Изменение элемента для таблицы договоров
   * @param id - уникальный идентификатор элемента таблыцы договоров
   * @param contract - элемент таблицы договоров
   * @return Contract - обсервебел возвращающий элемент таблицы договоров
   */
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

  /**
   * Удаление элемента таблицы договоров
   * @param id - уникальный идентификатор элемента таблыцы договоров
   */
  deleteContractItem(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.API}/contracts/${id}`
    ).pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  /**
   * Получение элемента таблицы договоров
   * @param id - уникальный идентификатор элемента таблыцы договоров
   * @return Contract - обсервебел возвращающий элемент таблицы договоров
   */
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
