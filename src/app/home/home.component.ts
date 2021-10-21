import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ImageService} from '../services/image.service';
import {Image} from '../models/image.model';
import {fromEvent, Subscription} from 'rxjs';

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

  constructor(private imageService: ImageService) {
    this.images = [];
    this.pos = 0;
    this.subs = new Subscription();
    this.firstLoading = true;
    this.loading = true;
    this.scrolling = false;
    this.nextImages = [];
  }

  ngOnInit(): void {
    this.loadImages(0);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.loadImages(0);
    this.subs.add(
      fromEvent(window, 'scroll').subscribe((e) => {
        if (!this.scrolling) {
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
              this.loadImages(i + 1);
            } else {
              this.images = this.images.concat(this.nextImages);
              this.nextImages = [];
              if (this.firstLoading) { this.firstLoading = false; }
              this.loading = false;
              this.scrolling = false;
            }
            this.pos++;
            console.log(this.pos);
          }, err => {
            console.log(err);
            this.loading = false;
            this.scrolling = false;
          })
    );
  }

}
