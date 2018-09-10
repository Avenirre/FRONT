export class Activity {
    id: number;
    activityTypeId: number;
    activityTypeName: string;
    company: string;
    positionId: number;
    postName: string;
    description: string;
    yearStart: number;
    yearEnd: number;
    backFront: number;

    constructor(id, activityTypeId, activityTypeName, company, positionId, position_postName, description, yearStart, yearEnd, backFront) {
        this.id = id;
        this.activityTypeId = activityTypeId;
        this.activityTypeName = activityTypeName;
        this.company = company;
        this.positionId = positionId;
        this.postName = position_postName;
        this.description = description;
        this.yearStart = yearStart;
        this.yearEnd = yearEnd;
        this.backFront = backFront;
    }
}
