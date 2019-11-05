export abstract class Core {
    public message: string;

    constructor() {
        this.message = "";
    }

    public log(message: string): void {
        this.message = message;
        console.log(this.message);
    }
}
