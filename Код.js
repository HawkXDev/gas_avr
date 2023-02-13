function doGet(e) {
   if (e.parameters.v == "res") {
      return loadResult(e.parameters.n);
   } else {
      return HtmlService.createTemplateFromFile("page").evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
   }
}

function loadResult(n) {
   var tmp = HtmlService.createTemplateFromFile("result");

   var nn = n[0].split('_');
   PropertiesService.getScriptProperties().setProperty('nnvalue', JSON.stringify(nn));

   var article1 = {};
   article1.article = ws_datafile.getRange(nn[0], 2).getValue();
   article1.name = ws_datafile.getRange(nn[0], 3).getValue();
   article1.avrScheme = ws_datafile.getRange(nn[0], 1).getValue();
   article1.manufacturer = ws_datafile.getRange(nn[0], 4).getValue();
   article1.typeDevice = ws_datafile.getRange(nn[0], 5).getValue();
   article1.vremyaVzvoda = ws_datafile.getRange(nn[0], 6).getValue();
   article1.plc = ws_datafile.getRange(nn[0], 7).getValue();
   article1.modulExt = ws_datafile.getRange(nn[0], 8).getValue();
   article1.oldSchema = ws_datafile.getRange(nn[0], 9).getValue();
   article1.zipRef = ws_datafile.getRange("O" + nn[0]).getValue();
   article1.urlSpecXlsx = ws_datafile.getRange("L" + nn[0]).getValue();

   var article2 = {};
   article2.article = ws_datafile.getRange(nn[1], 2).getValue();
   article2.name = ws_datafile.getRange(nn[1], 3).getValue();
   article2.avrScheme = ws_datafile.getRange(nn[1], 1).getValue();
   article2.manufacturer = ws_datafile.getRange(nn[1], 4).getValue();
   article2.typeDevice = ws_datafile.getRange(nn[1], 5).getValue();
   article2.vremyaVzvoda = ws_datafile.getRange(nn[1], 6).getValue();
   article2.plc = ws_datafile.getRange(nn[1], 7).getValue();
   article2.modulExt = ws_datafile.getRange(nn[1], 8).getValue();
   article2.oldSchema = ws_datafile.getRange(nn[1], 9).getValue();
   article2.zipRef = ws_datafile.getRange("O" + nn[1]).getValue();
   article2.urlSpecXlsx = ws_datafile.getRange("L" + nn[1]).getValue();

   tmp.article1 = article1;
   tmp.article2 = article2;

   return tmp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}