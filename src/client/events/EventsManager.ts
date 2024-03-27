import { Client } from "../Client";

export class EventsManager {
    events: { [ key: string ]: Function } = {};

    constructor(client: Client) {
        (async () => {
            this.register("READY", await import("./Ready"));
            this.register("GUILD_CREATE", await import("./GuildCreate"));
            this.register("GUILD_UPDATE", await import("./GuildUpdate"));
            this.register("GUILD_DELETE", await import("./GuildDelete"));
        })();
    }

    register(name: string, handler: { default: any }) {
        this.events[name] = handler.default?.default || handler.default // theres a bun.js bug where it returns the default twice
    }
}

// TODO: Type the event data
