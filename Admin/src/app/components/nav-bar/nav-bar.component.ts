import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isCollapsed:boolean = true

  onClick(){
    this.isCollapsed = !this.isCollapsed
    console.log(this.isCollapsed)
  }
}
