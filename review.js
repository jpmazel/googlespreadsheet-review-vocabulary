function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('Réviser');
  menu.addItem('Cacher colonne B', 'hideColumnB');
  menu.addItem('Afficher colonne B', 'showColumnB');
  menu.addItem('Afficher définition suivante', 'showNextDefinition');
  menu.addItem('Réinitialiser la révision', 'resetRevision');
  menu.addToUi();

  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty('currentRow', '2');
}

function hideColumnB() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  sheet.getRange('B2:B' + lastRow).setBackground('black').setFontColor('black');
}

function showColumnB() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  sheet.getRange('B1:B' + lastRow).setBackground('white').setFontColor('black');
}

function showNextDefinition() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();

  var scriptProperties = PropertiesService.getScriptProperties();
  var currentRow = parseInt(scriptProperties.getProperty('currentRow'), 10);

  if (currentRow <= lastRow) {
    var definition = sheet.getRange('B' + currentRow).getValue();
    var ui = SpreadsheetApp.getUi();
    ui.alert('Définition pour la ligne ' + currentRow, definition, ui.ButtonSet.OK);

    // Réinitialiser la couleur de la cellule actuelle de la colonne A
    sheet.getRange('A' + currentRow).setBackground('white');

    currentRow++;

    // Mettre en évidence la cellule suivante de la colonne A
    if (currentRow <= lastRow) {
      sheet.getRange('A' + currentRow).setBackground('#FFA07A');
    }

    scriptProperties.setProperty('currentRow', currentRow.toString());
  } else {
    SpreadsheetApp.getUi().alert('Fin des définitions');
  }
}

function resetRevision() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();

  // Réinitialiser la couleur de toutes les cellules de la colonne A
  sheet.getRange('A2:A' + lastRow).setBackground('white');

  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty('currentRow', '2');
  SpreadsheetApp.getUi().alert('La révision a été réinitialisée');
}