// Using SqlSandbox wrapper
var db = new SqlSandbox();

// Create database
db.runCommand("CREATE TABLE test (firstName, lastName);");

// Seed database
db.runCommand("INSERT INTO test VALUES (?,?)", ["Hello","World"]);
db.runCommand("INSERT INTO test VALUES (?,?)", ["Eve", "Jackson"]);
db.runCommand("INSERT INTO test VALUES (?,?)", ["John", "Doe"]);
db.runCommand("INSERT INTO test VALUES (?,?)", ["Adam","Johnson"]);
db.runCommand("INSERT INTO test VALUES (?,?)", ["Jill", "Smith"]);

// Execute command and collect result
var executed = db.executeCommand("SELECT * FROM test");




