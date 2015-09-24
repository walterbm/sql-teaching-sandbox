function SqlSandbox(){
  this.db = new SQL.Database();
  this.executed = {columns: [], values: []};
  this.createCodeEditor();
  this.addEventListners();
}

SqlSandbox.prototype.createCodeEditor = function(){
  this.editor = CodeMirror(document.getElementById('code'), {
    mode:  'text/x-mysql',
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    matchBrackets : true,
    autofocus: true,
  });
};

SqlSandbox.prototype.addEventListners = function(){
  this.executeOnClick(this);
  this.loadOnClick(this);
};

SqlSandbox.prototype.executeOnClick = function(self){
  $("#execute").on("click", function(){
    $("#results").empty();
    commands = self.editor.getValue();
    $("#previous-command").text(commands);
    self.executeCommand(commands);
  });
};

SqlSandbox.prototype.loadOnClick = function(self){
  $(".load").on("click", function(){
    var tableName = this.name;
    self.loadDb("sql/"+tableName+".sqlite", function(){
      self.addTableName(tableName);
      self.addLoadingMessage(tableName);
    });
  });
};

SqlSandbox.prototype.loadDb = function(database_url, callback){
  var self = this;
  this.ajaxRequest(database_url, function(){
    var uInt8Array = new Uint8Array(this.response);
    self.db = new SQL.Database(uInt8Array);
    callback();
  });
};

SqlSandbox.prototype.ajaxRequest = function(url, callback){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.send();
  xhr.onload = callback;
};

SqlSandbox.prototype.executeCommand = function(commandString){
  var executed;
  try {
    executed = this.db.exec(commandString);
    if(executed.length > 0){ 
      this.executed = executed[0];
      this.addResultToPage();
    }
    else if(commandString.length === 0){
      throw new Error("Code editor is empty");
    }
    else{
      throw new Error("No results");
    }
  }
  catch(exception){
    this.addErrorMessage(exception);
    this.executed = {columns: [], values: []};
  } 
};

SqlSandbox.prototype.runCommand = function(commandString){
  this.db.run(commandString);
};

SqlSandbox.prototype.runCommands = function(commandString){
  var self = this;
  commandArray = commandString.split(';');
  commandArray.forEach(function(command){
    self.runCommand(command);
  });
};

SqlSandbox.prototype.addResultToPage = function(){
  $(".alert").slideUp();
  this.addColNamesToPage();
  this.addRowResultsToPage();
  
};

SqlSandbox.prototype.addRowResultsToPage = function(){
  this.executed.values.forEach(function(row){
    var rowElement = "<tr>";
    row.forEach(function(value){
      rowElement += "<td>"+value+"</td>";
    });
    rowElement += "</tr>";
    $('#results').append(rowElement);
  });
};

SqlSandbox.prototype.addColNamesToPage = function(){
  var colHeadingElement = "<tr>";
  this.executed.columns.forEach(function(column){
    colHeadingElement += "<td><strong>"+column+"</strong></td>";
  });
  colHeadingElement += "</tr>";
  $('#results').append(colHeadingElement);
};

SqlSandbox.prototype.addTableName = function(tableName){
  $("#table-name").text(tableName);
};

SqlSandbox.prototype.addErrorMessage = function(errorMessage){
  var message = errorMessage.message;
  $("#results").empty();
  $(".alert").removeClass("alert-success").addClass("alert-danger");
  $("#alert-header").text("Error!");
  $("#alert-message").text(message);
  $(".alert").slideDown();
};

SqlSandbox.prototype.addLoadingMessage = function(tableName){
  var message = tableName + " table!";
  $("#results").empty();
  $(".alert").removeClass("alert-danger").addClass("alert-success");
  $("#alert-header").text("Loaded!");
  $("#alert-message").text(message);
  $(".alert").slideDown();
};

var sandbox = new SqlSandbox();

// TO DO
// - executing mutiple commands
// - link to SQL learning resources
// - sqlhint?
// - display table schema?
