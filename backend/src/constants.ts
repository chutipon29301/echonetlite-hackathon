export enum EchonetClass {
    OPERATION_STAT = 0x80,
    ROOM_TEMPERATURE = 0xBB,
    ROOM_HUMIDITY = 0xBA,
    OUTDOOR_TEMPERATURE = 0xBE,
    // TEMP_SENSOR = 0x11,
    // SENSOR_GROUP = 0x00,
    // HUMIDITY_SENSOR = 0x12,
    // ELECTRIC_ENERGY_SENSOR = 0x22,
    // AIR_PRESSURE_SENSOR = 0x2D,
    // AIRCON_GROUP = 0x01,
    // HOME_AIR = 0x30,
    // AIR_CLEANER = 0x35,
    // HOUSING_DEVICE_GROUP = 0x02,
    // OPERATE_BLIND = 0x60,
    // ELECTRIC_LOCK = 0x6F,
    VOLTAGE_ENERGY_METER = 0x88,
    GEN_LIGHTNING = 0x90,
    // PROFILE_GROUP = 0x0E,
    // NODE_PROFILE = 0x0F,
    MANU_CODE = 0x8A,
}

export const EchonetConnectionToken = 'EchonetConnectionToken';
export const CITY_ID = 1609350;
export const YOUR_API_KEY = 'b4aaa65e3e104bfdd3c1da011970b83b';
