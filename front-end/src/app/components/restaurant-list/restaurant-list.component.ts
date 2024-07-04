// restaurant-list.component.ts

import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  searchText: string = '';

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  fetchRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(
      (restaurants) => {
        this.restaurants = restaurants;
      },
      (error) => {
        console.error('Error fetching restaurants', error);
      }
    );
  }

  get filteredRestaurants(): Restaurant[] {
    return this.restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  deleteRestaurant(id: number | undefined): void {
    if(id){
      this.restaurantService.deleteRestaurant(id).subscribe(() => {
        this.restaurants = this.restaurants.filter(r => r.id !== id);
      });
    }
  }
}
