import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderRequestsService } from '../../services/order-requests.service';
import { IOrders } from '../../models/iorders';
import { IPrdsQun } from '../../models/iPrdQun';
import { ProductCardOrderDetailsComponent } from '../product-card-order-details/product-card-order-details.component';
import { NgClass, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrl: './order-details.component.scss',
    standalone: true,
    imports: [FormsModule, NgClass, ProductCardOrderDetailsComponent, CurrencyPipe]
})
export class OrderDetailsComponent {
  date : Date 
  postDate : string = ""
  order 
  statusEdited : boolean = false
  status : string 
  itemsIds : IPrdsQun[]
  constructor(private route: ActivatedRoute ,private orderService : OrderRequestsService , private router : Router){}
  ngOnInit() {


    const routeParams = this.route.snapshot.paramMap;
    const orderIdFromParams = routeParams.get('id');
    this.orderService.getOneOrderById(orderIdFromParams).subscribe({
      next:(data:any) =>{
        this.order = data.order[0]
        this.status = this.order.status
        this.date = new Date(this.order.createdAt)
        this.postDate = this.date.toLocaleDateString('en-US' , { year: 'numeric', month: 'long', day: 'numeric' })
        this.fillItemsIds()
        
             
      },
      error(err) {
        console.log(err);
        
      },
    })
    
  }
  fillItemsIds(){
    this.itemsIds = []
    for(let i = 0 ; i < this.order.items.length ; i++){
      this.itemsIds.push({"id":this.order.items[i]._id ,"quantity" :this.order.items[i].quantity })
    }
    console.log(this.itemsIds);
    
    
  }
  toggleStatus(status: string) {    
    this.orderService.toggleStatus(this.order._id, status , this.order.paymentStatus).subscribe({
      next:(data)=>{
        console.log(data);
        this.statusEdited = !this.statusEdited
        this.ngOnInit()
      },
      error: (err) =>{
        console.log(err);
      }
    })
    
  }
  editStatus() {

    if(this.status == "shipped"){
      console.log("Waiting for Supplier" );
      this.status = "Waiting for Supplier"
      
    }else{
      this.status = "shipped"
    }
    this.statusEdited = !this.statusEdited
    
  }
  cancelOrder(){
    this.orderService.cancelOrder(this.order?._id , this.order?.paymentStatus  ).subscribe({
      next:(data)=>{
        console.log(data);
        this.ngOnInit()
        this.orderCancelPrds()
      },
      error(err) {
        console.log(err);
        
      }
    })
  }
  orderCancelPrds(){
    for(let i = 0 ; i < this.itemsIds.length ; i++){
      this.orderService.orderCanceledPrds(this.itemsIds[i].id , this.itemsIds[i].quantity)
    }
  }

}
