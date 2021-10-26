import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ImageService} from '../services/image.service';
import {Image} from '../models/image.model';
import {BehaviorSubject, fromEvent, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  images: Image[];
  pos: number;
  subs: Subscription;
  firstLoading: boolean;
  loading: boolean;
  scrolling: boolean;
  nextImages: Image[];
  searchText: string;
  allImages: Image[];
  favorites: Image[];
  searchTextSubject: BehaviorSubject<string>;

  constructor(private imageService: ImageService) {
    this.images = [];
    this.pos = 0;
    this.subs = new Subscription();
    this.firstLoading = true;
    this.loading = true;
    this.scrolling = false;
    this.nextImages = [];
    this.searchText = '';
    this.allImages = [];
    const localFavorites = localStorage.getItem('favorites');
    this.favorites = localFavorites != null ? JSON.parse(localFavorites) : [];
    this.searchTextSubject = new BehaviorSubject<string>('');
  }

  ngOnInit(): void {
    this.loadImages(0);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.subs.add(
      fromEvent(window, 'scroll').subscribe(() => {
        if (!this.scrolling && this.searchText.length === 0) {
          const reachedBottom = (document.documentElement.scrollHeight
            - Math.abs(document.documentElement.scrollTop))
            <= document.documentElement.clientHeight;
          if (reachedBottom && this.images.length < 1083) {
            this.scrolling = true;
            this.loading = true;
            this.loadImages(0);
          }
        }
      })
    );
  }

  loadImages(i: number): void {
    this.subs.add(
      this.imageService.getImage(this.pos)
        .subscribe(
          image => {
            this.nextImages.push(image);
            console.log(this.nextImages);
            if (i < 11) {
              this.pos++;
              this.loadImages(i + 1);
            } else {
              this.pos++;
              this.images = this.images.concat(this.nextImages);
              this.nextImages = [];
              if (this.firstLoading) {
                this.firstLoading = false;
              }
              this.loading = false;
              this.scrolling = false;
              this.allImages = [...this.images];
            }
            console.log(this.pos);
          }, err => {
            console.log(err);
            this.pos++;
            this.loadImages(i + 1);
            this.loading = false;
            this.scrolling = false;
          })
    );
  }

  contains(img: Image): boolean {
    return img.id.toUpperCase().includes(this.searchText.toUpperCase())
      || img.author.toUpperCase().includes(this.searchText.toUpperCase())
      || img.text.toUpperCase().includes(this.searchText.toUpperCase());
  }

  onSearch(): void {
    if (this.searchText.length === 0) {
      this.images = [...this.allImages];
    } else {
      const searchedImages: Image[] = [];
      this.allImages.forEach(img => {
        if (this.contains(img)) {
          searchedImages[searchedImages.length] = img;
        }
      });
      this.images = [...searchedImages];
    }
    this.searchTextSubject.next(this.searchText);
  }

  addToFavorite(img: Image): void {
    let currentFavorites: Image[] = JSON.parse(localStorage.getItem('favorites') ?? '[]');
    currentFavorites = currentFavorites.concat(img);
    localStorage.setItem('favorites', JSON.stringify(currentFavorites));
    this.favorites = this.favorites.concat(img);
  }

  removeFromFavorites(id: string): void {
    const currentFavorites: Image[] = JSON.parse(localStorage.getItem('favorites') ?? '[]');
    if (currentFavorites.length > 0) {
      const newFavorites = currentFavorites.filter((img) => img.id !== id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      this.favorites = [...newFavorites];
    }
  }

  inFavorites(id: string): boolean {
    return this.favorites.findIndex(f => f.id === id) > -1;
  }

  everyLoading(): boolean {
    return this.firstLoading || this.loading;
  }

  trackById(index: number, image: Image): string {
    return image.id;
  }
}
