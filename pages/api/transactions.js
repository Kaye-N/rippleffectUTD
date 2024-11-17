import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error('Failed to connect to the database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Fetch all transactions
        db.all('SELECT * FROM transactions', [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json(rows);
            }
        });
    } else if (req.method === 'POST') {
        // Add a new transaction
        const { user_id, amount, description, date } = req.body;
        const query = `INSERT INTO transactions (user_id, amount, description, date) VALUES (?, ?, ?, ?)`;
        db.run(query, [user_id, amount, description, date], function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ id: this.lastID, user_id, amount, description, date });
            }
        });
    } else {
        // Handle unsupported methods
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
