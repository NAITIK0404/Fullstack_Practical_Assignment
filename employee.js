// employee.js

import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'your_username', // Replace with your MySQL username
    password: 'your_password', // Replace with your MySQL password
    database: 'employee_db',
};

async function connectToDatabase() {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
    return connection;
}

async function insertEmployee(connection, name, position, salary) {
    const query = 'INSERT INTO employee (name, position, salary) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [name, position, salary]);
    console.log(`Inserted employee with ID: ${result.insertId}`);
}

async function displayEmployees(connection) {
    const query = 'SELECT * FROM employee';
    const [rows] = await connection.execute(query);
    console.log('Employee Records:');
    console.table(rows);
}

async function main() {
    const connection = await connectToDatabase();

    try {
        // Insert a new employee record
        await insertEmployee(connection, 'John Doe', 'Software Engineer', 60000);
        
        // Display all employee records
        await displayEmployees(connection);
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await connection.end(); // Close the connection
        console.log('Connection closed');
    }
}

main();
