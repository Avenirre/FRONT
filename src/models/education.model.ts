export class Education {
    public school: string;
    public degree: string;
    public graduation_year: string;
    public location: string;
    public description: string

    constructor (school: string, degree: string, graduation_year?: string, location?: string, description?: string) {
        this.school = school;
        this.degree = degree;
        this.graduation_year = graduation_year;
        this.location = location;
        this.description = description;
    }
}
