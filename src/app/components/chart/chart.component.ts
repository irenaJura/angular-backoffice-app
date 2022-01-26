import { Category } from './../../classes/category';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  categories: Category[] = [];
  numberOfProducts: Array<number> = [];
  categoryName: any;

  constructor(private productService: ProductService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.productService.getCategories()
      .subscribe(
        data => {
          this.categories = data;
          this.categoryName = this.categories.map(c => c.category);
          this.numberOfProducts = this.categories.map(c => c.numberOfProducts);

          const canvas = <HTMLCanvasElement>document.getElementById('myChart');
          const myChart = new Chart(canvas, {
            type: 'polarArea',
            data: {
              labels: this.categoryName,
              datasets: [{
                label: 'Number of products',
                data: this.numberOfProducts
              }]
            },
            options: {
              maintainAspectRatio: false,
            }
          });

        },
        error => {
          console.log(error);
        }
      )
  }
}
