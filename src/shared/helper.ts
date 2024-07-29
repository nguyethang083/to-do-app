const jwt = require('jsonwebtoken');

const token = jwt.sign({ userId: 123, role: 'user' }, process.env.JWT_SECRET, {
  expiresIn: '1h',
});

console.log(token);
