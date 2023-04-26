import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_MD_AREA } from 'src/app/models/MD/T_MD_AREA.model';
import { T_MD_AREA_Service } from 'src/app/services/MD/T_MD_AREA.service';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2'

declare function MessageSuccess(response : string) : any
declare function MessageDanger(response : string) : any

@Component({
  selector: 'app-test-list',
  templateUrl: './area-create.component.html',
  styleUrls: ['./area-create.component.css']
})
export class AreaCreateComponent implements OnInit {
  lstArea: T_MD_AREA[] = [];

  addItemRequest: T_MD_AREA = {
    CODE: '',
    NAME: '',
    ACTIVE: true,
    CREATE_BY: '',
    CREATE_DATE: new Date(),
    UPDATE_BY: '',
    UPDATE_DATE: new Date(),
  }
  

  constructor(private _service: T_MD_AREA_Service, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  

  createArea() {
    this._service.createArea(this.addItemRequest)
      .subscribe({
        next: (response) => {
          //this.ngOnInit();

          this.router.navigate(['Area']);
          
          MessageSuccess("Thêm mới Khu vực thành công");
        },
        error: (response) => {
          MessageDanger('Thêm mới không thành công! Đã có lỗi xảy ra!');
        }
      })
  }
}
