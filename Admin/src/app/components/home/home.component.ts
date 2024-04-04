import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AsideBarComponent } from '../aside-bar/aside-bar.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    imports: [AsideBarComponent, NavBarComponent, RouterOutlet]
})
export class HomeComponent{
  constructor(private route:Router) {  }
  ngOnInit(){
    this.route.navigate(['/home/dashboard'])
  }
}
