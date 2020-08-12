import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() order: Order;
  @Input() id: number;

  constructor() { }

  ngOnInit(): void {
  }

}
