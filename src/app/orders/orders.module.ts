import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderItemComponent } from './order-list/order-item/order-item.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [{ path: ':id', component: OrderDetailComponent }],
  },
];

@NgModule({
  declarations: [
    OrdersComponent,
    OrderListComponent,
    OrderItemComponent,
    OrderDetailComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OrdersModule {}
