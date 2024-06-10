const path = require('path');
const express = require('express');
const router = express.Router();
const Database = require('../controllers/transactionController');

const db = new Database(path.join(__dirname, '..', 'db', 'database.db'));

// Get all transaction
router.get('/transaction', (req, res) => {
  db.getAllTransactions((err, transactions) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch transactions' });
    } else {
      res.json(transactions);
    }
  });
});
// Get transactio by id
router.get('/transaction/:id', (req, res) => {
  db.getTransactionById(req.params.id, (err, transaction) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch transaction' });
    } else if(!transaction[0]) {
        res.status(404).json({error:'id not found'})
    } else{
      res.json(transaction);
    }
  });
});

// Add a new transaction
router.post('/transaction', (req, res) => {
  if (!req.body.description || !req.body.hasOwnProperty('isExpense') || !req.body.amount) {
    res.status(400).json({ error: 'Request body incomplete' });
    return;
  }

  db.addTransaction(req.body, (err, transaction) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add transaction' });
    } else {
      res.json(transaction);
    }
  });
});

// Update existing transaction by id
router.put('/transaction/:id', (req, res) => {
  if (!req.body.description || !req.body.hasOwnProperty('isExpense') || !req.body.amount || !req.body.date) {
    res.status(400).json({ error: 'Request body incomplete' });
    return;
  }

  db.updateTransaction(req.params.id, req.body, (err, transaction) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update transaction' });
    } else {
      res.json(transaction);
    }
  });
});

// delete transaction by id
router.delete('/transaction/:id', (req,res) =>{
    db.deleteTransaction(req.params.id, (err, message) =>{
        if(err){
          res.status(500).json({ error: 'deletion failed' });
        } else{
            res.json(message);
        }
    });
});

module.exports = router;
