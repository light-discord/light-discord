import { Client } from "../Client";

/**
 * Manages event listeners for the Discord gateway.
 * Allows registering callback functions to handle specific gateway events.
 * @class
 */
export class EventManager {
    /**
     * An array of available events
     */
    events: { [ key: string ]: Function } = {};

    /**
     * Instantiates a new {@link EventManager}.
     * Typically used in {@link Client} only
     * @param client 
     * @constructor
     */
    constructor(client: Client) {
        (async () => {
            this.register("READY", (await import("./Ready")));
            this.register("GUILD_CREATE", (await import("./GuildCreate")));
            this.register("GUILD_UPDATE", (await import("./GuildUpdate")));
            this.register("GUILD_DELETE", (await import("./GuildDelete")));
        })();
    }

    /**
     * Registers a new event that the bot can subscribe to
     * @param name The name of the event 
     * @param handler The function which handles the event 
     */
    register(name: string, handler: { [ key: string ]: any }) { // there is a bun.js(or tsup idk) bug where i need to use 2 default variables
        this.events[name] = handler.default.default || handler.default;
    }
}

// TODO: Type the event data
