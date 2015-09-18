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


$.get('sql/SCOTUS.sqlite', function(data){
  // var uInt8Array = new Uint8Array(e);
  // var db = new SQL.Database(uInt8Array);
  // var contents = db.exec("SELECT * FROM my_table");
  // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]
});


// // Prepare a statement
// var statement = $("#commands").text();
// var executed = db.prepare(statement);
// executed.getAsObject(); // {col1:1, col2:111}

// // Bind new values
// while(executed.step()) { //
//     var row = executed.getAsObject();
//     var rowElement = "<tr><td>"+row.firstName+"</td><td>"+row.lastName+"</td></tr>";
//     $('#results').append(rowElement);
// }



