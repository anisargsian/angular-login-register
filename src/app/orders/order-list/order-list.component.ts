import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from '../order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Order[];
  subscription: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.subscription = this.orderService.ordersChanges.subscribe((orders: Order[]) => {
      this.orders = orders;
    });
    this.orders = this.orderService.getOrders();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
