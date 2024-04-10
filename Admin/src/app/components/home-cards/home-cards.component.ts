import { Component } from '@angular/core';
import { HomeService } from '../../service/home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Chart} from 'chart.js/auto';


@Component({
    selector: 'app-home-cards',
    templateUrl: './home-cards.component.html',
    styleUrl: './home-cards.component.scss',
    standalone: true,
})
export class HomeCardsComponent {
  form: FormGroup = new FormGroup({
    userNumber: new FormControl('', [Validators.required]),
    workersNumber: new FormControl('', [Validators.required]),
    perizieNumber: new FormControl('', [Validators.required])
  });

  public chart:any
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
    let canvas = document.getElementById('Chart') as HTMLCanvasElement;
    this.homeService.getChart().then((result) => {
      console.log(result.data)
      let importo_annuo:any[] = []
      let data:any[] = []
      result.data.forEach((element:any) => {
        console.log(element.polizze)
        element.polizze.forEach((perizia:any) => {
          importo_annuo.push(perizia.importo)
          data.push(perizia.data)
        });
      });
      console.log(data)
      Chart.defaults.backgroundColor = '#FFF';
      Chart.defaults.color = '#FFF';
      Chart.defaults.plugins.legend.display = false
      this.chart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: data,
          datasets: [{
            //label: 'Guadagno',
            data: importo_annuo,
            fill: false,
            borderColor: 'rgb(255, 255, 255)',
            tension: 0.1,
            
          }],
          
        } 
      })
    }).catch((err) => {console.error(err.message)})
  }
}
