// admin.controller.ts
import {
  Body,
  Controller,
  Get, Param, ParseIntPipe,
  Post,
  Redirect,
  Render,
  Req,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from '../../../guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { IRequest } from '../../../schemas/IRequest';
import { AdminService } from '../../services/admin/admin.service';

@Controller()
export class AdminController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly service: AdminService,
  ) {}

  @Get('login')
  @Render('login') // Рендерим страницу администратора
  login() {
    return { layout: 'e' };
  }

  @Post('login')
  @Redirect('/') // Рендерим страницу администратора
  async signIn(
    @Body() body: { username: string; password: string },
    @Req() req: IRequest,
  ) {
    if (req.session.jwt) {
      return {
        message: '<script>\n' + 'window.location.href = "/";' + '</script>',
      };
    }

    // Validate user credentials (this is just a placeholder)
    const user = await this.service.getUser(body.username, body.password); //  body.username === 'user' && body.password === 'password';
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: body.username };
    const token = this.jwtService.sign(payload);

    // Save the token in the session
    req.session.jwt = token;

    return { message: 'Login first' };
  }

  @Get('reg')
  @Render('reg') // Рендерим страницу администратора
  reg() {
    return { layout: 'e' };
  }

  @Get('logout')
  @Redirect('/login') // Рендерим страницу администратора
  logout(@Req() req: IRequest) {
    delete req.session.jwt;
    return {};
  }

  @Post('reg')
  @Redirect('/')
  async signUp(
    @Body() body: { username: string; password: string },
    @Req() req: IRequest,
  ) {
    if (req.session.jwt) {
      return {
        message: '<script>\n' + 'window.location.href = "/";' + '</script>',
      };
    }

    // Validate user credentials (this is just a placeholder)
    if (await this.service.exists(body.username)) {
      throw new UnauthorizedException('Exists');
    }

    // Validate user credentials (this is just a placeholder)
    const user = this.service.addUser(body.username, body.password); //  body.username === 'user' && body.password === 'password';
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: body.username };
    const token = this.jwtService.sign(payload);

    // Save the token in the session
    req.session.jwt = token;

    return { message: 'You should sign-up first' };
  }

  @Get()
  @UseGuards(AuthGuard)
  @Render('index')
  async index(@Req() req: IRequest) {
    const appointments = await this.service.findAppointments(
      parseInt(`${req.query.page}`) || 0,
    );
    return { appointments };
  }

  @Get('donors')
  @UseGuards(AuthGuard)
  @Render('donors')
  async donors(@Req() req: IRequest) {
    const donors = await this.service.findDonors(
      parseInt(`${req.query.page}`) || 0,
    );
    return { donors };
  }
  @Get('clinics')
  @UseGuards(AuthGuard)
  @Render('clinics')
  async clinics(@Req() req: IRequest) {
    const clinics = await this.service.findClinics(
      parseInt(`${req.query.page}`) || 0,
    );
    return { clinics };
  }

  @Get('appointments/:id')
  @UseGuards(AuthGuard)
  @Render('table')
  async appointment(@Req() req: IRequest, @Param('id', ParseIntPipe) id: number) {
    const appointment = await this.service.findAppointment(
      id
    );
    return { table: Object.entries(appointment) };
  }

  @Get('clinics/:id')
  @UseGuards(AuthGuard)
  @Render('table')
  async clinic(@Req() req: IRequest, @Param('id', ParseIntPipe) id: number) {
    const clinic = await this.service.findClinic(
      id
    );
    return { table: Object.entries(clinic) };
  }

  @Get('donors/:id')
  @UseGuards(AuthGuard)
  @Render('table')
  async donor(@Req() req: IRequest, @Param('id', ParseIntPipe) id: number) {
    const donor = await this.service.findDonor(
      id
    );
    return { table: Object.entries(donor) };
  }
}
