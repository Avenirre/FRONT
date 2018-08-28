export class Job {
    public company: string;
    public position: string;
    public date_from: string;
    public date_to: string;
    public description: string

    constructor (company: string, position: string, date_from?: string, date_to?: string, description?: string) {
        this.company = company;
        this.position = position;
        this.date_from = date_from;
        this.date_to = date_to;
        this.description = description;
    }
}