import { Module } from '@nestjs/common';
import { echonetProviders } from './echonet.providers';

@Module({
  providers: [...echonetProviders],
  exports: [...echonetProviders],
})
export class EchonetModule {}
