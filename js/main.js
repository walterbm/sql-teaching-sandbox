//Create a text database
var db = new SQL.Database();
// Run a query without reading the results
db.run("CREATE TABLE test (firstName, lastName);");
// Seed Database
db.run("INSERT INTO test VALUES (?,?)", ["Hello","World"]);
db.run("INSERT INTO test VALUES (?,?)", ["Eve", "Jackson"]);
db.run("INSERT INTO test VALUES (?,?)", ["John", "Doe"]);
db.run("INSERT INTO test VALUES (?,?)", ["Adam","Johnson"]);
db.run("INSERT INTO test VALUES (?,?)", ["Jill", "Smith"]);

// // Prepare a SQL statement for execution
var statement = $("#commands").text();
var executed = db.prepare(statement);
executed.getAsObject();

// Output all database rows
while(executed.step()) {
    var row = executed.getAsObject();
    var rowElement = "<tr><td>"+row.firstName+"</td><td>"+row.lastName+"</td></tr>";
    $('#results').append(rowElement);
}

// Load from local SQLlite DB
var xhr = new XMLHttpRequest();
xhr.open('GET', 'sql/SCOTUS.sqlite', true);
xhr.responseType = 'arraybuffer';

xhr.send();

xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response);
  var db = new SQL.Database(uInt8Array);
  var contents = db.prepare("SELECT * FROM SCOTUS");
  contents.getAsObject();
  while(contents.step()) {
    var row = contents.getAsObject();
    var rowElement = "<tr><td>"+row.justiceName+"</td><td>"+row.post_mn+"</td></tr>";
    $('#results').append(rowElement);
  }
};




