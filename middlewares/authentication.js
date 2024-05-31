const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
const moment = require('moment');

const VALID_CLIENT_ID = process.env.CLIENT_ID; 
const publicKey = fs.readFileSync("./public-key.pem", 'utf8');
const privateKey = fs.readFileSync("./private-key.pem", 'utf8');

function generateToken(req, res) {
    const { grantType } = req.body;
    const timestamp = req.header("X-TIMESTAMP"); // In ISO 8601 format
    const clientId = req.header("X-CLIENT-KEY");
    const signature = req.header("X-SIGNATURE");

    // 1. Validate Request Headers & Client ID
    if (!timestamp || !clientId || !signature) {
        return res.status(400).json({ error: "Missing required headers" });
    }
    if (clientId !== VALID_CLIENT_ID) {
        return res.status(401).json({ error: "Invalid client ID" });
    }

    // 2. Validate Timestamp
    const now = moment();
    const oneHourAgo = now.clone().subtract(1, 'hour');
    const requestTime = moment(timestamp);

    if (!requestTime.isValid()) {
        return res.status(400).json({ error: "Invalid timestamp format" });
    }

    if (requestTime.isBefore(oneHourAgo) || requestTime.isAfter(now)) {
        return res.status(401).json({ error: "Timestamp out of range" });
    }

    const StringToSign = `${clientId}|${timestamp}`;

    const xSignature = jwt.sign(StringToSign, privateKey, { algorithm: 'RS256' });
    console.log("JWT generated:", xSignature);

    if(xSignature !== signature) {
        return res.status(401).json({ error: "Invalid signature" });
    }

    // 4. Generate JWT Token
    const payload = {
        iss: "your_api_server",
        sub: clientId,
        iat: Math.floor(Date.now() / 1000), 
    };

    const token = jwt.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: 3600, 
    });

    res.json({
        responseCode: "2007300",
        responseMessage: "Successful",
        accessToken: token,
        tokenType: "Bearer",
        expiresIn: 3600,
    });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
    req.user = decoded; 
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Access token expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ error: "Invalid access token" });
    } else {
      console.error("Error verifying token:", err); 
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = { generateToken, authenticateToken };
