const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Handle both JWT payload structures
    if (decoded.user) {
      req.user = decoded.user;
    } else if (decoded.id) {
      // If JWT payload has direct user properties
      req.user = {
        id: decoded.id,
        role: decoded.role,
        name: decoded.name
      };
    } else {
      return res.status(401).json({ msg: 'Invalid token structure' });
    }
    
    console.log('Auth middleware - req.user set to:', req.user);
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};