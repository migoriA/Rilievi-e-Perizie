import { Component, Input } from '@angular/core';
import { ListService } from '../../service/list.service';

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss'
})
export class RowComponent {
  @Input() perizie: any;
  constructor(private listService:ListService) {
    //console.log(1,this.row)
    
  }
  ngOnInit() {
    console.log(2,this.perizie)
    this.perizie.codOp = this.listService.users.find((user:any) => user._id == this.perizie.codOp).name;
    this.perizie.time = this.perizie.time.toString().split('T')[0].replaceAll('-','/').split('/').reverse().join('/');
  }
}
