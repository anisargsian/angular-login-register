import { Order } from '../models/order';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {
  ordersChanges = new Subject<Order[]>();
  private orders: Order[] = [];

  constructor(private http: HttpClient) {}

  fetchOrders(): void {
    this.http
      .get<Order[]>('https://ng-course-login-register.firebaseio.com/orders.json')
      .subscribe(res => {
        this.orders = res;
        this.ordersChanges.next([...this.orders]);
      });
  }

  getOrders(): Order[] {
    return [...this.orders];
  }

  getOrder(id: number): Order {
    return this.orders.find(order => order.id === id);
  }
}
