import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

    @Get('ping')
    public ping(): { msg: string } {
        return { msg: 'pong' };
    }
}
