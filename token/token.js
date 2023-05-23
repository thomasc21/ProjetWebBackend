const jwt = require('jsonwebtoken');
require('dotenv').config();

async function generateToken(dataId){
    return jwt.sign({email : dataId}, process.env.TOKEN_SECRET);
}

function authenticateToken(req, res, next) {
     try {
         const token = req.headers.authorization.split(' ')[1];
         const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        
          next(decodedToken);
     } catch(error) {
         res.status(401).json({ error });
     }
  };


module.exports = { generateToken, authenticateToken };