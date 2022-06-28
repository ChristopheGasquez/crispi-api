import jsonwebtoken from 'jsonwebtoken';

const jwtSecretKey = process.env.JWT_SECRET_KEY;

export function createToken(data, expiresIn = '1d') {
  return jsonwebtoken.sign(data, jwtSecretKey, { expiresIn });
}

export function decodeToken(token) {
  return jsonwebtoken.verify(token, jwtSecretKey, function (error, decode) {
    if (error) {
      return null;
    }
    return decode;
  });
}


export default {
  createToken,
  decodeToken
};
