export default abstract class Singleton {
    static instance: Singleton;

    constructor() {
        if (!!Singleton.instance) {
            return Singleton.instance;
        }

        Singleton.instance = this;

        return this;
    }
}