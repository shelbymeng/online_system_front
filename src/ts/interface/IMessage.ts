import EPosition from '../enum/EPosition';
interface IMessage {
  user: number;
  text: string;
  date: string;
  position?: EPosition;
}
export default IMessage;
