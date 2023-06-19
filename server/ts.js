const crypto = require('crypto');

// Generate a secure random key
const privateKey = crypto.randomBytes(64).toString('hex');

console.log(privateKey);
