import { Events } from "../../gateway/Events";

export default function (client, data) {
    client.guilds.cache.delete(data.id);

    client.emit(Events.GuildDelete, data);
}