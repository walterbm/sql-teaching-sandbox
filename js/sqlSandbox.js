function SqlSandbox(){
  this.db = new SQL.Database();
}

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
  return this.db.exec(commandString);
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

SqlSandbox.prototype.addResultToPage = function(results){
  var rowElement = "<tr><td>"+row.justiceName+"</td><td>"+row.post_mn+"</td></tr>";
  $('#results').append(rowElement);
};

