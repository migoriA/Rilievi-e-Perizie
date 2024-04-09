import { Component } from '@angular/core';
import { RowComponent } from '../row/row.component';
import { ListService } from '../../service/list.service';
import { AxiosResponse } from 'axios';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss',
    standalone: true,
    imports: [RowComponent]
})
export class ListComponent {
    public list:any = {};
    constructor(protected listService:ListService) {}

    ngOnInit(){
        this.listService.getList("/api/Perizie/getPerizie").then((result:AxiosResponse) => {
            this.list = result.data.perizie;
            this.listService.users = result.data.utenti;
            console.log(this.list);
        }).catch(err => {console.error(err.message)})
    }
}
