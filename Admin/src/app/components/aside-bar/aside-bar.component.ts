import { Component, Input } from '@angular/core';
import { ActiveClassDirective } from './active-class.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-aside-bar',
    templateUrl: './aside-bar.component.html',
    styleUrl: './aside-bar.component.scss',
    standalone: true,
    imports: [ActiveClassDirective, RouterLink, RouterLinkActive]
})
export class AsideBarComponent {}
