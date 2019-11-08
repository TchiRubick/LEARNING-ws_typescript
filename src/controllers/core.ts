export abstract class Core {
    public message: string;
    public debut: number;
    public fin: number;
    public duree: number;

    constructor() {
        this.message = "";
        this.debut = new Date().getTime();
    }

    public endProcess(message: string): void {
        this.message = message;
        this.fin = new Date().getTime();
        this.duree = this.fin - this.debut;
        console.log(this.message + " | Time: " + this.duree + "ms");
    }
}
