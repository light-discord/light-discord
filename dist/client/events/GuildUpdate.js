import { Events } from "../../gateway/Events";
export default function (client, data) {
    client.guilds.cache.set(data.id, data);
    client.emit(Events.GuildCreate, data);
}
//# sourceMappingURL=GuildUpdate.js.map