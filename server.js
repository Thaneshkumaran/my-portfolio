// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'thanesh',
  password: '123456',
  database: 'myporthfilo'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Serve the static HTML file (if needed)
app.use(express.static(__dirname));

// Handle form submission
app.post('/submit-form', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Insert form data into MySQL
  const query = 'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, email, subject, message], (err, results) => {
    if (err) {
      console.error('Error saving data:', err);
      res.status(500).send('Error saving data');
      return;
    }
    res.send('Message received! We will get back to you soon.');
  });
});

app.listen(3003, () => {
  console.log('Server running on http://localhost:3003');
  
});
connection.commit(error => {
  if (error) {
      return connection.rollback(() => {
          console.error('Error in transaction:', error);
      });
  }
  console.log('Transaction Completed.');
});
