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

  displayedColumns: string[] = ['name', 'age', 'nickname', 'employee', 'action'];
  contractData = new MatTableDataSource<Contract>();
  activeRouteParams: Params;
  private subscriptions$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    public confirmDialog: MatDialog,
    private router: Router
  ) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit(): void {
    this.subscriptions$ = new Subscription();
    this.sort.direction = 'asc';
    this.sort.active = 'name';
    this.contractData.sort = this.sort;
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
    this.subscriptions$.unsubscribe();
  }

  onDeleteContract(id: number) {
    const confirmDialogRef = this.confirmDialog.open(
      DialogConfirmComponent, {
        width: '250px',
        data: {
          title: 'Удалить запиcь?',
          cancelButtonTitle: 'Отмена',
          confirmButtonTitle: 'Удалить'
        }
      });

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
