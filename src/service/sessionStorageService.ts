import storageUtils from '../tools/storageUtils';
import IUserInfo from '../ts/interface/IUserInfo';
import IOauth from '../ts/interface/IOauth';

const USER_KEY = 'user';

function setUser(user: IUserInfo) {
  storageUtils.set(USER_KEY, user);
}
function getUser() {
  return storageUtils.get(USER_KEY) as IUserInfo;
}

const OAUTH_KEY = 'oauth';

function setOauth(at: IOauth) {
  console.log('setOauth -> at', at);
  storageUtils.set(OAUTH_KEY, at);
}
function getOauth() {
  return storageUtils.get(OAUTH_KEY) as IOauth;
}

export default {
  setUser,
  getUser,
  setOauth,
  getOauth,
};
