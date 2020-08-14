import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  order: Order;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = Number(params.id);
        if (this.orderService.orders.getValue().length === 0) {
          this.orderService.fetchOrders().subscribe(res => {
            this.orderService.orders.next(res);
            this.order = this.orderService.getOrder(this.id);
          });
        } else {
          this.order = this.orderService.getOrder(this.id);
        }
      }
    );
  }

}
