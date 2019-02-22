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
