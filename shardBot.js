import { workerData } from 'worker_threads';
import { Client, GatewayIntentBits } from './src/index';
import { config } from 'dotenv';

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
})

client.on('ready', () => {
    console.log(workerData ? `Shard ${workerData.SHARDS} is ready` : 'Bot is ready');

    setTimeout(async () => {
        console.log(await client.shard?.fetchClientValues('guilds.cache.size'))
    }, 500)
})


client.login(process.env.DISCORD_TOKEN);