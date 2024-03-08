// const sessionIdToUserMap=new Map();  //stateful

const jwt = require('jsonwebtoken'); //stateless
const secret = 'DibyajyotiNaik@873$%6967329';
function setUser(user) {
  // sessionIdToUserMap.set(id,user);
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    secret
  );
}

function getUser(token) {
  // return sessionIdToUserMap.get(id);
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
