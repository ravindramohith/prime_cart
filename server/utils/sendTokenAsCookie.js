module.exports = (user, statusCode, res) => {
  const token = user.getJWT();

  user.password = undefined;
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV === "PRODUCTION" ? true : false,
    })
    .json({ success: true, data: user, token });
};
