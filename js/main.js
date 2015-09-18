//Create a text database
var db = new SQL.Database();
// Run a query without reading the results
db.run("CREATE TABLE test (col1, col2);");
// Insert two rows: (1,111) and (2,222)
db.run("INSERT INTO test VALUES (?,?), (?,?)", ["Hello","World","ROW","TWO"]);

// Prepare a statement
var statement = $("#commands").text();
var executed = db.prepare(statement);
executed.getAsObject({$start:1, $end:1}); // {col1:1, col2:111}

// Bind new values
executed.bind({$start:1, $end:2});
while(executed.step()) { //
    var row = executed.getAsObject();
    $('#result').append(row.col1 +' '+ row.col2+"<br>");
}
