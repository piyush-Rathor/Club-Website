const Joi = require('joi'); 
const validationMiddleware = (schema, property='body') => { 
  return (req, res, next) => { 
    const { error, value  } = schema.validate(req[property]); 
    const valid = error == null; 
    if (valid) { next(); } 
    else { 
        console.log("yes it is run");
      const { details } = error; 
      const message = details.map(i => i.message).join(',')
      console.log("error", message); 
      res.status(422).json({ error: message }) 
    } 
  } 
} 
module.exports = validationMiddleware;