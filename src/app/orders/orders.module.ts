import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderItemComponent } from './order-list/order-item/order-item.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditOrderComponent } from './edit-order/edit-order.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      { path: 'new', component: CreateOrderComponent },
      { path: ':id', component: OrderDetailComponent },
      { path: ':id/edit', component: EditOrderComponent },
    ],
  },
];

@NgModule({
  declarations: [
    OrdersComponent,
    OrderListComponent,
    OrderItemComponent,
    OrderDetailComponent,
    CreateOrderComponent,
    EditOrderComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class OrdersModule {}
