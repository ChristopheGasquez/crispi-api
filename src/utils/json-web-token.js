import jsonwebtoken from 'jsonwebtoken';

const jwtSecretKey = process.env.JWT_SECRET_KEY;

export function createToken(data, expiresIn = '1d') {
  return jsonwebtoken.sign(data, jwtSecretKey, { expiresIn });
}

export function verifyToken(token) {
  return jsonwebtoken.verify(token, jwtSecretKey, function (error, issuer) {
    if (error) {
      return { error: { ...error } };
    }
    return { issuer };
  });
}

export default {
  createToken,
  verifyToken
};
