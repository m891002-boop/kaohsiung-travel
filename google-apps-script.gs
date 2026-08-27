function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("結果") || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const d = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(), d.className || "", d.number || "", d.name || "",
    d.type || "", d.place || "",
    d.A || 0, d.B || 0, d.C || 0, d.D || 0, d.E || 0
  ]);
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}