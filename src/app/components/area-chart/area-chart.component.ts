import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
    selector: 'app-area-chart',
    templateUrl: './area-chart.component.html',
    styleUrl: './area-chart.component.scss',
    standalone: true
})
export class AreaChartComponent implements OnInit {
  @ViewChild('MyChart') canvas!: ElementRef;
  public chart: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createChart();
    }
  }

  // public chart: any;

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: "Sales in 2023",
            data: [26, 29, 31, 24, 30, 23, 24, 26, 24, 25, 24, 23],
            // borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            pointRadius: 0,
            // pointBackgroundColor: 'rgb(54, 162, 235)',
            fill: true,
          }
        ]
      },
      options: {
        aspectRatio: 2,
        scales: {
          x: {
            ticks: {
              color: "#ccc"
            }
          },
          y: {
            ticks: {
              color: "#ccc"
            }
          },
      }
      }
    });
  }

}
