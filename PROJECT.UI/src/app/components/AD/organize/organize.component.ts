import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NodeOrganize, T_AD_ORGANIZE } from 'src/app/models/AD/T_AD_ORGANIZE.model';
import { OrganizeService } from 'src/app/services/AD/organize.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare function MessageSuccess(response: string): any
declare function MessageDanger(response: string): any
declare function ShowLoading() :any
declare function HideLoading() :any

@Component({
  selector: 'app-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.css'],
})
export class OrganizeComponent implements OnInit {

  constructor(public _service: OrganizeService, private router: Router, private route: ActivatedRoute) { }

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

  viewOrganizeGrid() {
    this.router.navigate(['/Organize/ViewGrid']);
  }
  updateOrganize() {
    updateOrganize();
  }
  createOrganize() {
    createOrganize();
  }
  updateOrderTree() {
    updateOrderTree();
  }

  deleteOrganize() {
    Swal.fire({
      title: 'Xoá công ty, phòng ban?',
      text: "Bạn có chắc muốn xoá Công ty hoặc Phòng ban! Hành động này sẽ không được hoàn tác?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ',
      focusConfirm: false,
      focusCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOganize();
      } else {
        return;
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
    onClick: clickNode,
    beforeDrop: BeforeDrop
  }
};

var dataTree: any;
function buildTree(data: any) {
  dataTree = data
  zTreeObj = ($.fn as any).zTree.init($("#treeOrganize"), setting, data);
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
  ($('#editOrganize') as any).modal('show');
  $.ajax({
    type: 'GET',
    dataType: "json",
    headers: {
      Authorization : 'Bearer ' + localStorage.getItem('jwt')
    },
    url: `${environment.baseApiUrl}/api/Organize/Detail/${treeNode.id}`,
    success: function (data, status, xhr) {
      $("#PKID").val(data.PKID);
      $("#NAME").val(data.NAME);
      $("#TYPE").val(data.TYPE).change();
      $("#COMPANY_CODE").val(data.COMPANY_CODE);
      $("#COST_CENTER_CODE").val(data.COST_CENTER_CODE);
      itemSelectedId = data.PKID
    }
  });
}

function deleteOganize() {
  ShowLoading();
  $.ajax({
    type: 'DELETE',
    dataType: "json",
    headers: {
      Authorization : 'Bearer ' + localStorage.getItem('jwt')
    },
    url: `${environment.baseApiUrl}/api/Organize/Delete/${itemSelectedId}`,
    success: function (response) {
      ($('#editOrganize') as any).modal('hide');
      HideLoading();
      MessageSuccess('Đã xoá Công ty, Phòng ban khỏi hệ thống!');
      buildTree(response);
      return response;
    },
    error: function(){
      ($('#editOrganize') as any).modal('hide');
      HideLoading();
      MessageDanger('Không thể xoá Công ty, Phòng ban khỏi hệ thống! Đã có lỗi xảy ra!');
    }
  });
}

function updateOrganize() {
  ShowLoading();
  var data = {
    PKID: $('#PKID').val(),
    NAME: $("#NAME").val(),
    TYPE: $("#TYPE").val(),
    COMPANY_CODE: $("#COMPANY_CODE").val(),
    COST_CENTER_CODE: $("#COST_CENTER_CODE").val()
  }
  $.ajax({
    type: 'PUT',
    dataType: "json",
    headers: {
      Authorization : 'Bearer ' + localStorage.getItem('jwt')
    },
    url: `${environment.baseApiUrl}/api/Organize/Update/${JSON.stringify(data)}`,
    success: function (response) {
      ($('#editOrganize') as any).modal('hide');
      HideLoading();
      MessageSuccess('Cập nhật thông tin Công ty, Phòng ban thành công!');
      buildTree(response);
      return response;
    },
    error: function(){
      ($('#editOrganize') as any).modal('hide');
      HideLoading();
      MessageSuccess('Cập nhật thông tin Công ty, Phòng ban không thành công! Đã có lỗi xảy ra!');
    }
  });
}

function createOrganize() {
  ShowLoading();
  var data = {
    NAME: $("#NAME-CREATE").val(),
    TYPE: $("#TYPE-CREATE").val(),
    COMPANY_CODE: $("#COMPANY_CODE-CREATE").val(),
    COST_CENTER_CODE: $("#COST_CENTER_CODE-CREATE").val()
  }
  $.ajax({
    type: 'POST',
    dataType: "json",
    headers: {
      Authorization : 'Bearer ' + localStorage.getItem('jwt')
    },
    url: `${environment.baseApiUrl}/api/Organize/Create/${JSON.stringify(data)}`,
    success: function (response) {
      ($('#createOrganize') as any).modal('hide');
      ($('#form-create-organize')[0] as any).reset();
      MessageSuccess('Thêm mới Công ty, Phòng ban thành công!');
      HideLoading();
      buildTree(response);
      return response;
    },
    error: function(){
      ($('#createOrganize') as any).modal('hide');
      ($('#form-create-organize')[0] as any).reset();
      MessageDanger('Tạo mới không thành công! Đã có lỗi xảy ra!');
      HideLoading();
    }
  });
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
