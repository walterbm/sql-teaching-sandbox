// Using SqlSandbox wrapper
var sandbox = new SqlSandbox();

// Create database
sandbox.runCommand("CREATE TABLE test (firstName, lastName);");

// Seed database
sandbox.runCommand("INSERT INTO test VALUES ('Hello','World')");
sandbox.runCommand("INSERT INTO test VALUES ('Eve', 'Jackson')");
sandbox.runCommand("INSERT INTO test VALUES ('John', 'Doe')");
sandbox.runCommand("INSERT INTO test VALUES ('Adam','Johnson')");
sandbox.runCommand("INSERT INTO test VALUES ('Jill', 'Smith')");







