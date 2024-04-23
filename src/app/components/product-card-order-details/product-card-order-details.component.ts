import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-product-card-order-details',
    templateUrl: './product-card-order-details.component.html',
    styleUrl: './product-card-order-details.component.scss',
    standalone: true,
    imports: [RouterLink, CurrencyPipe]
})
export class ProductCardOrderDetailsComponent {
  @Input() prd ;

  ngOnInit(){
    // console.log(this.prd);
    
  }
}
