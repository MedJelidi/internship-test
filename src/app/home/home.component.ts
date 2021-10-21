import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImageService} from '../services/image.service';
import {Image} from '../models/image.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  images: Image[];
  pos: number;
  subs: Subscription;
  firstLoading: boolean;
  loading: boolean;

  constructor(private imageService: ImageService) {
    this.images = [];
    this.pos = 0;
    this.subs = new Subscription();
    this.firstLoading = true;
    this.loading = true;
  }

  ngOnInit(): void {
    this.loadImages(0);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadImages(i: number): void {
    this.subs.add(
      this.imageService.getImage(this.pos)
        .subscribe(
          image => {
            this.images[this.images.length] = image;
            if (i < 11) {
              this.loadImages(i + 1);
            } else {
              if (this.firstLoading) { this.firstLoading = false; }
              this.loading = false;
            }
            this.pos++;
            console.log(this.pos);
          }, err => console.log(err))
    );
  }

}
