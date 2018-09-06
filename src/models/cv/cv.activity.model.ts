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

    constructor(id, activityType_id, activityType_name, position_id, position_postName, description, yearStart, yearEnd, backFront) {
        this.id = id;
        this.activityType.id = activityType_id;
        this.activityType.name = activityType_name;
        this.position.id = position_id;
        this.position.postName = position_postName;
        this.description = description;
        this.yearStart = yearStart;
        this.yearEnd = yearEnd;
        this.backFront = backFront;
    }
}
