// backend/middleware/roleAuth.js
const jwt = require('jsonwebtoken');

/**
 * Role-based authorization middleware
 * @param {Array<string>} roles - Array of allowed roles (e.g., ['admin', 'manager'])
 */
const roleAuth = (roles = []) => {
  return (req, res, next) => {
    try {
      // Check if req.user exists (set by auth middleware)
      if (!req.user) {
        console.log('RoleAuth middleware - No req.user found');
        return res.status(401).json({ success: false, msg: 'User not authenticated' });
      }

      console.log('RoleAuth middleware - req.user:', req.user);
      console.log('RoleAuth middleware - required roles:', roles);
      console.log('RoleAuth middleware - user role:', req.user.role);

      // Check role
      if (roles.length > 0 && !roles.includes(req.user.role)) {
        console.log('RoleAuth middleware - Access denied for role:', req.user.role);
        return res.status(403).json({ success: false, msg: 'Access denied: Insufficient privileges' });
      }

      console.log('RoleAuth middleware - Access granted for role:', req.user.role);
      next();
    } catch (err) {
      console.error('RoleAuth Middleware Error:', err.message);
      res.status(500).json({ success: false, msg: 'Server error in role authorization' });
    }
  };
};

module.exports = roleAuth;
