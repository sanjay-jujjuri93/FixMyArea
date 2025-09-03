// backend/middleware/roleAuth.js
const jwt = require('jsonwebtoken');

/**
 * Role-based authorization middleware
 * @param {Array<string>} roles - Array of allowed roles (e.g., ['admin', 'manager'])
 */
const roleAuth = (roles = []) => {
  return (req, res, next) => {
    try {
      // Get token from header
      let token = req.header('x-auth-token');

      // Also support Authorization: Bearer <token>
      if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
      }

      // If no token
      if (!token) {
        return res.status(401).json({ success: false, msg: 'No token, authorization denied' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded || !decoded.user) {
        return res.status(401).json({ success: false, msg: 'Invalid token payload' });
      }

      req.user = decoded.user;

      // Check role
      if (roles.length > 0 && !roles.includes(req.user.role)) {
        return res.status(403).json({ success: false, msg: 'Access denied: Insufficient privileges' });
      }

      next();
    } catch (err) {
      console.error('Auth Middleware Error:', err.message);
      res.status(401).json({ success: false, msg: 'Token is not valid or expired' });
    }
  };
};

module.exports = roleAuth;
