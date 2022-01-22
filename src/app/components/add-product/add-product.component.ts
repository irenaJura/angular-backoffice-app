import { Product } from './../../classes/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    category: '',
    employee: '',
    reviews: []
  };
  submitted = false;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  productForm = this.fb.group({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    category: new FormControl('', Validators.required),
    employee: new FormControl('', Validators.required)
  })

  onSubmit(): void {
    const data = this.productForm.value;

    this.productService.addProduct(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

}
