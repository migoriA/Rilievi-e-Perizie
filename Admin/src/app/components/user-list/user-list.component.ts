import { Component } from '@angular/core';
import { ListService } from '../../service/list.service';
import { AxiosResponse } from 'axios';
import { RowComponent } from '../row/row.component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    standalone: true,
    imports: [RowComponent]
})
export class UserListComponent {
    public list:any = {};
    constructor(protected listService:ListService) {}

    ngOnInit(){
        this.listService.getUser()
    }
    onAdd(){
        console.log('add')
    }
}
