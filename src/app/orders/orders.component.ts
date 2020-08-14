import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.fetchOrders().subscribe(
      res => {
        this.orderService.orders.next(res);
      }
    );
  }

}
