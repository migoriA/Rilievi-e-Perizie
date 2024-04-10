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
        this.listService.getList("/api/clienti").then((result:AxiosResponse) => {
            result.data.forEach((element:any) => {
                delete element._id
                this.indirizzo.push(element.indirizzo) 
                this.polize.push(element.polizze) 
                delete element.indirizzo
                delete element.polizze

                
            })
            console.log(this.indirizzo)
            this.list = result.data;
            console.log(this.list);
        }).catch(err => {console.error(err.message)})
    }
}
