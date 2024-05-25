import { body,validationResult } from 'express-validator';

const validateUser = [
  body('name')
    .trim()
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
    .isAlpha().withMessage('Name must contain only English alphabet characters')
    .notEmpty().withMessage('Name is required'),

  body('email')
    .isEmail().withMessage('Invalid email address')
    .notEmpty().withMessage('Email is required'),

  body('password')
    .isLength({ min: 8, max: 16 }).withMessage('Password must be between 8 and 16 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/\d/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*.?:]/).withMessage('Password must contain at least one special character from !@#$%^&*.?:')
    .not().matches(/[{}|<>()]/).withMessage('Password must not contain invalid characters {}|<>()')
    .notEmpty().withMessage('Password is required'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

export { validateUser, handleValidationErrors };
