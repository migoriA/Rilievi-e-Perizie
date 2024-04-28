import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss',
    standalone: true
})
export class NavBarComponent {
  constructor(protected router:Router) {  }
  isCollapsed:boolean = true

  onClick(){
    this.isCollapsed = !this.isCollapsed
    //console.log(this.isCollapsed)
  }
  onLogOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/'])
  }
}
