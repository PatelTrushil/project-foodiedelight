import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-add',
  templateUrl: './restaurant-add.component.html',
  styleUrls: ['./restaurant-add.component.scss']
})
export class RestaurantAddComponent {
  addRestaurantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router
  ) {
    this.addRestaurantForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      image: ['']
    });
  }

  onSubmit(): void {
    if (this.addRestaurantForm.valid) {
      this.restaurantService.addRestaurant(this.addRestaurantForm.value).subscribe(() => {
        this.router.navigate(['/restaurants']);
      });
    }
  }
}
