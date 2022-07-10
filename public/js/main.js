/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./resources/assets/js/main.js ***!
  \*************************************/
var sidebar = document.getElementById('sidebar');

function sidebarToggle() {
  if (sidebar.style.display === "none") {
    sidebar.style.display = "block";
  } else {
    sidebar.style.display = "none";
  }
}

var profileDropdown = document.getElementById('ProfileDropDown');

function profileToggle() {
  if (profileDropdown.style.display === "none") {
    profileDropdown.style.display = "block";
  } else {
    profileDropdown.style.display = "none";
  }
}
/**
 * ### Modals ###
 */


function toggleModal(action, elem_trigger) {
  elem_trigger.addEventListener('click', function () {
    if (action == 'add') {
      var modal_id = this.dataset.modal;
      document.getElementById("".concat(modal_id)).classList.add('modal-is-open');
    } else {
      // Automaticlly get the opned modal ID
      var _modal_id = elem_trigger.closest('.modal-wrapper').getAttribute('id');

      document.getElementById("".concat(_modal_id)).classList.remove('modal-is-open');
    }
  });
} // Check if there is modals on the page


if (document.querySelector('.modal-wrapper')) {
  // Open the modal
  document.querySelectorAll('.modal-trigger').forEach(function (btn) {
    toggleModal('add', btn);
  }); // close the modal

  document.querySelectorAll('.close-modal').forEach(function (btn) {
    toggleModal('remove', btn);
  });
}
/******/ })()
;