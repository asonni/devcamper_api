// @desc     Logs request to console
const logger = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );
  next();
};

module.exports = logger;
