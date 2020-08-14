import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  order: Order;
  id: number;
  editOrderForm = new FormGroup({
    name: new FormControl(this.order && this.order.name || '', Validators.required),
    description: new FormControl(this.order && this.order.description || '', Validators.required)
  });

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = Number(params.id);
        if (this.orderService.orders.getValue().length === 0) {
          this.orderService.fetchOrders().subscribe(res => {
            this.orderService.orders.next(res);
            this.order = this.orderService.getOrder(this.id);
            this.editOrderForm = new FormGroup({
              name: new FormControl(this.order && this.order.name, Validators.required),
              description: new FormControl(this.order && this.order.description, Validators.required)
            });
          });
        } else {
          this.order = this.orderService.getOrder(this.id);
          this.editOrderForm = new FormGroup({
            name: new FormControl(this.order.name, Validators.required),
            description: new FormControl(this.order.description, Validators.required)
          });
        }
      }
    );

  }

  onSubmit(): void {
    if (!this.editOrderForm.valid) {
      return;
    }

    const { value } = this.editOrderForm;
    this.order.name = value.name;
    this.order.description = value.description;

    const orders = this.orderService.orders.getValue();
    const orderIndex = orders.findIndex(order => order.id === this.order.id);
    orders.splice(orderIndex, 1, this.order);
    this.orderService.updateOrders(orders);
  }

}
