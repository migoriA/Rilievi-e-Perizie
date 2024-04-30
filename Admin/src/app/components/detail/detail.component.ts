import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../../service/list.service';
import { GoogleMapsModule } from '@angular/google-maps';
import Swal from 'sweetalert2';

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
  indirizzo:any
  description:any 
  google = window.google

  constructor(private route: ActivatedRoute, private router: Router, protected listService: ListService) {}

  async ngOnInit() {
    this.id = this.route.queryParams;
    await this.listService.getDetails(this.id._value.id)
    console.log(this.name)  
    console.log(this.listService.user)
    this.data = this.listService.user.time.split('T')[0]
    this.data = this.data.split('-').reverse().join('/')
    this.ora = this.listService.user.time.split('T')[1]
    this.ora = this.ora.split(':')[0] + ':' + this.ora.split(':')[1]
    this.description = this.listService.user.desc

    let geocoder = new this.google.maps.Geocoder()
    let latlng = {lat: parseFloat(this.listService.user.coor.split(',')[0]), lng: parseFloat(this.listService.user.coor.split(',')[1])}
    geocoder.geocode({'location': latlng}, (results: any, status:string) => {
      if (status === 'OK') {
        if (results[0]) {
          this.indirizzo = results[0].formatted_address.split(',')[0]+ ', ' + results[0].formatted_address.split(',')[1]
          console.log(results[0].formatted_address)
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    })
  }
  map(){
    this.router.navigate(['/home/map'], {queryParams: {lat: this.listService.user.coor.split(',')[0], lng: this.listService.user.coor.split(',')[1]}})
  }
  onModify(){
    Swal.fire({
      title: "Modifica perizia",
      html: `
      <form id="editForm" class="container" style= '
                                                    display: flex;
                                                    flex-direction: column;
                                                    gap: 1rem;
                                                    margin-top:0.5rem;'>
        <div class="form-group" style='display: flex;
                                       flex-direction: row;
                                       gap: 0.5rem;'>
          <label for="description" style='font-size: 1.5rem;font-weight: 600;'>Descrizione: </label>
          <input type="text" class="form-control" id="description" value="${this.description}" style='padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;'>
        </div>
        <div class="form-group" style='display: flex;
                                      flex-direction: row;
                                      gap: 0.5rem;'>
          <label for="date" style='font-size: 1.5rem;font-weight: 600;'>Data: </label>
          <input type="date" class="form-control" id="date" value="${this.data}" style='padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;'>
        </div>
        <div class="form-group" style='display: flex;
                                      flex-direction: row;
                                      gap: 0.5rem;
                                      margin-bottom: 0.5rem;'>
          <label for="time" style='font-size: 1.5rem;font-weight: 600;'>Ora: </label>
          <input type="time" class="form-control" id="time" value="${this.ora}"style='padding: 0.5rem;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;'>
        </div>
      </form>
    `,
      showCancelButton: true,
      confirmButtonColor: '#3d43e0',
      confirmButtonText: "Salva",
      cancelButtonText: "Annulla",
      width: "40%"
    }).then(async (result) => {
      if (result.isConfirmed) {
        let fields: any = {
          description: (<HTMLInputElement>document.getElementById("description")).value,
          date: (<HTMLInputElement>document.getElementById("date")).value,
          time: (<HTMLInputElement>document.getElementById("time")).value,
          comments: (document.getElementsByClassName("comment"))
        }
        this.substituteFields(this.listService.user, fields);
        await this.listService.update(this.listService.user);
      }
    });
  }
  substituteFields(perizia: any, fields: any) {

    perizia.desc = fields.description;
    perizia.time = fields.date + "T" + fields.time;
    //perizia.time = fields.time;

    console.log(perizia)
    return perizia;
  }
  onViewImg(){
    let img = this.listService.user.img
    let imgTag = ""
    console.log(img)
    img.forEach((i:any) => {
      imgTag += `<img src="${i}" style='width:100%;height:100%;object-fit:contain;margin:0.5rem;'/>`
    })
    Swal.fire({
      title: 'Immagini',
      html: `
        <div style='width:100%;height:80vh!important;overflow:scroll;overflow-x:hidden;'>
          ${imgTag}
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      width: '50%'
    })
  }
  
}
