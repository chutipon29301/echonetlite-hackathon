import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Post('setBedTime')
    public setBedTime(@Body('date') dateString: string, @Body('temp') temp: number) {
        const date = new Date(dateString);
        this.userService.setBedtime(date, temp);
    }

    @Post('setBedTimeFor')
    public setBedTimeFor(@Body('date') dateString: string, @Body('temp') temp: number, @Body('ipAddress') ipAddress: string) {
        const date = new Date(dateString);
        this.userService.setBedtimeFor(date, temp, ipAddress);
    }
}

