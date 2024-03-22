import { Events } from "../../gateway/Events";
import { Client } from "../Client";

export default function (client: Client, data: any) {
    client.guilds.cache.set(data.id, data)

    client.emit(Events.GuildCreate, data)
}