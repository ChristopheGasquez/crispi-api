import sha3 from 'crypto-js/sha3.js';

export default (propertyName, place = 'body') => {
  // Return middleware.
  return (req, res, next) => {
    req[ place ][ propertyName ] = encrypt(req[ place ][ propertyName ]);
    next();

    function encrypt(property) {
      return property ? sha3(property).toString() : property;
    }
  };
}
