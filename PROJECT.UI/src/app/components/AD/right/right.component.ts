import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { T_AD_RIGHT, NodeRight } from 'src/app/models/AD/T_AD_RIGHT_model';
import { T_AD_RIGHT_Service } from 'src/app/services/AD/T_AD_RIGHT.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare function MessageSuccess(response: string): any
declare function MessageDanger(response: string): any
declare function ShowLoading() :any
declare function HideLoading() :any

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css'],
})
export class RightComponent implements OnInit {

  constructor(public _service: T_AD_RIGHT_Service, private router: Router, private route: ActivatedRoute) { }

  dataTree: NodeRight[] = [];

  ngOnInit(): void {
    this._service.buildTreeRight()
      .subscribe({
        next: (response) => {
          buildTree(response)
        },
        error: (response) => {
          console.log(response)
        }
      });
  }
  searchRight(event: any) {
    var key = event.target.value;
    if (!key) {
      key = 'Empty'
    }
    this._service.searchRight(key)
      .subscribe({
        next: (response) => {
          buildTree(response)
        }
      })
  }

  updateRight() {
    updateRight();
  }
  createRight() {
    createRight();
  }
  updateOrderTree() {
    updateOrderTree();
  }

  deleteRight() {
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
  zTreeObj = ($.fn as any).zTree.init($("#treeRight"), setting, data);
};

function BeforeDrop(treeId: any, treeNodes: any, targetNode: any, moveType: any, isCopy: any) {
  if (!targetNode) {
    return false;
  } else if (targetNode.id == dataTree[0].id) {
    return false;
  }
  return true
}

function clickNode(event: string, treeId: string, treeNode: NodeRight) {
  ($('#editRight') as any).modal('show');
  $.ajax({
    type: 'GET',
    dataType: "json",
    headers: {
      Authorization : 'Bearer ' + localStorage.getItem('jwt')
    },
    url: `${environment.baseApiUrl}/api/Right/Detail/${treeNode.id}`,
    success: function (data, status, xhr) {
      $("#CODE").val(data.CODE);
      $("#NAME").val(data.NAME);
      itemSelectedId = data.CODE
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
    url: `${environment.baseApiUrl}/api/Right/Delete/${itemSelectedId}`,
    success: function (response) {
      ($('#editRight') as any).modal('hide');
      HideLoading();
      MessageSuccess('Đã xoá Công ty, Phòng ban khỏi hệ thống!');
      buildTree(response);
      return response;
    },
    error: function(){
      ($('#editRight') as any).modal('hide');
      HideLoading();
      MessageDanger('Không thể xoá Công ty, Phòng ban khỏi hệ thống! Đã có lỗi xảy ra!');
    }
  });
}

function updateRight() {
  ShowLoading();
  var data = {
    NAME: $("#NAME").val(),
    CODE: $("#CODE").val()
  }
  $.ajax({
    type: 'PUT',
    dataType: "json",
    headers: {
      Authorization : 'Bearer ' + localStorage.getItem('jwt')
    },
    url: `${environment.baseApiUrl}/api/Right/Update/${JSON.stringify(data)}`,
    success: function (response) {
      ($('#editRight') as any).modal('hide');
      HideLoading();
      MessageSuccess('Cập nhật thông tin Công ty, Phòng ban thành công!');
      buildTree(response);
      return response;
    },
    error: function(){
      ($('#editRight') as any).modal('hide');
      HideLoading();
      MessageDanger('Cập nhật thông tin Công ty, Phòng ban không thành công! Đã có lỗi xảy ra!');
    }
  });
}

function createRight() {
  ShowLoading();
  var data = {
    NAME: $("#NAME-CREATE").val(),
    CODE: $("#CODE-CREATE").val(),
  }
  $.ajax({
    type: 'POST',
    dataType: "json",
    headers: {
      Authorization : 'Bearer ' + localStorage.getItem('jwt')
    },
    url: `${environment.baseApiUrl}/api/Right/Create/${JSON.stringify(data)}`,
    success: function (response) {
      ($('#createRight') as any).modal('hide');
      ($('#form-create-Right')[0] as any).reset();
      MessageSuccess('Thêm mới Công ty, Phòng ban thành công!');
      HideLoading();
      buildTree(response);
      return response;
    },
    error: function(){
      ($('#createRight') as any).modal('hide');
      ($('#form-create-Right')[0] as any).reset();
      MessageDanger('Tạo mới không thành công! Đã có lỗi xảy ra!');
      HideLoading();
    }
  });
}

function updateOrderTree() {
  ShowLoading();
  var zTree = ($.fn as any).zTree.getZTreeObj("treeRight");
  var nodes = zTree.transformToArray(zTree.getNodes());
  var data = nodes.map(function (a: any) { return { id: a.id, pId: a.pId }; });
  $.ajax({
    type: 'PUT',
    dataType: "json",
    headers: {
      Authorization : 'Bearer ' + localStorage.getItem('jwt')
    },
    url: `${environment.baseApiUrl}/api/Right/UpdateOrder/${JSON.stringify(data)}`,
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
