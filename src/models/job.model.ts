export class Job {
    public company: string;
    public position: string;
    public date_from: string;
    public date_till: string;
    public description: string;
    public frontend_percentage: number;

    constructor (company: string, position: string, frontend_percentage?: number, date_from?: string, date_till?: string, description?: string) {
        this.company = company;
        this.position = position;
        this.frontend_percentage = frontend_percentage;
        this.date_from = date_from;
        this.date_till = date_till;
        this.description = description;
    }
}