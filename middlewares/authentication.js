const jwt = require("jsonwebtoken");
const crypto = require("node:crypto");
require("dotenv").config();
const fs = require("fs");

const VALID_CLIENT_ID = process.env.CLIENT_ID; // Allowed client IDs
const publicKey = fs.readFileSync("./public-key.pem");
const privateKey = fs.readFileSync("./private-key.pem");

function generateToken(req, res) {
  console.log("test jalan ga?");
  const { grantType } = req.body;
  const timestamp = req.header("X-TIMESTAMP");
  const clientId = req.header("X-CLIENT-KEY");
  const signature = req.header("X-SIGNATURE");

  // 1. Validate Request Headers & Client ID
  if (!timestamp || !clientId || !signature) {
    return res.status(400).json({ error: "Missing required headers" });
  }
  if (!VALID_CLIENT_ID.includes(clientId)) {
    return res.status(401).json({ error: "Invalid client ID" });
  }

  // 2. Construct StringToSign for Signature Verification
  const StringToSign = `${clientId}|${timestamp}`;

  // 3. Verify Signature
  const verify = crypto.verify(
    "RSA-SHA256",
    StringToSign,
    publicKey,
    Buffer.from(signature, "base64")
  );

  if (!verify) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  // 4. Generate JWT Token (Your Logic)
  const payload = {
    iss: "your_api_server",
    sub: clientId, // Optional: Add client_id as the subject
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 900, // 1 hour (Adjust as needed)
  });

  res.json({
    responseCode: "2007300",
    responseMessage: "Successful",
    accessToken: token,
    tokenType: "Bearer",
    expiresIn: 900,
  });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from 'Bearer <token>' format

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    // Verify with the public key, assuming RS256 signing
    const decoded = crypto.verify('RSA-SHA256', token, publicKey, Buffer.from(token, "base64"));
    req.user = decoded; // Attach the decoded payload to the request
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Access token expired" });
    } else {
      console.error("Error verifying token:", err); // Log the error for debugging
      return res.status(403).json({ error: "Invalid access token" });
    }
  }
}

module.exports = { generateToken, authenticateToken };
