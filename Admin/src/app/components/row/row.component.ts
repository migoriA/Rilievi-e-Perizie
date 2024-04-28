import { Component, HostListener, Input } from '@angular/core';
import { ListService } from '../../service/list.service';
import { Router } from '@angular/router';

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
  selectedId:any
  constructor(private listService:ListService, private router:Router) {  }

  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    if(this.router.url == '/home/list'){
      this.router.navigate(['/home/details'], {queryParams: {id: this.selectedId, list:this.list.codOp}})
    }
  }

  ngOnInit() {
    this.selectedId = this.list._id
    delete this.list._id
    this.keys = Object.keys(this.list);
  }
}
