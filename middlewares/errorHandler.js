function errorHandler(err, req, res, next) {
    const errorResponse = {
      message: err.message || 'Internal Server Error',
    };
  
    switch (err.code) {
      case '4007301': // Invalid field format
        res.status(400); // Bad Request
        errorResponse.message = 'Invalid field format [clientId/clientSecret/grantType/X-TIMESTAMP]';
        break;
      case '4007302': // Invalid mandatory field
        res.status(400);
        errorResponse.message = 'Missing mandatory field [X-CLIENT-KEY]';
        break;
      case '4017300': // Unauthorized
        res.status(401); // Unauthorized
        // You can customize the message based on the specific unauthorized reason
        // For example:
        if (err.message.includes('Signature')) {
          errorResponse.message = 'Unauthorized. [Invalid Signature]';
        } else if (err.message.includes('Unknown client')) {
          errorResponse.message = 'Unauthorized. [Unknown client]';
        } else if (err.message.includes('Connection not allowed')) {
          errorResponse.message = 'Unauthorized. [Connection not allowed]';
        }
        break;
      case '5047300': // Timeout
        res.status(504); // Gateway Timeout
        errorResponse.message = 'Timeout';
        break;
      default:
        res.status(500); // Internal Server Error (for unhandled errors)
        // errorResponse.message = 'Internal Server Error'; // You might want to customize this for production
        break;
    }
  
    res.json(errorResponse); // Send the error response to the client
  }
  
  module.exports = errorHandler;
  