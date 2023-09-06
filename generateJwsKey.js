const fs = require('fs');
const crypto = require('crypto');

const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log('JWT_SECRET:', jwtSecret);

// Write the JWT_SECRET to a .env file
fs.writeFileSync('.env', `JWT_SECRET=${jwtSecret}\n`, { flag: 'a' });
