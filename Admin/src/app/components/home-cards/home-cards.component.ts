import { Component } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { RowComponent } from '../row/row.component';


@Component({
    selector: 'app-home-cards',
    templateUrl: './home-cards.component.html',
    styleUrl: './home-cards.component.scss',
    standalone: true,
    imports: [RowComponent]
})
export class HomeCardsComponent {

  constructor(protected homeService: HomeService) { }
  
  async ngOnInit(){
    await this.homeService.getLastPerizie()
    console.log(this.homeService.perizie)
    this.homeService.perizie.forEach((perizia:any) => {
      delete perizia.coor
      delete perizia.img
    })
    this.homeService.perizie = this.homeService.perizie.map((p:any) => {
      const utenti = this.homeService.utenti;
      const ora = p.time.toString().split("T")[0];
      const time = ora.split('-').reverse().join('/')
      const codOp = utenti.find((u:any) => u._id == p.codOp)!.name;
      return Object.assign(p, {codOp,time})
    })
    this.homeService.utenti.forEach((u:any) => delete u.password)
  }
}
