export class EventsManager {
    client;
    events = [];
    constructor(client) {
        this.client = client;
        (async () => {
            this.register("READY", (await import("./Ready")).default);
            this.register("GUILD_CREATE", (await import("./GuildCreate")).default);
            this.register("GUILD_UPDATE", (await import("./GuildUpdate")).default);
            this.register("GUILD_DELETE", (await import("./GuildDelete")).default);
        })();
    }
    register(name, handler) {
        this.events[name] = handler;
    }
}
// TODO: Type the event data
//# sourceMappingURL=EventsManager.js.map