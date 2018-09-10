export class Achievement {
    description: string;
    yearEnd: number;
    id: number;

    constructor (description, yearEnd, id?) {
        this.description = description;
        this.yearEnd = yearEnd;
        this.id = id;
    }
}
