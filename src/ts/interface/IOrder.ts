import ECategory from '../enum/ECategory';
import ELocation from '../enum/ELocation';
interface IOrder {
  orderId: string; //求助订单编号
  account: number; //发布者学号
  userName: string; //发布者姓名
  category: ECategory; //求助类别  取快递，取外卖，北区打水，南区打水，交易（卖书，买书）
  info: string; //求助信息
  location: ELocation; //地点
  releaseTime: string; //发布时间
  expectTime: string; //期望时间
  state: string; //接单状态
  helperAccount?: number; //接单者学号
  helper?: string; //接单者姓名
  rate?: number; //接单者信誉
  startTime?: string; //接单时间
  finishTime?: string; //完成时间
}
export default IOrder
