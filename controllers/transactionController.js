const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor(dbPath) {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error connecting to database:', err.message);
      } else {
        console.log('Connected to the SQLite database.');
        this.createTable();
      }
    });
  }

  createTable() {
    this.db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            description TEXT NOT NULL,
            isExpense INTEGER NOT NULL,
            amount INTEGER NOT NULL
        )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table "transactions" created successfully.');
      }
    });
  }

  getAllTransactions(callback) {
    this.db.all('SELECT * FROM transactions', (err, rows) => {
      if (err) {
        console.error('Error fetching transactions:', err.message);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }
  getTransactionById(transaction_id, callback) {
    this.db.all('SELECT * FROM transactions where id=?',[transaction_id], (err, rows) => {
      if (err) {
        console.error('Error fetching transactions:', err.message);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  addTransaction(req_body, callback) {
    this.db.run('INSERT INTO transactions (date, description,isExpense,amount) VALUES (date("now","localtime"), ?,?,?)', [req_body.description,req_body.isExpense,req_body.amount], function (err) {
      if (err) {
        console.error('Error adding transaction:', err.message);
        callback(err, null);
      } else {
        callback(null, { id: this.lastID});
      }
    });
  }
  updateTransaction(transaction_id, req_body, callback) {
      this.db.run(`
          UPDATE transactions
          SET date = date(?),
          description = ?,
          isExpense = ?,
          amount = ?
          WHERE id = ?
          `, [req_body.date,req_body.description,req_body.isExpense,req_body.amount,transaction_id], function (err) {

      if (err) {
        console.error('Error updating transaction:', err.message);
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, req_body});
      }
    });
  }
  deleteTransaction(transaction_id, callback) {
    this.db.run('DELETE FROM transactions WHERE id=?', [transaction_id], function (err) {
      if (err) {
        console.error('Error adding transaction:', err.message);
        callback(err, null);
      } else {
        callback(null, { message: 'delete successful'});
      }
    });
  }
}

module.exports = Database;
