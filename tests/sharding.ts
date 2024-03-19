import { test } from "uvu";
import { config } from "dotenv";
import { Client, Events, GatewayIntentBits } from "../src/index";

config();

test("send", () => {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds
        ]
    });


    client.on(Events.ClientReady, (data) => {
        console.log(data);
    })

    client.on(Events.GuildCreate, (data) => {
        console.log(client.guilds.cache.get(data.id).name);
    })

    client.login(process.env.DISCORD_TOKEN);
})

test.run()