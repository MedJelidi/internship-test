import {Directive, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit, OnDestroy {

  @Input() searchStringSubject: BehaviorSubject<string> | undefined;
  @Input() text: string | undefined;
  subs: Subscription;

  constructor(private el: ElementRef) {
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this.searchStringSubject?.subscribe(t => {
      if (this.text) {
        const index = this.text?.toUpperCase().indexOf(t.toUpperCase()) ?? -1;
        if (t.length > 0 && index > -1) {
          if (index !== -1) {
            const regExp = new RegExp(t, 'gi');
            const word = this.text.match(regExp);
            console.log(word);
            const arr = this.text.split(regExp);
            let r = '';
            if (word) {
              for (let i = 0; i < arr.length; i++) {
                r += arr[i];
                if (i < arr.length - 1) {
                  r += '<span class="highlight">' + word[i] + '</span>';
                }
              }
              this.el.nativeElement.innerHTML = r;
            }
          }
        } else {
          this.el.nativeElement.innerHTML = this.text;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
