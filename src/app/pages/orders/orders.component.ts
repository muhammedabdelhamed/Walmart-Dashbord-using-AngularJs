import { Component , OnInit } from '@angular/core';
import { OrderRequestsService } from '../../services/order-requests.service';
import { Router } from '@angular/router';
import { IOrders } from '../../models/iorders';
import { OrderCardComponent } from '../../components/order-card/order-card.component';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss',
    standalone: true,
    imports: [OrderCardComponent]
})
export class OrdersComponent {
  allOrders : IOrders[] = []

  constructor(private orderService : OrderRequestsService , private router : Router){
  }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next :(data) =>{
        console.log(data.allOrders);
        
        this.allOrders = data.allOrders.reverse()

      },
      error(err) {
        console.log(err);

      },
    })  }

}


