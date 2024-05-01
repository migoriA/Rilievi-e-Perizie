import { Component, OnInit } from '@angular/core';
import {IonContent,IonHeader,IonToolbar,IonTitle,IonItem,IonTextarea,IonButton,IonIcon,IonGrid,IonRow,IonCol,IonImg,IonInput,IonActionSheet} from '@ionic/angular/standalone';
import {FormsModule} from '@angular/forms';
import { PhotoService } from 'src/app/service/photo.service';
import { HomeService } from 'src/app/service/home.service';
import { addIcons } from 'ionicons';
import {camera} from 'ionicons/icons';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  standalone: true,
  imports: [IonContent,IonHeader,IonToolbar,IonTitle,IonItem,IonTextarea,IonButton,IonIcon,IonGrid,IonRow,IonCol,IonImg,IonInput,FormsModule,IonActionSheet]
})
export class AddComponent  implements OnInit {
  codOp = this.homeService.codOp != undefined ? this.homeService.codOp : parseInt(localStorage.getItem('codOp')!)
  desc:string = ''
  comments:any[]= []

  constructor(private homeService:HomeService, public photoService: PhotoService, private alertController:AlertController, private actionSheetCtrl: ActionSheetController) {
    addIcons({ camera });
    //this.photoService.comments = new Array(this.photoService.photos.length).fill('')
  }

  ngOnInit() {}
  async onAdd(){
    const position = await Geolocation.getCurrentPosition();
    let time = new Date().toLocaleString('it-IT',{timeZone:'Europe/Rome'}).split(':').slice(0,2).join(':')
    let date = time.split(',')[0].split('/').reverse().join('-')
    time = date + 'T' + time.split(',')[1].replace(' ','')
    let perizia:any = {
      codOp:this.codOp.toString(),
      time:time,
      desc:this.desc,
      coor: position.coords.latitude + ',' + position.coords.longitude,
      img: []
    }
    perizia.img = this.photoService.photos.map((photo,index) => {
      return {url:photo.webviewPath,desc:this.photoService.comments[index]}
    })

    const alert = await this.alertController.create({
      header: 'Operazione completata',
      message: 'Perizia aggiunta con successo!',
      buttons: ['Ok'],
    });
    console.log(perizia)
    this.photoService.addPerizia(perizia).then(response => {
      alert.present().then(()=>{
        window.location.href = '/tabs/tab2'
      })
    }).catch(err => {console.log(err.message)})
  }
  onPic(){
    this.photoService.addNewToGallery();
    console.log(this.photoService.photos)
  }

  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  logResult(ev:any) {
    console.log(JSON.stringify(ev.detail, null, 2));
    if(ev.detail.data.action === 'delete'){
      this.photoService.photos.splice(ev.detail.index,1)
      this.photoService.comments.splice(ev.detail.index,1)
    }
  }
}
