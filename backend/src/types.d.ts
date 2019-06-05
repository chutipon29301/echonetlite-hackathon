export type Echonet = {
  startDiscovery(
    callback: (error: Error, response: EchonetResponse) => void,
  ): void;

  setPropertyValue(
    address: string,
    eoj: number,
    epc: number,
    edt: Partial<EchonetPropertyData>,
    callback?: (error: Error, response: EchonetResponse) => void,
  ): void;

  getPropertyValue(
    address: string,
    eoj: number,
    epc: number,
    callback?: (error: Error, response: EchonetResponse) => void,
  ): void;
};

export type EchonetResponse = {
  lang: 'en' | 'ja';
  device: EchonetDevice;
  message: {
    tid: number;
    seoj: EchonetLiteObject;
    deoj: EchonetLiteObject;
    esv: string;
    prop: EchonetProp[];
    data: Partial<EchonetPropertyData>;
  };
};

export type EchonetDevice = {
  address: string;
  family: string;
  port: number;
  size: number;
  eoj?: EchonetLiteObject;
};

export type EchonetProp = {
  epc: number;
  edt: Partial<EchonetPropertyData>;
  buffer: Buffer;
};

export type IotDevice = {
  humidity: number;
  temperature: number;
  light: number;
};

export type EchonetPropertyData = {
  status: boolean;
  temperature: number;
  fault: boolean;
  code: number;
};

export type EchonetLiteObject = number[];
