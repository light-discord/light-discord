"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsManager = void 0;
class EventsManager {
    client;
    events = [];
    constructor(client) {
        this.client = client;
        (async () => {
            this.register("READY", (await Promise.resolve().then(() => require("./Ready"))).default);
            this.register("GUILD_CREATE", (await Promise.resolve().then(() => require("./GuildCreate"))).default);
            this.register("GUILD_UPDATE", (await Promise.resolve().then(() => require("./GuildUpdate"))).default);
            this.register("GUILD_DELETE", (await Promise.resolve().then(() => require("./GuildDelete"))).default);
        })();
    }
    register(name, handler) {
        this.events[name] = handler;
    }
}
exports.EventsManager = EventsManager;
// TODO: Type the event data
//# sourceMappingURL=EventsManager.js.map