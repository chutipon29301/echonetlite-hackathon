
export enum ActionType {
    OPEN = 'OPEN',
    CLOSE = 'CLOSE',
}
export class AirTriggerDto {
    ipAddress: string;
    airStatus: ActionType;
}
