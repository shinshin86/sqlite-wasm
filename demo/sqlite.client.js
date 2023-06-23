import SqliteClient from '/src/sqlite.client.mjs';

const sqliteClient = new SqliteClient('/db.sqlite3', '/src/sqlite.worker.mjs');

await sqliteClient.init();

await sqliteClient.executeSql('CREATE TABLE IF NOT EXISTS t(a,b)');

for (let i = 20; i <= 25; ++i) {
  await sqliteClient.executeSql('INSERT INTO t(a,b) VALUES (?,?)', [i, i * 2]);
}

const rows = await sqliteClient.executeSql('SELECT a FROM t ORDER BY a LIMIT 3');

console.log(rows);

document.getElementById('sqlite-client').innerHTML =
  '<table>' +
  '<thead>' +
  '<tr>' +
  '<th>a</th>' +
  '</tr>' +
  '</thead>' +
  '<tbody>' +
  rows.map((row) => '<tr><td> ' + row[0] + '</td></tr>').concat();
'</tbody>' + '</table>';
