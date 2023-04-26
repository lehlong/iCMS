import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, IonicModule } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { T_MD_UNIT } from '../models/T_MD_UINIT.model';
import { T_MD_UNIT_Service } from '../services/T_MD_UNIT.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,HttpClientModule],
})
export class HomePage implements OnInit{
  lstUnit: T_MD_UNIT[] = [];
  constructor(private _service: T_MD_UNIT_Service){}
 ngOnInit(): void {
  this._service.getListUnit()
  .subscribe({
    next: (response) => {
      this.lstUnit = response;
    },
    error: (response) => {
      console.log(response)
    }
  })
 }
}
