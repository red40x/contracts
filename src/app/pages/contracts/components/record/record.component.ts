import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { ApiService, Contract } from '../../../../shared/services/api';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit, OnDestroy {

  recordForm: FormGroup;
  private activeRouteParams: Params;
  public contract: Contract;
  public title: string;
  private subscriptions$: Subscription;
  private recordId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscriptions$ = new Subscription();
    this.recordForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      age: new FormControl('', [
        Validators.min(1),
        Validators.max(100)
      ]),
      nickname: new FormControl(''),
      employee: new FormControl(''),
    });

    this.subscriptions$.add(
      this.activatedRoute.queryParams
      .pipe(
        tap( params => this.activeRouteParams = params)
      )
      .subscribe()
    );

    this.subscriptions$.add(
      this.activatedRoute.params
      .pipe(
        map(({id}) => {
          this.recordId = id;
          return id;
        }),
        tap(() => this.title = 'Создание новой записи'),
        filter(id => !!id),
        tap(() => this.title = 'Редактирование записи'),
        switchMap(id => this.apiService.getContractItem(id)),
        tap(response => this.contract = response),
        tap(() => {
          this.recordForm.get('name').setValue(this.contract.name);
          this.recordForm.get('name').updateValueAndValidity();
          this.recordForm.get('age').setValue(this.contract.age);
          this.recordForm.get('age').updateValueAndValidity();
          this.recordForm.get('nickname').setValue(this.contract.nickname);
          this.recordForm.get('nickname').updateValueAndValidity();
          this.recordForm.get('employee').setValue(this.contract.employee);
          this.recordForm.get('employee').updateValueAndValidity();
        })
      )
      .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  onSubmit() {
    if (this.recordForm.valid) {
      const subData = this.recordForm.value;
      if (this.recordId) {
        subData.type = this.contract.type;
        this.subscriptions$.add(
          this.apiService.putContractItem(this.recordId, subData)
            .pipe(
              tap(() => this.goToList())
            )
            .subscribe()
        );
      } else {
        subData.id = Math.round(Math.random() * 1000);
        subData.type = this.activeRouteParams.type;
        this.subscriptions$.add(
          this.apiService.postContractItem(subData)
            .pipe(
              tap(() => this.goToList())
            )
            .subscribe()
        );
      }
    }
  }

  onCancel() {
    this.goToList();
  }

  goToList() {
    this.router.navigate(['/contracts/list'], {
      queryParams: {
        type: this.activeRouteParams.type
      }
    });
  }
}
