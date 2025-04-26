const { v4: uuidv4 } = require('uuid');

const createGuestSession = (req, res) => {
  const sessionToken = uuidv4();

  // Set token in a cookie
  res
    .cookie('guest_token', sessionToken, {
      httpOnly: true,
      secure: false,  // Use true in production if you have HTTPS enabled
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    })
    .json({
      success: true,
      message: 'Guest session created',
      token: sessionToken,
    });
};

module.exports = { createGuestSession };
