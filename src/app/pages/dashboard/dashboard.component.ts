import { Component, OnInit } from '@angular/core';
import { ProductRequestsService } from '../../services/product-requests.service';
import { UserRequestsService } from '../../services/user-requests.service';
import { OrderRequestsService } from '../../services/order-requests.service';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { AreaLastChartComponent } from '../../components/area-last-chart/area-last-chart.component';
import { AreaChartComponent } from '../../components/area-chart/area-chart.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    standalone: true,
    imports: [
        AreaChartComponent,
        AreaLastChartComponent,
        BarChartComponent,
    ],
})
export class DashboardComponent implements OnInit {
  productList: object[] = [];
  topTen: any[] = [];
  orderList: object[] = [];
  productCounter: number = 0;
  userCounter: number = 0;
  orderCounter: number = 0;

  constructor(
    public productService: ProductRequestsService,
    public userService: UserRequestsService,
    public orderService: OrderRequestsService,
  ) {}
  ngOnInit(): void {
    // get all products and show the count with interval
    this.productService.getProductCountPerYear().subscribe({
      next: (data) => {
        this.productCounter = data.productCount
      },
    });
    this.productService.getTopProducts().subscribe({
      next: (data) =>{
        this.topTen = data.data
      }
    })

    // get all orders and show the count with interval
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        console.log(data);

        this.orderList = data.allOrders;
        this.orderCounter = this.orderList.length
      },
    });

    // get all users and show the count with interval
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        // console.log(data["users"].length);
        // this.userCounter = data["users"].length
        this.userCounter = data.length
      }
    })
  }
}
