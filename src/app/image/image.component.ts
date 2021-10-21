import {Component, Input, OnInit, Output} from '@angular/core';
import {Image} from '../models/image.model';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() image: Image | undefined;
  favorites: Image[];
  @Output() addSubject: ReplaySubject<Image>;
  @Output() removeSubject: ReplaySubject<string>;
  @Input() isFavorite: boolean | undefined;

  constructor() {
    const localFavorites = localStorage.getItem('favorites');
    this.favorites = localFavorites != null ? JSON.parse(localFavorites) : [];
    this.addSubject = new ReplaySubject<Image>();
    this.removeSubject = new ReplaySubject<string>();
  }

  ngOnInit(): void {
  }

  addToFavorites(): void {
    if (!this.isFavorite) {
      this.addSubject.next(this.image);
    }
  }

  removeFromFavorites(): void {
    this.removeSubject.next(this.image ? this.image.id : '-1');
  }

  onHover($event: MouseEvent): void {
    console.log($event);
  }
}
