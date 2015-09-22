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
    self.executeCommand(commands);
  });
};

SqlSandbox.prototype.loadOnClick = function(self){
  $("#load").on("click", function(){
    self.loadDb("sql/"+$("#load").attr("name")+".sqlite", function(){
      $("#results").text("FINISHED LOADING TABLE: "+$("#load").attr("name"));
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
      $(".alert").slideUp();
      this.addResultToPage();
    }
    else if(commandString.length === 0){
      throw new Error("Empty command");
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

SqlSandbox.prototype.addErrorMessage = function(errorMessage){
  var message = errorMessage.message;
  $("#results").empty();
  $(".alert").slideDown();
  $("#error-message").text(message);
};

