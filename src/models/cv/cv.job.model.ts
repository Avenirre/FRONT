export class Job {
    id: number;
    company: string;
    position: {
        id: number;
        postName: string;
    };
    description: string;
    yearStart: number;
    yearEnd: number;
    backFront: number;
}