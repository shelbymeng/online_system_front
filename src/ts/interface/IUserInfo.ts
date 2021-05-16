import ERole from '../enum/ERole';
interface IUserInfo {
  account: number;
  username: string;
  role: ERole;
  phonenumber: number;
}
export default IUserInfo;
