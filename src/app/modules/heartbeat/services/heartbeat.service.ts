import {Injectable} from '@nestjs/common';

@Injectable()
export class HeartbeatService {
    public getCurrentDate(): string {
        function padZero(num: number): string {
            return num < 10 ? `0${num}` : `${num}`;
        }

        const date: Date = new Date();
        const year: string = padZero(date.getFullYear());
        const month: string = padZero(date.getMonth() + 1);
        const day: string = padZero(date.getDate());
        const hour: string = padZero(date.getHours());
        const minute: string = padZero(date.getMinutes());
        return `${year}-${month}-${day} ${hour}:${minute}`;
    }
}
