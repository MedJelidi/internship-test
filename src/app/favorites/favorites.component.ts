import {Component, OnInit} from '@angular/core';
import {Image} from '../models/image.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: Image[];

  constructor() {
    const localFavorites = localStorage.getItem('favorites');
    this.favorites = localFavorites != null ? JSON.parse(localFavorites) : [];
  }

  ngOnInit(): void {
  }

  removeFromFavorites(id: string): void {
    this.favorites = this.favorites.filter((img) => img.id !== id);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  noFavorites(): boolean {
    return this.favorites.length === 0;
  }

  trackById(index: number, image: Image): string {
    return image.id;
  }
}
