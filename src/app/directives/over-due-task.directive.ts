import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appOverDueTask]'
})
export class OverDueTaskDirective implements OnInit {

  @Input() appOverDueTask : any;

  constructor(private elem: ElementRef, private renderer: Renderer2) {   }

  ngOnInit(){
    // console.log('reaching in directive',this.appOverDueTask.toDate());
    let today = new Date();
    let diff: any = today.getTime() - this.appOverDueTask.toDate().getTime();
    let checker = Math.round(diff / (1000 * 3600 * 24));
    // console.log(Math.round(checker));
    if(checker > -3){
      this.renderer.setStyle(this.elem.nativeElement, 'background-color', 'cyan');
    }
    if(checker > -2){
      this.renderer.setStyle(this.elem.nativeElement, 'background-color', 'pink');
    }
    if(checker > -1){
      this.renderer.setStyle(this.elem.nativeElement, 'background-color', 'red');
    }
    if(checker > 0){
      this.renderer.setStyle(this.elem.nativeElement, 'color', 'white')
      this.renderer.setStyle(this.elem.nativeElement, 'background-color', 'black');
    }
  }

  
}
