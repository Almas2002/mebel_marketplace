import { HttpException } from '@nestjs/common';

export class BannerNotFoundException extends HttpException{
}

export class BannerExistsException extends HttpException{

}