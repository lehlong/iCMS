import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NodeOrganize, T_AD_ORGANIZE } from 'src/app/models/AD/T_AD_ORGANIZE.model';
import { OrganizeService } from 'src/app/services/AD/organize.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-organize',
  templateUrl: './organize-grid.component.html',
  styleUrls: ['./organize-grid.component.css'],
})
export class OrganizeGridComponent implements OnInit {

  constructor(public _service: OrganizeService, private router: Router, private route: ActivatedRoute, public _app: AppComponent) { }

  dataTree: NodeOrganize[] = [];
  dataTable: T_AD_ORGANIZE[] = [];

  ngOnInit(): void {
    this._service.getDataTable()
      .subscribe({
        next: (response) => {
          this.dataTable = response
        },
        error: (response) => {
          console.log(response)
        }
      });
    this._service.buildTreeOrganizeGrid()
      .subscribe({
        next: (response) => {
          buildTree(response)
        },
        error: (response) => {
          console.log(response)
        }
      });   
  }
  searchOrganizeGrid(event: any) {
    var key = event.target.value;
    if(!key){
      key = 'Empty'
    }
    this._service.searchOrganizeGrid(key)
      .subscribe({
        next: (response) => {
          buildTree(response)
        }
      })
  }
}

var itemSelectedId: string;
var zTreeObj;
var setting = {
  view: {
    selectedMulti: false,
    nameIsHTML: true,
    showTitle: false
  },
  edit: {
    enable: true,
    showRemoveBtn: false,
    showRenameBtn: false
  },
  data: {
    simpleData: {
      enable: true
    }
  },
  callback: {
    onClick: clickNodeGrid
  }
};

var dataTree: any;
function buildTree(data: any) {
  dataTree = data
  zTreeObj = ($.fn as any).zTree.init($("#treeOrganizeGrid"), setting, data);
};

function clickNodeGrid(event: string, treeId: string, treeNode: NodeOrganize) {
  $.ajax({
    type: 'GET',
    dataType: "json",
    headers: {
      Authorization : 'Bearer ' + localStorage.getItem('jwt')
    },
    url: `${environment.baseApiUrl}/api/Organize/GetChild/${treeNode.id}`,
    success: function (data, status, xhr) {
      fillDataToTable(data);
    }
  });
}

function fillDataToTable(data: any) {
  $("#table-organize tbody").empty();
  var rows = '';
  for(var i=0; i<data.length;i++){
    rows += `<tr><td>${data[i].NAME}</td><td style="text-align: center;">${data[i].TYPE =='BP'? 'BP - Bộ phận văn phòng' : 'CP - Công ty'}</td><td style="text-align: center;">${data[i].COMPANY_CODE}</td><td style="text-align: center;">${data[i].COST_CENTER_CODE == null ? '-' : data[i].COST_CENTER_CODE}</td></tr>`;
  }
  $('#table-organize tbody').append(rows);
}
