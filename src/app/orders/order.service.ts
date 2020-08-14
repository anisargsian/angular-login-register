import { Order } from '../models/order';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DBEndpoints } from '../enums/db-endpoints';

@Injectable()
export class OrderService {
  orders =  new BehaviorSubject<Order[]>([]);

  constructor(private http: HttpClient, private router: Router) {}

  fetchOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(DBEndpoints.Orders);
  }

  getOrder(id: number): Order {
    return this.orders.getValue().find(order => order.id === id);
  }

  updateOrders(orders: Order[]): void {
    this.http.put(
      DBEndpoints.Orders,
      orders
    ).subscribe((res: Order[]) => {
      this.orders.next(res);
    },
    err => {
      console.log('error creating order', + err);
    }
    );
  }

  deleteOrder(id: number): void {
    const orders = this.orders.getValue().filter(order => order.id !== id);
    this.updateOrders(orders);
  }
}
