import { DataSharingService } from './../services/data-sharing.service';
import { User } from './../httpobjects/user';
import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightMyInstance]'
})
export class HighlightMyInstanceDirective implements OnInit{
  
  @Input() appHighlightMyInstance : any | User;
  currentUser = this.shared.currentUser;

  constructor(private shared: DataSharingService, 
    private elem: ElementRef, private renderer: Renderer2) {
  }
  ngOnInit() {
    this.currentUser.subscribe(data =>{
      
      if(data.id === this.appHighlightMyInstance.id){
        this.renderer.setStyle(this.elem.nativeElement, 'background-color', 'rgba(41, 238, 54, 0.531)');
      }else{
        this.renderer.setStyle(this.elem.nativeElement, 'background-color', 'rgba(238, 0, 255, 0.422)');
      }
    }, err =>{

    })
  }

}
