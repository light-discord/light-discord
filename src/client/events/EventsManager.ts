import { Client } from "../Client";

export class EventsManager {
    private client: Client;
    
    events: Function[] = [];

    constructor(client) {
        this.client = client;

        (async () => {
            this.register("READY", (await import("./Ready")).default);
        })();
    }

    register(name: string, handler: Function) {
        this.events[name] = handler;
    }
}