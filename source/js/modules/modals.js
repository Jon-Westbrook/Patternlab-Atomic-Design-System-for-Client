/* eslint-disable import/extensions */
import * as util from "./util.js";

// Setup the Invoice Modal Edit Pane Buttons, Etc.
export function initEditPane() {
  $(".invoice-save-draft").show();
  $(".pills-edit-tab").hide();
  $(".invoice-send").hide();
  $(".pills-preview-tab").show();
  $(".invoice-page-heading").html("Create Invoice");
}

// Setup the Invoice Modal Preview Buttons, Etc.
export function initPreviewPane() {
  $(".invoice-save-draft").hide();
  $(".pills-edit-tab").show();
  $(".invoice-send").show();
  $(".pills-preview-tab").hide();
  $(".cancel").html("Close");
  $(".invoice-page-heading").html("Preview Invoice");
  $($.fn.dataTable.tables(true))
    .DataTable()
    .columns.adjust();
}

// New Sale Modal - Updates Subtotal Field after entering an amount
let saleAmount;

export function updateSubtotal() {
  const amount = this;
  const parsedAmount = parseInt(this.value, 10);
  const subTotal = document.querySelector(".subTotal");
  const taxRate = document.querySelector(".taxRate");
  const total = document.querySelector(".total");
  if (!isNaN(parsedAmount)) {
    amount.value = parsedAmount.toFixed(2);
    saleAmount = parseInt(parsedAmount.toFixed(2), 10);
    subTotal.innerHTML = `$${parsedAmount.toFixed(2)}`;
    taxRate.innerHTML = `—`;
    total.innerHTML = `—`;
  } else {
    amount.value = (0).toFixed(2);
    subTotal.innerHTML = `$${(0).toFixed(2)}`;
    taxRate.innerHTML = `—`;
    total.innerHTML = `—`;
    document.querySelectorAll(".charge").forEach(btn => {
      btn.innerHTML = `Charge`;
    });
  }
}

// Example Calculate Totals, after CC has been entered
// could be extended to fetch customer's tax rate based on business rules
export function calculateTotals() {
  if (!isNaN(parseInt(saleAmount, 10))) {
    const taxRate = document.querySelector(".taxRate");
    const total = document.querySelector(".total");
    const tax = parseFloat(saleAmount * 0.035).toFixed(2);
    taxRate.innerHTML = `$${tax}`;
    total.innerHTML = `$${saleAmount + tax}`;
    document.querySelectorAll(".charge").forEach(btn => {
      btn.innerHTML = `Charge $${saleAmount + tax}`;
    });
  }
}

// Modal Header Animation
export function animateModalHeader(currentModal) {
  currentModal.addEventListener("scroll", () => {
    const miniHeader = currentModal.querySelector(".mini-header");
    const miniRect = miniHeader.getBoundingClientRect();
    const miniTop = miniRect.top;
    const push = currentModal.scrollTop - 170;
    if (currentModal.scrollTop >= 170 && currentModal.scrollTop <= 255) {
      miniHeader.classList.add("show");
      miniHeader.style.top = `${-85 + push}px`;
    } else if (currentModal.scrollTop > 255) {
      miniHeader.style.top = `${0}px`;
    } else if (currentModal.scrollTop < 170) {
      miniHeader.classList.remove("show");
    }
  });
}

// Reset Modal
export function resetInvoice() {
  $("[href='#pills-edit']").tab("show");
  $("#pills-edit form")[0].reset();
}
