import { Component } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrl: './home-cards.component.scss'
})
export class HomeCardsComponent {
  form: FormGroup = new FormGroup({
    userNumber: new FormControl('', [Validators.required]),
    workersNumber: new FormControl('', [Validators.required]),
    perizieNumber: new FormControl('', [Validators.required])
  });
  constructor(protected homeService: HomeService) { }

  ngOnInit(){
    this.homeService.getUserNumber().then((result) => {
      this.form.get('userNumber')!.setValue(result.data.number);
    }).catch((err) => {
      console.error(err.message);
    });


    this.homeService.getWorkersNumber().then((result) => {
      this.form.get('workersNumber')!.setValue(result.data.number);
    }).catch((err) => {
      console.error(err.message);
    })

    this.homeService.getPerizieNumber().then((result) => {
      this.form.get('perizieNumber')!.setValue(result.data.number);
    }).catch((err) => {
      console.error(err.message);
    })
  }
}
