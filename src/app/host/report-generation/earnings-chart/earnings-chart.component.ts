import {Component, Input, SimpleChanges} from '@angular/core';
import {Chart} from "chart.js";

@Component({
  selector: 'app-earnings-chart',
  templateUrl: './earnings-chart.component.html',
  styleUrls: ['./earnings-chart.component.css']
})
export class EarningsChartComponent {
  public chart: any;
  backgroundColor: string[] = [];
  @Input() data:number[];
  @Input() labels:string[];

  ngOnInit(): void {
  }
  createChart(){

    this.chart = new Chart("MyChart2", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.labels,
        datasets: [{
          label: 'Earning statistics:',
          data: this.data,
          backgroundColor: this.backgroundColor,
        }],
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
  generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  ngOnChanges(changes: SimpleChanges) {
    for(let item of this.data){
      this.backgroundColor.push(this.generateRandomColor());
    }
    console.log(this.backgroundColor)
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }

}
