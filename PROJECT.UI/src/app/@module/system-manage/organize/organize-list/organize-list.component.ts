import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeOrganize } from 'src/app/models/AD/T_AD_ORGANIZE.model';
import { OrganizeService } from 'src/app/services/AD/organize.service';
import { environment } from 'src/environments/environment';
declare function Message(response: any): any
declare function ShowLoading(): any
declare function HideLoading(): any

@Component({
  selector: 'app-organize-list',
  templateUrl: './organize-list.component.html',
})
export class OrganizeListComponent implements OnInit {
  constructor(public _service: OrganizeService, private router: Router, private route: ActivatedRoute) { }

  dataTree: NodeOrganize[] = [];

  ngOnInit(): void {
    ShowLoading()
    this._service.buildTreeOrganize()
      .subscribe({
        next: (response) => { buildTree(response.Data); HideLoading(); },
        error: (response) => { console.log(response); HideLoading(); }
      });
  }
  searchOrganize(event: any) {
    var key = event.target.value;
    if (!key) {
      key = 'Empty'
    }
    this._service.searchOrganize(key)
      .subscribe({
        next: (response) => {
          buildTree(response)
        }
      })
  }
  updateOrderTree() {
    updateOrderTree();
  }
}

var dataTree: any;
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
    onClick: clickNode,
    beforeDrop: BeforeDrop
  }
};

function buildTree(data: any) {
  dataTree = data;
  ($.fn as any).zTree.init($("#treeOrganize"), setting, data);
};

function BeforeDrop(treeId: any, treeNodes: any, targetNode: any, moveType: any, isCopy: any) {
  if (!targetNode) {
    return false;
  } else if (targetNode.id == dataTree[0].id) {
    return false;
  }
  return true
}

function clickNode(event: string, treeId: string, treeNode: NodeOrganize) {
  window.location.href = `SystemManage/Organize/Edit/${treeNode.id}`;
}

function updateOrderTree() {
  ShowLoading();
  var zTree = ($.fn as any).zTree.getZTreeObj("treeOrganize");
  var nodes = zTree.transformToArray(zTree.getNodes());
  var data = nodes.map(function (a: any) { return { id: a.id, pId: a.pId }; });
  $.ajax({
    type: 'PUT',
    dataType: "json",
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      Language: localStorage.getItem('lang')
    },
    url: `${environment.baseApiUrl}/api/Organize/UpdateOrder/${JSON.stringify(data)}`,
    success: function (response) {
      Message(response);
      HideLoading();
    },
    error: function (response) {
      Message(response);
      HideLoading();
    }
  });

}
