import {Component, OnDestroy, OnInit} from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import { ApiService, MenuItem } from '../../../../shared/services/api';

@Component({
  selector: 'app-left-side-nav',
  templateUrl: './left-side-nav.component.html',
  styleUrls: ['./left-side-nav.component.scss']
})
export class LeftSideNavComponent implements OnInit, OnDestroy {

  treeControl = new NestedTreeControl<MenuItem>(menuItem => menuItem.subMenuItems);

  public actRouteParams$: Observable<Params>;
  public menuItems: MenuItem[];
  private subscriptions$: Subscription;

  public activeRouteParams: Params;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.subscriptions$ = new Subscription();
    this.actRouteParams$ = this.activatedRoute.queryParams;
    this.subscriptions$.add(
      this.actRouteParams$
        .pipe(
          tap( params => this.activeRouteParams = params)
        )
        .subscribe()
    );
    this.subscriptions$.add(
      this.apiService.getMenuItems()
        .pipe(
          tap( response => {
            this.menuItems = response;
            this.setMenuItemsExpand(response);
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

  setActive(queryParams: Params, node: MenuItem): boolean {
    if (queryParams.type) {
      return queryParams.type === node.queryParams;
    }
    return false;
  }

  setMenuItemsExpand(menuItems: MenuItem[]): boolean {
    let i = 0;
    while (i < menuItems.length) {
      if (menuItems[i].subMenuItems) {
        if (this.setMenuItemsExpand(menuItems[i].subMenuItems)) {
          this.treeControl.expand(menuItems[i]);
          return true;
        }
      } else {
        if (this.activeRouteParams && this.activeRouteParams.type && this.activeRouteParams.type === menuItems[i].queryParams) {
          return true;
        }
      }
      i++;
    }
  }

  hasChild = (_: number, menuItem: MenuItem) => {
    return !!menuItem.subMenuItems && menuItem.subMenuItems.length > 0;
  }

  onNodeRouteClick(menuItem: MenuItem) {
    if (menuItem.queryParams) {
      this.router.navigate(
        ['/contracts/list'],
        {queryParams : {type: menuItem.queryParams}}
      );
    }
  }
}
