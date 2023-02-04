import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import { IMyRequestInterface } from '../interface/IMyrequestInterface';


export const UserDecorator = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<IMyRequestInterface>()
  if(data){
    return req.user[data]
  }
  return req.user
})