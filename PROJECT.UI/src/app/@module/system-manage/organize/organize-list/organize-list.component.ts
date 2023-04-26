import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NodeOrganize } from 'src/app/models/AD/T_AD_ORGANIZE.model';
import { T_AD_ORGANIZE_Service } from 'src/app/services/AD/T_AD_ORGANIZE.service';
import { environment } from 'src/environments/environment';
declare function MessageSuccess(response: string): any
declare function MessageDanger(response: string): any
declare function ShowLoading() :any
declare function HideLoading() :any

@Component({
  selector: 'app-organize-list',
  templateUrl: './organize-list.component.html',
})
export class OrganizeListComponent {
  constructor(public _service: T_AD_ORGANIZE_Service, private router: Router, private route: ActivatedRoute) { }

  dataTree: NodeOrganize[] = [];

  ngOnInit(): void {
    this._service.buildTreeOrganize()
      .subscribe({
        next: (response) => {
          buildTree(response)
        },
        error: (response) => {
          console.log(response)
        }
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
      Authorization : 'Bearer ' + localStorage.getItem('jwt')
    },
    url: `${environment.baseApiUrl}/api/Organize/UpdateOrder/${JSON.stringify(data)}`,
    success: function (response) {
      MessageSuccess('Cập nhật thứ tự cây cấu trúc tổ chức thành công!');
      HideLoading();
    },
    error: function(response){
      MessageDanger('Cập nhật thất bại! Đã có lỗi xảy ra!');
      HideLoading();
    }
  });

}
