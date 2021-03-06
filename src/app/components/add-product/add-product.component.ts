import { Product } from './../../classes/product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  title = "Add a new product";
  submitted = false;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  productForm = this.fb.group({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    category: new FormControl('', Validators.required),
    employee: new FormControl('', Validators.required),
    reviews: this.fb.array([this.fb.control('', Validators.required)])
  })

  get reviews() {
    return this.productForm.get('reviews') as FormArray;
  }

  addReview() {
    this.reviews.push(this.fb.control('', Validators.required));
  }

  removeReview(i: number) {
    this.reviews.removeAt(i);
  }

  onSubmit(): void {
    const data = this.productForm.value;

    console.log("submitted data", data);
    this.productService.addProduct(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });

    this.productForm.reset();

    setTimeout(() => {
      this.router.navigate(['/list']);
    }, 500)
  }

}
