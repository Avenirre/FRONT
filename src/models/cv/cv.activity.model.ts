export class Activity {
    id: number;
    activityType: {
        id: number;
        name: string
    };
    position: {
        id: number,
        postName: string
    };
    description: string;
    yearStart: number;
    yearEnd: number;
    backFront: number;
}