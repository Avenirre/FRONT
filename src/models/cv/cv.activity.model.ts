export class Activity {
    id: number;
    activityType = {
        id: null,
        name: ''
    };
    position = {
        id: null,
        postName: ''
    };
    description: string;
    yearStart: number;
    yearEnd: number;
    backFront: number;

    constructor(id, activityTypeId, activityTypeName, positionId, position_postName, description, yearStart, yearEnd, backFront) {
        this.id = id;
        this.activityType.id = activityTypeId;
        this.activityType.name = activityTypeName;
        this.position.id = positionId;
        this.position.postName = position_postName;
        this.description = description;
        this.yearStart = yearStart;
        this.yearEnd = yearEnd;
        this.backFront = backFront;
    }
}
