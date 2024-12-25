import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_jwt_secret_key';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Access denied, no token provided' });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified; 
    next();
  } catch (error) {
    res.status(403).send({ message: 'Invalid or expired token' });
  }
};

export default  authenticateToken;
