import { Component } from '@angular/core';
import { ListService } from '../../service/list.service';
import { AxiosResponse } from 'axios';
import { RowComponent } from '../row/row.component';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    standalone: true,
    imports: [RowComponent]
})
export class UserListComponent {
    public list:any = {};
    name:string = ''
    email:string = ''
    constructor(protected listService:ListService) {}

    ngOnInit(){
        this.listService.getUser()
    }
    onAdd(){
        Swal.fire({
            title: "Modifica perizia",
            html: `
            <form id="editForm" class="container" style= '
                                                          display: flex;
                                                          flex-direction: column;
                                                          gap: 1rem;'>
              <div class="form-group" style='display: flex;
                                             flex-direction: row;
                                             gap: 0.5rem;'>
                <label for="name" style='font-size: 1.5rem;font-weight: 600;'>Nome: </label>
                <input type="text" class="form-control" id="name" value="${this.name}" style='padding: 0.5rem;
                font-size: 1rem;
                border: 1px solid #ccc;
                border-radius: 0.5rem;'>
              </div>
              <div class="form-group" style='display: flex;
                                            flex-direction: row;
                                            gap: 0.5rem;'>
                <label for="email" style='font-size: 1.5rem;font-weight: 600;'>Email: </label>
                <input type="text" class="form-control" id="email" value="${this.email}" style='padding: 0.5rem;
                font-size: 1rem;
                border: 1px solid #ccc;
                border-radius: 0.5rem;'>
              </div>
            </form>
          `,
            showCancelButton: true,
            confirmButtonText: "Salva",
            cancelButtonText: "Annulla",
            width: "40%"
          }).then(async (result) => {
                if (result.isConfirmed) {
                    let fields: any = {
                        name: (<HTMLInputElement>document.getElementById("name")).value,
                        _id: this.listService.maxId + 1,
                        email: (<HTMLInputElement>document.getElementById("email")).value,
                    }
                    await this.listService.addUser(fields)
                }
            })
        }
}
