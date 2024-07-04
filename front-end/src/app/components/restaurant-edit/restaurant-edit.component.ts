import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: './restaurant-edit.component.html',
  styleUrls: ['./restaurant-edit.component.scss']
})
export class RestaurantEditComponent implements OnInit {
  editRestaurantForm: FormGroup;
  restaurantId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router
  ) {
    this.editRestaurantForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      image: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.restaurantId = +id;
      this.restaurantService.getRestaurants().subscribe((restaurants) => {
        const restaurant = restaurants.find(r => r.id === this.restaurantId);
        if (restaurant) {
          this.editRestaurantForm.patchValue(restaurant);
        } else {
          console.error(`Restaurant with id ${this.restaurantId} not found.`);
        }
      });
    } else {
      console.error('Restaurant id parameter not found in route.');
    }
  }
  
  onSubmit(): void {
    if (this.editRestaurantForm.valid) {
      this.restaurantService.updateRestaurant(this.restaurantId, this.editRestaurantForm.value).subscribe(() => {
        this.router.navigate(['/restaurants']);
      });
    }
  }
}
