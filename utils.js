function include(filename){
   return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function unique(arr) {
   return Array.from(new Set(arr));
}