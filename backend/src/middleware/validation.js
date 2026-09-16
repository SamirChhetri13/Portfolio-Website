const { check, validationResult } = require('express-validator');

exports.validateContact = [
  check('name', 'Name is required').notEmpty().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long').escape(),
  check('email', 'Please provide a valid email address').trim().isEmail().normalizeEmail(),
  check('subject').optional({ checkFalsy: true }).trim().escape(),
  check('message', 'Message is required').notEmpty().trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters long').escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed',
        errors: errors.array() 
      });
    }
    next();
  },
];
