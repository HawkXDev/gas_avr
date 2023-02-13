var url_datafile = "https://docs.google.com/spreadsheets/d/1RkmT145G-KQcsSw0YTKjsH5cdfxwRjsyscBdblOJiOc/edit#gid=115958889";
var ss_datafile = SpreadsheetApp.openByUrl(url_datafile);
var ws_datafile = ss_datafile.getSheetByName("Data");

var url_log = "https://docs.google.com/spreadsheets/d/1wEUj_iWNYkEuRthcO_cACwYDNXNUoqvfLbAkJnWlCSQ/edit#gid=0";
var ss_log = SpreadsheetApp.openByUrl(url_log);

function btnChooseClicked(enteredInfo) {
   var ws_log = ss_log.getSheetByName("Logs");
   ws_log.appendRow([new Date(), enteredInfo.avrScheme, enteredInfo.powerUnit, enteredInfo.plcSupplyVoltage, enteredInfo.manufacturer, enteredInfo.typeDevice]);
}

function openPage(ua) {
   var ws_log = ss_log.getSheetByName("Logs3");
   ws_log.appendRow([new Date(), ua]);
}

function aClicked(info) {
   var ws_log = ss_log.getSheetByName("Logs2");
   ws_log.appendRow([new Date(), info.v, info.t]);
}

function aDocArt1Click() {
   google.script.run.aClicked({ v: "doc", t: document.getElementById("divVariant1").innerText });
}
function aSpecArt1Click() {
   google.script.run.aClicked({ v: "spec", t: document.getElementById("divVariant1").innerText });
}
function aDocArt2Click() {
   google.script.run.aClicked({ v: "doc", t: document.getElementById("divVariant2").innerText });
}
function aSpecArt2Click() {
   google.script.run.aClicked({ v: "spec", t: document.getElementById("divVariant2").innerText });
}

function returnListBrands(enteredInfo) {
   if (enteredInfo.avrScheme != '' && enteredInfo.powerUnit != '' && enteredInfo.plcSupplyVoltage != '') {
      var end_text_for_name = "для схем на контакторах";

      if (enteredInfo.powerUnit == "автоматические выключатели") {
         end_text_for_name = "для схем на авт. выкл.";
      }

      var list_brands = [];
      var data = ws_datafile.getDataRange().getValues();

      for (let i = 1; i < data.length; i++) {
         if (data[i][0] == enteredInfo.avrScheme && data[i][2].endsWith(end_text_for_name)) {
            list_brands.push(data[i][3]);
         }
      }

      list_brands = unique(list_brands).sort();
      return list_brands;
   }
}

function returnListTypes(enteredInfo) {
   if (enteredInfo.avrScheme != '' && enteredInfo.powerUnit != '' && enteredInfo.plcSupplyVoltage != '' && enteredInfo.manufacturer != '') {
      var end_text_for_name = "для схем на контакторах";
      if (enteredInfo.powerUnit == "автоматические выключатели")
         end_text_for_name = "для схем на авт. выкл.";

      var list_types = [];
      var data = ws_datafile.getDataRange().getValues();

      for (let i = 1; i < data.length; i++) {
         if (data[i][0] == enteredInfo.avrScheme &&
            data[i][2].endsWith(end_text_for_name) &&
            data[i][3] == enteredInfo.manufacturer) {
            list_types.push(data[i][4]);
         }
      }

      list_types = unique(list_types).sort();
      return list_types;
   }
}

function getChooseResult(enteredInfo) {
   var end_text_for_name = "для схем на контакторах";
   if (enteredInfo.powerUnit == "автоматические выключатели")
      end_text_for_name = "для схем на авт. выкл.";

   var chooseRes = [];
   var data = ws_datafile.getDataRange().getValues();

   for (let i = 1; i < data.length; i++) {
      if (data[i][0] == enteredInfo.avrScheme &&
         data[i][2].endsWith(end_text_for_name) &&
         data[i][3] == enteredInfo.manufacturer &&
         data[i][4] == enteredInfo.typeDevice) {
            chooseRes.push(i + 1);
      }
   }

   return chooseRes;
}