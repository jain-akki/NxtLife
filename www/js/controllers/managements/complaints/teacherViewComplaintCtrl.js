(function() {

  "use strict";

  angular.module('yugma')

  .controller('managementTeacherViewComplaintCtrl',

  function ($scope, $state, $stateParams, $ionicHistory, USER, managementComplaintService, customService, $ionicViewSwitcher) {

    var vm = this;

    vm.cmplId = $stateParams.complaintId;
    vm.name = $stateParams.name;

    customService._on();

    managementComplaintService.viewTeacherComplaint(vm.cmplId).then(function(response) {

      customService._off();

      if (response.statusId === 4 || response.statusId === 6) {
        $("#editBtn").css("display", "none");
      }

      vm.cmpl = response;

      angular.extend(vm.cmpl, {
        date: moment(vm.cmpl.createdAt).format("DD-MM-YYYY"),
        closedDate: moment(vm.cmpl.closedOn).format("DD-MM-YYYY"),
        name: $stateParams.name
      });

    });

    vm.goToEdit = function() {

      var data = {
        name: vm.cmpl.name,
        cmplId: vm.cmplId,
        priority: vm.cmpl.priorityId,
        assigned: vm.cmpl.authorityId,
        status: vm.cmpl.statusId
      }

      $state.go("management.edit", {obj: data}, {reload: true});
    }

    vm.addComment = function() {

      var complaint = {
        id: vm.cmpl.id,
        name: vm.name,
        title: vm.cmpl.title,
        status: vm.cmpl.statusId
      }

      $ionicViewSwitcher.nextDirection("forward");
      $state.go("management.add-comment", {obj: complaint}, {reload: false});

    }

    vm.goBack = function () {

      if ($stateParams.name === "assignTeacher") {
        $ionicViewSwitcher.nextDirection("back");
        $state.go("management.assignComplaint.assignTeacherComplaint", {}, {reload: false});  
      } else {
        $ionicViewSwitcher.nextDirection("back");
        $state.go("management.complaints.teacher-complaint", {}, {reload: false});
      }

    }

  });

})();