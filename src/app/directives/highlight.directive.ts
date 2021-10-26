import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  @Input() searchStringSubject: BehaviorSubject<string> | undefined;
  @Input() text: string | undefined;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    if (this.text) {
      this.searchStringSubject?.subscribe(t => {
        const index = this.text?.toUpperCase().indexOf(t.toUpperCase()) ?? -1;
        if (t.length > 0 && index > -1) {
          if (index !== -1) {
            this.el.nativeElement.innerHTML = this.text?.substring(0, index)
              + '<span class="highlight">' + this.text?.substr(index, t.length) + '</span>'
              + this.text?.substring(index + t.length);
          }
        } else {
          this.el.nativeElement.innerHTML = this.text;
        }
      });
    }
  }

}
