import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Chart from 'chart.js/auto';
import { ProductRequestsService } from '../../services/product-requests.service';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrl: './bar-chart.component.scss',
    standalone: true,
})
export class BarChartComponent implements OnInit {
  @ViewChild('barChart') canvas!: ElementRef;
  months: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  result: any;
  data: number[] = [];
  currentMonth = new Date().getMonth();
  constructor(
    private productService: ProductRequestsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Create a sorted array of months
    this.months = [
      ...this.months.slice(this.currentMonth),
      ...this.months.slice(0, this.currentMonth),
    ];
  }

  ngOnInit(): void {
    this.result = this.productService.getProductCountPerYear().subscribe({
      next: (data) => {
        if (data.result) {
          data.result.sort((a, b) => {
            const indexA = (a.month - this.currentMonth + 11) % 12;
            const indexB = (b.month - this.currentMonth + 11) % 12;
            return indexA - indexB;
          });
          this.result = data.result;
          this.data = this.result.map((data: any) => data.count);

          if (isPlatformBrowser(this.platformId)) {
            this.createChart();
          }
        }
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }

  public chart: any;

  createChart() {
    this.chart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [
          {
            label: 'Product Added By Month',
            data: this.data,
            backgroundColor: 'rgba(255, 105, 180, 1)',
            borderWidth: 0,
            barPercentage: 0.5,
            borderRadius: 10,
          },
        ],
      },
      options: {
        aspectRatio: 0.8,
        indexAxis: 'y',
        scales: {
          x: {
            ticks: {
              color: '#ccc',
            },
          },
          y: {
            ticks: {
              color: '#ccc',
            },
          },
        },
      },
    });
  }
}
