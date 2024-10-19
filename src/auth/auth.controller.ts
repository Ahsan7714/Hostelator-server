import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: AuthDto, @Res() res: Response) {
    const { access_token } = await this.authService.signup(dto);
    // Set the token in the cookie
    res.cookie('jwt', access_token, {
      httpOnly: true, // Makes the cookie inaccessible to JavaScript
      secure: process.env.NODE_ENV === 'production', // Ensure this is only true in production
      sameSite: 'strict', // Prevents CSRF attacks
    });
    return res.send({ message: 'Signup successful' });
  }

  @Post('signin')
  async signin(@Body() dto: AuthDto, @Res() res: Response) {
    const { access_token } = await this.authService.signin(dto);
    // Set the token in the cookie
    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return res.send({ message: 'Signin successful' });
  }
}
