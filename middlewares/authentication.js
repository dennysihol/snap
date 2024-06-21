const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
const moment = require("moment");
const crypto = require("crypto");

const VALID_CLIENT_ID = process.env.CLIENT_ID;
const publicKey = fs.readFileSync("./publicKey.pem", "utf8");
const privateKey = fs.readFileSync("./privateKey.pem", "utf8");
const publicKeyBCA = fs.readFileSync("./publicKeyBCA.pem", "utf8");

function generateToken(req, res) {
  const { grantType } = req.body;
  const timestamp = req.header("X-TIMESTAMP"); // In ISO 8601 format
  const clientId = req.header("X-CLIENT-KEY");
  const signature = req.header("X-SIGNATURE");

  // 1. Validate Request Headers & Client ID
  if (!timestamp || !clientId || !signature) {
    return res.status(400).json({
      responseCode: 4007301,
      responseMessage:
        "Invalid field format [clientId/clientSecret/grantType/X-TIMESTAMP]",
    });
  }
  if (clientId !== VALID_CLIENT_ID) {
    return res.status(401).json({
      responseCode: 4007300,
      responseMessage: "Unauthorized. [Unknown Client]",
    });
  }

  // 2. Validate Timestamp
  const now = moment();
  const oneHourAgo = now.clone().subtract(1, "hour");
  const requestTime = moment(timestamp, moment.ISO_8601, true);

  if (!requestTime.isValid()) {
    return res.status(400).json({
      responseCode: 4007301,
      responseMessage: "Invalid field format [X-TIMESTAMP]",
    });
  }

  if (requestTime.isBefore(oneHourAgo) || requestTime.isAfter(now)) {
    return res.status(401).json({
      responseCode: 4007301,
      responseMessage: "Invalid field format [X-TIMESTAMP]",
    });
  }

  // 4. Verify Signature
  try {
    // const verified = jwt.verify(signature, publicKeyBCA, {
    //   algorithms: ["RS256"]
    // });
    const StringToSign = `${clientId}|${timestamp}`;
    const verified = crypto.verify(
      "RSA-SHA256",
      StringToSign,
      publicKeyBCA,
      Buffer.from(signature, "base64")
    );

    if (!verified) {
      return res.status(401).json({
        responseCode: 4007300,
        responseMessage: "Unauthorized. [Connection not Allowed]",
      });
    } else {
      const payload = {
        iss: "https://api-test.pinjamduit.co.id",
        sub: clientId,
        iat: Math.floor(Date.now() / 1000), // issued at claim (current time in seconds)
      };

    
      // const token = jwt.sign(payload, privateKey, {
      //   algorithm: "RS256",
      //   expiresIn: 3600, // 1 hour
      // });

      const dataBuffer = Buffer.from(JSON.stringify(payload), 'utf8');
    
      const token = crypto
        .sign("RSA-SHA256", dataBuffer, privateKey)
        .toString("base64");
    
      res.json({
        responseCode: "2007300",
        responseMessage: "Successful",
        accessToken: token,
        tokenType: "Bearer",
        expiresIn: 3600,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      responseCode: 4007300,
      responseMessage: "Unauthorized. [Signature]",
    });
  }

  // 5. Generate and Return JWT Token
  
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'
  console.log(token);

  if (!token) {
    return res.status(401).json({ responseMessage: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ responseMessage: "Access token expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ responseMessage: "Invalid access token" });
    } else {
      console.error("Error verifying token:", err);
      return res.status(500).json({ responseMessage: "Internal Server Error" });
    }
  }
}

module.exports = { generateToken, authenticateToken };
