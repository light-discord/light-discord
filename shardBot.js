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

    if (!workerData) return;

    setTimeout(async () => {
        console.log(workerData.SHARDS, await client.shard?.fetchClientValues('guilds'))
    }, 10000)
})

console.log(workerData ? `Shard ${workerData.SHARDS} is starting` : 'Bot is starting')

client.login(process.env.DISCORD_TOKEN);