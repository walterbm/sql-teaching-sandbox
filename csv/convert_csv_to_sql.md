# Instructions to add a new database

1. Save raw CSV file into `/csv` folder.
2. Launch sqlite CLI with `sqlite3` terminal command.
3. `sqlite> create table [tableName]([column] [type]);`
  e.g.
    `create table FIREHOUSES(FacilityName text,FacilityAddress text,Borough text);`
    `create table SCOTUS(term integer, justice text,justiceName text,code text, post_mn integer, post_sd integer, post_med integer,post_025 integer,post_975 integer);`
    `create table FORTUNE500(year integer, rank integer, company text, revenue integer, profit integer);`

4. `sqlite> .mode list`
5. `sqlite> .separator ,`
6. `sqlite> .import csv/[csvFile].csv [tableName]`
7. `sqlite> .save sql/[tableName].sqlite`
8. Update `index.html` to include `<li>` for new database.
