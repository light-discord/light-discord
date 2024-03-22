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

    register(name: string, handler: { [ key: string ]: any }) { // there is a bun.js(or tsup idk) where i need to use 2 default variables
        this.events[name] = handler.default.default || handler.default;
    }
}

// TODO: Type the event data