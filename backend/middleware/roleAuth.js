const roleAuth = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ msg: 'User not authenticated' });
    }

    if (roles.length > 0 && !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Access denied: Insufficient privileges' });
    }

    next();
  };
};

module.exports = roleAuth;