export interface IUser {
  id:number;
  phone:string;
  roles:IRole[]
}
export interface IRole {
  value:string;
  description:string
}