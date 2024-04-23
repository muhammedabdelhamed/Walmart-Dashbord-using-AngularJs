import { Component, Input , OnInit} from '@angular/core';
import { IOrders } from '../../models/iorders';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-order-card',
    templateUrl: './order-card.component.html',
    styleUrl: './order-card.component.scss',
    standalone: true,
    imports: [RouterLink]
})
export class OrderCardComponent {
  @Input() order : IOrders = {} as IOrders;

  date : Date 
  postDate : string = ""
  constructor (){
  }
  ngOnInit(): void {
    console.log(this.order.createdAt)
    this.date = new Date(this.order.createdAt)

    console.log(this.date.toLocaleDateString('en-US' , { year: 'numeric', month: 'long', day: 'numeric' }))
    this.postDate = this.date.toLocaleDateString('en-US' , { year: 'numeric', month: 'long', day: 'numeric' })
  }
  
}
