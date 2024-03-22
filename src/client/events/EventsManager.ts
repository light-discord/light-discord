import { Client } from "../Client";

export class EventsManager {
    private client: Client;
    
    events: { [ key: string ]: Function} = {};

    constructor(client: Client) {
        this.client = client;

        (async () => {
            this.register("READY", (await import("./Ready")).default);
            this.register("GUILD_CREATE", (await import("./GuildCreate")).default);
            this.register("GUILD_UPDATE", (await import("./GuildUpdate")).default);
            this.register("GUILD_DELETE", (await import("./GuildDelete")).default);
        })();
    }

    register(name: string, handler: Function) {
        this.events[name] = handler;
    }
}

// TODO: Type the event data