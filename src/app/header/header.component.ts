import { Component, OnInit } from '@angular/core';
import {ImageService} from '../services/image.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.getImage(0).subscribe((i) => console.log(i));
  }


}
