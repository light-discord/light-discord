import { Client } from "../Client";

export class EventsManager {
    events: { [ key: string ]: Function } = {};

    constructor(client: Client) {
        (async () => {
            this.register("READY", (await import("./Ready")));
            this.register("GUILD_CREATE", (await import("./GuildCreate")));
            this.register("GUILD_UPDATE", (await import("./GuildUpdate")));
            this.register("GUILD_DELETE", (await import("./GuildDelete")));
        })();
    }

    register(name: string, handler: {
        default: Function
    }) {
        this.events[name] = handler.default;
    }
}

// TODO: Type the event data