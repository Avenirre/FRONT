export class Activity {
    id: number;
    activityTypeId: number;
    activityTypeName: string;
    company: string;
    position: string;
    description: string;
    yearStart: number;
    yearEnd: number;
    backFront: number;

    constructor(id, activityTypeId, activityTypeName, company, position, description, yearStart, yearEnd, backFront) {
        this.id = id;
        this.activityTypeId = activityTypeId;
        this.activityTypeName = activityTypeName;
        this.company = company;
        this.position = position;
        this.description = description;
        this.yearStart = yearStart;
        this.yearEnd = yearEnd;
        this.backFront = backFront;
    }
}
