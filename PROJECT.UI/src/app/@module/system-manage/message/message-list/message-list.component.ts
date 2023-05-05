import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { T_AD_MESSAGE } from 'src/app/models/AD/T_AD_MESSAGE.model';
import { MessageService } from 'src/app/services/AD/message.service';
declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
})
export class MessageListComponent implements OnInit {
  lstMessage: T_AD_MESSAGE[] = [];
  constructor(private _service: MessageService, public translate: TranslateService) { }
  ngOnInit(): void {
    ShowLoading()
    this._service.getListMessage()
      .subscribe(
        {
          next: (response) => { this.lstMessage = response; HideLoading() },
          error: (response) => { console.log(response); HideLoading(); }
        })
  }
  pageSize = 15;
  page = this.lstMessage.length / 15;
}
