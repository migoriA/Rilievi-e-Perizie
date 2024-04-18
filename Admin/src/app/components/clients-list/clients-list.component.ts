import { Component } from '@angular/core';
import { ListService } from '../../service/list.service';
import { RowComponent } from '../row/row.component';
import { AxiosResponse } from 'axios';

@Component({
    selector: 'app-clients-list',
    templateUrl: './clients-list.component.html',
    styleUrl: './clients-list.component.scss',
    standalone: true,
    imports: [RowComponent]
})
export class ClientsListComponent {
    public list:any = {};
    indirizzo:any[] = []
    polize:any[] = []
    constructor(protected listService:ListService) {}

    ngOnInit(){
        this.listService.getClients()
    }
}