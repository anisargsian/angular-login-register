import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../../models/order';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() order: Order;
  @Input() id: number;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  onDeleteOrder(id: number): void {
    this.orderService.deleteOrder(id);
  }

}
