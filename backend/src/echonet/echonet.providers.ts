import { Provider } from '@nestjs/common';
import { EchonetConnectionToken } from '../constants';
import * as EchonetLite from 'node-echonet-lite';
import { Echonet } from '../types';

export const echonetProviders: Provider[] = [
  {
    provide: EchonetConnectionToken,
    useFactory: async () =>
      await new Promise<Echonet>((resolve, reject) => {
        const echonetLite = new EchonetLite({ type: 'lan' });
        resolve(echonetLite);
      }),
  },
];
