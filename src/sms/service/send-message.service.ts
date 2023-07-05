import axios from "axios";

export class SendMessageService {
  static async sendCode(phone:string,code:number){
   // const url = `https://smsc.kz/sys/send.php?login=${process.env.SMSPHONELOGIN}&psw=${process.env.SMSPHONEPSW}&phones=${phone}&mes=CODE:${code}&ID=Avtolike.kz`
    return axios.post('https://smsc.kz/rest/send/',{
      "login":process.env.SMSPHONELOGIN,
      "psw":process.env.SMSPHONEPSW,
      "phones":phone,
      "mes":`Подтверждение loom.kz: ${code}`
    })
  }
}
////"phone":"87057505871",