import {Controller, Post, Req, UseGuards} from '@nestjs/common';
import {Request} from 'express';
import {LocalAuthGuard} from '../guards/local-auth.guard';
import {User} from '../users/user.model';
import {AuthnService} from './authn.service';

@Controller('authn')
export class AuthnController {
  constructor(private authnService: AuthnService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<any> {
    return this.authnService.login(req.user as User);
  }
}
