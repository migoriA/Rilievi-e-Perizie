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
    public list:any
    constructor(protected listService:ListService) {}

    ngOnInit(){
        this.listService.getList().then((result:AxiosResponse) => {
            this.list = result.data.perizie;
            this.listService.users = result.data.utenti;
            
            result.data.perizie.forEach((element:any) => {
                delete element._id
                delete element.img
                delete element.coor
                
            });

            this.list = this.list.map( (p:any) =>{
                const utenti = result.data.utenti;
                const ora = p.time.toString().split("T")[0];

                const codOp = utenti.find((u:any) => u._id == p.codOp)!.name;
                const time = ora.split('-').reverse().join('/')
                return Object.assign(p, {codOp, time}) 
            })

            console.log(this.list);
        }).catch(err => {console.error(err.message)})
    }
}
