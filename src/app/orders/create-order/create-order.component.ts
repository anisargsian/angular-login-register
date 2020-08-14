import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderService } from '../order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  createOrderForm: FormGroup;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.createOrderForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    });
  }

  onSubmit(): void {
    if (!this.createOrderForm.valid) {
      return;
    }

    const { value } = this.createOrderForm;
    const orders = this.orderService.orders.getValue() ? this.orderService.orders.getValue() : [];

    const newOrder: Order = {
      name: value.name,
      description: value.description,
      id: orders.length > 0 ? orders[orders.length - 1].id + 1 : 1
    };

    orders.push(newOrder);
    this.orderService.updateOrders(orders);

    this.createOrderForm.reset();
  }

}
