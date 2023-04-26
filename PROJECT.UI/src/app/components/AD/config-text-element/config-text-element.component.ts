import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_AD_CONFIG_TEXT_ELEMENT } from 'src/app/models/AD/T_AD_CONFIG_TEXT_ELEMENT.model';
import { T_AD_CONFIG_TEXT_ELEMENT_Service } from 'src/app/services/AD/T_AD_CONFIG_TEXT_ELEMENT.service';
import * as jQuery from 'jquery';
import Swal from 'sweetalert2'

declare function MessageSuccess(response : string) : any
declare function MessageDanger(response : string) : any

@Component({
  selector: 'app-test-list',
  templateUrl: './config-text-element.component.html',
  styleUrls: ['./config-text-element.component.css']
})
export class ConfigTextElementComponent implements OnInit {

  config : T_AD_CONFIG_TEXT_ELEMENT = {
    ID : '',
    START_WORD :'',
    END_WORD : '',
  }

  constructor(private _service: T_AD_CONFIG_TEXT_ELEMENT_Service, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._service.getListConfigTextElement()
      .subscribe({
        next: (response) => {
          this.config = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  updateConfigTextElement() {
    this._service.updateConfigTextElement(this.config?.ID, this.config)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
          (function ($) {
            $(".btn-close").click();
          })(jQuery);
          MessageSuccess(`Cập nhật Config Text Element thành công!`);
        }
      })
  }
}
