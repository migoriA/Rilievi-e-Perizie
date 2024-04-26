import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../../service/list.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  id:any
  name:string = ''
  data:any
  ora:any
  constructor(private route: ActivatedRoute, private router: Router, protected listService: ListService) {}

  async ngOnInit() {
    this.id = this.route.queryParams;
    this.name = this.route.snapshot.queryParams['list'];
    await this.listService.getDetails(this.id._value.id)
    console.log(this.name)  
    console.log(this.listService.user)
    this.data = this.listService.user.time.split('T')[0]
    this.data = this.data.split('-').reverse().join('/')
    this.ora = this.listService.user.time.split('T')[1]
    this.ora = this.ora.split(':')[0] + ':' + this.ora.split(':')[1]
  }
}
