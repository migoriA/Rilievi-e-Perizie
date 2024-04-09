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
  @Input() list!: any;
  keys:any
  constructor(private listService:ListService) {
    //console.log(1,this.row)
    
    
  }
  ngOnInit() {
    console.log(2,this.list)
    
    this.keys = Object.keys(this.list);

    console.log(1,this.keys)
    console.log(1,this.list)
  }
}
