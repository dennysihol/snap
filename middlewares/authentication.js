const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const clientCredentials = {
  pinjam_duit_snap_bca : bcrypt.hashSync('snap_bca_pinjamDuit', 10),
};

function generateToken (req, res) {
  const { client_id, client_secret } = req.body;

  if (!client_id || !client_secret) {
    return res.status(400).json({ error: 'Client ID and secret are required' });
  }

  const storedHash = clientCredentials[client_id];
  if (storedHash && bcrypt.compareSync(client_secret, storedHash)) {
    const payload = {
      iss: 'your_api_server', 
      sub: client_id, // Optional: Add client_id as the subject of the token
      // Add other claims as needed (e.g., roles, permissions)
    };

    const token = jwt.sign(payload, 'snap_bca_pinjamDuit', {
      expiresIn: 3600, // Token expires in 1 hour
    });

    res.json({
      access_token: token,
      token_type: 'Bearer',
      expires_in: 3600,
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>' format

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, 'snap_bca_pinjamDuit');
    req.user = decoded; // Attach the decoded payload to the request
    next(); // Proceed to the actual route handler
  } catch (err) {
    res.status(403).json({ error: 'Invalid access token' });
  }
}

  module.exports = {generateToken, authenticateToken}
