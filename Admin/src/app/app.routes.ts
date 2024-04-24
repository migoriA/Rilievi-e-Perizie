import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HomeCardsComponent } from './components/home-cards/home-cards.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ListComponent } from './components/list/list.component';
import { MapComponent } from './components/map/map.component';
import { DetailComponent } from './components/detail/detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: HomeCardsComponent
      },
      {
        path: 'userlist',
        component: UserListComponent
      },
      {
        path: 'clients',
        component: ClientsListComponent
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'map',
        component: MapComponent
      },
      {
        path: 'details',
        component: DetailComponent
      }
    ]
  }
];
