const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = 3000;

// Set up Sequelize to connect to your MySQL database.
// Replace 'database_name', 'username', and 'password' with your actual database credentials.
const sequelize = new Sequelize('database_name', 'username', 'password', {
host: 'localhost',
dialect: 'mysql',
});

// Define the User model for the users table
const User = sequelize.define('User', {
id: {
type: DataTypes.INTEGER,
primaryKey: true,
autoIncrement: true,
},
name: {
type: DataTypes.STRING,
allowNull: false,
},
email: {
type: DataTypes.STRING,
allowNull: false,
unique: true,
validate: {
isEmail: true,
},
},
status: {
type: DataTypes.STRING,
defaultValue: 'active',
},
}, {
tableName: 'users', // Specify the table name
timestamps: false, // Disable createdAt/updatedAt if your table doesn't have them
});

// Test the database connection
sequelize.authenticate()
.then(() => console.log('Connection established successfully.'))
.catch(err => console.error('Unable to connect to the database:', err));

// Define the /users route to fetch and return all users
app.get('/users', async (req, res) => {
try {
const users = await User.findAll();
res.json(users);
} catch (error) {
console.error('Error fetching users:', error);
res.status(500).json({ error: 'An error occurred while fetching users' });
}
});

// Start the server
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});