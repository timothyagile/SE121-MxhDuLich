const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret'; // Phải giống với secret ở trên
const User = require('../models/User')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, 'travel', (err, decodeToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                console.log(decodeToken);
                next();
            }
        })
    }
    else {
        res.redirect('/login');
    }
};

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'travel', async (err, decodedToken) => {
        if (err) {
          return res.status(401).json({
            isSuccess: false,
            message: 'Error',
            data: null
        });
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      return res.status(401).json({
        isSuccess: false,
        message: 'Token không hợp lệ hoặc không tồn tại.',
        data: null
    });
    }
  };

//check is location owner?
const checkLocationOwner = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({
        isSuccess: false,
        message: 'Token không hợp lệ hoặc không tồn tại.',
        data: null
    });
  }

// Giải mã token
  jwt.verify(token, 'travel', async (err, decoded) => {
    if (err) {
        return res.status(403).json({
            isSuccess: false,
            message: 'Token không hợp lệ.',
            data: null
        });
    }
    let user = await User.findById(decoded.id);
    res.locals.user = user;
    // Kiểm tra quyền
    if (res.locals.user.userRole !== 'location-owner') {
        return res.status(403).json({
            isSuccess: false,
            message: 'Bạn không có quyền tạo địa điểm.',
            data: null
        });
    }
    next();
  });
};
module.exports = {requireAuth, checkUser, checkLocationOwner};