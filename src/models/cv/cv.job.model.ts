export class Job {
    id: number;
    company: string;
    position = {
        id: null,
        postName: ''
    };
    description: string;
    yearStart: number;
    yearEnd: number;
    backFront: number;

    constructor(id, company, position_id: number, position_name: string, description, yearStart, yearEnd, backFront) {
        this.id = id;
        this.company = company;
        this.position.id = position_id;
        this.position.postName = position_name;
        this.description = description;
        this.yearStart = yearStart;
        this.yearEnd = yearEnd;
        this.backFront = backFront;
    }
}
