export class Job {
    id: number;
    company: string;
    position: string;
    description: string;
    yearStart: number;
    yearEnd: number;
    backFront: number;

    constructor(id, company, position: string, description, yearStart, yearEnd, backFront) {
        this.id = id;
        this.company = company;
        this.position = position;
        this.description = description;
        this.yearStart = yearStart;
        this.yearEnd = yearEnd;
        this.backFront = backFront;
    }
}
