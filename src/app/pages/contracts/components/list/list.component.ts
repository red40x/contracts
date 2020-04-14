import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { ApiService, Contract } from '../../../../shared/services/api';
import { DialogConfirmComponent } from '../dialog-confirm';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  public displayedColumns: string[] = ['name', 'age', 'nickname', 'employee', 'action'];
  public contractData = new MatTableDataSource<Contract>();

  private activeRouteParams: Params;
  private subscriptions$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    public confirmDialog: MatDialog,
    private router: Router
  ) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    // создаем экземпляр Subscription для завершения подписок при ngOnDestroy()
    this.subscriptions$ = new Subscription();

    // начальная сортировка таблицы
    this.sort.direction = 'asc';
    this.sort.active = 'name';
    this.contractData.sort = this.sort;

    // получаем значение get параметров из url и список договоров из базы данных
    this.subscriptions$.add(
      this.activatedRoute.queryParams
        .pipe(
          map(({type}) => type),
          tap(type => this.activeRouteParams = type),
          switchMap(type => this.apiService.getContractItems(type)),
          tap(response => this.contractData.data = response)
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    // отписываемся от всех подписок
    this.subscriptions$.unsubscribe();
  }

  /**
   * Удаление элемента таблицы договоров
   * @param id - уникальный идентификатов элемента таблыцы договоров
   */
  onDeleteContract(id: number) {
    // вызываем модальный диалог с вопросом
    const confirmDialogRef = this.confirmDialog.open(
      DialogConfirmComponent, {
        width: '250px',
        data: {
          title: 'Удалить запиcь?',
          cancelButtonTitle: 'Отмена',
          confirmButtonTitle: 'Удалить'
        }
      });

    // получаем результат из модального диалога с вопросом
    this.subscriptions$.add(
      confirmDialogRef.afterClosed()
        .pipe(
          filter(result => !!result),
          switchMap(() => this.apiService.deleteContractItem(id)),
          tap(() => this.contractData.data = this.contractData.data.filter(item => item.id !== id))
        )
        .subscribe()
    );
  }

  /**
   * Переход на страницу создания нового договра
   */
  onCreateContract() {
    this.router.navigate(
      ['/contracts/record/'],
      {
        queryParams: {
          type: this.activeRouteParams
        }
      }
    );
  }

  /**
   * Переход на страницу редактирования договра
   * @param id - уникальный идентификатор элемента таблыцы договоров
   */
  onUpdateContract(id: number) {
    this.router.navigate(
      ['/contracts/record/', id],
      {
        queryParams: {
          type: this.activeRouteParams
        }
      }
    );
  }
}
