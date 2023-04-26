import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { viewerType } from 'ngx-doc-viewer';
import { T_CM_TEMPLATE_CONTRACT } from 'src/app/models/CM/T_CM_TEMPLATE_CONTRACT.model';
import { T_CM_TEMPLATE_TEXT_ELEMENT } from 'src/app/models/CM/T_CM_TEMPLATE_TEXT_ELEMENT.model';
import { Select } from 'src/app/models/Common/select.model';
import { T_CM_TEMPLATE_CONTRACT_Service } from 'src/app/services/CM/T_CM_TEMPLATE_CONTRACT.service';
import { T_CM_TEMPLATE_TEXT_ELEMENT_Service } from 'src/app/services/CM/T_CM_TEMPLATE_TEXT_ELEMENT.service';

declare function MessageSuccess(response: string): any
declare function MessageDanger(response: string): any
declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-template-contract',
  templateUrl: './template-contract.component.html',
  styleUrls: ['./template-contract.component.css']
})
export class TemplateContractComponent implements OnInit {

  constructor(private _service: T_CM_TEMPLATE_CONTRACT_Service,private _serviceTextElement: T_CM_TEMPLATE_TEXT_ELEMENT_Service, private router: Router, private route: ActivatedRoute,private http: HttpClient) { }

  progress: number = 0;
  message: string = '';
  @Output() public onUploadFinished = new EventEmitter();
  token = localStorage.getItem('jwt');
  headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'reportProgress': 'true',
        'observe': 'events'
  });
  requestOptions = { headers: this.headers };

  lstTemplate : T_CM_TEMPLATE_CONTRACT[] = [];
  lstTemplateTextElement : T_CM_TEMPLATE_TEXT_ELEMENT[] = [];
  lstElement :T_CM_TEMPLATE_TEXT_ELEMENT[] = [];

  viewer : viewerType = 'google';  
  selectedType = 'docx';   
  urlViewer=''; 

  ngOnInit(): void {
    this._service.GetListTemplate()
      .subscribe({
        next: (response) => {
          this.lstTemplate = response;
        },
        error: (response) => {
          console.log(response)
        }
      });
      this._serviceTextElement.GetListTemplateTextElement()
      .subscribe({
        next: (response) => {
          this.lstTemplateTextElement = response;
        },
        error: (response) => {
          console.log(response)
        }
      })
  }

  onClickEditTemplate(id: string){
    console.log(id)
    var result = this.lstTemplateTextElement.filter(x => x.TEMPLATE_ID == id)   
    if(result){
      this.lstElement = result;
    }
  }

  uploadFileTemplate = (files : any) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post('https://localhost:4008/api/TemplateContract/UploadTemplate', formData, this.requestOptions)
      .subscribe({
        next: (event : any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

  onClickViewTemplate(url: string){
    this.urlViewer = url.replaceAll(" ","%20");
    console.log(this.urlViewer)
  }
}
