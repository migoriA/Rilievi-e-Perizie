import { Directive, ElementRef, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appActiveClass]'
})
export class ActiveClassDirective {
  @Input('isOpen') ciao!:any
  @HostBinding('class.active') isOpen:boolean;

  @HostListener('document:click',['$event']) active(event:Event) {
    //console.log((event.target as HTMLElement).classList.contains('li'))
    if(!(event.target as HTMLElement).classList.contains('li')) return
    if(this.myRef.nativeElement == event.target){
      this.isOpen = !this.isOpen;
    }
    else{
      this.isOpen = false;
    }
  }
  constructor(private myRef:ElementRef) {
    this.isOpen = false;
  }
  ngOnInit(){
    this.isOpen = this.ciao || false;
    //console.log(this.isOpen)
  }

}
