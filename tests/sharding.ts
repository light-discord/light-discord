import { test } from "uvu";
import { config } from "dotenv";
import { ShardingManager } from "../src/index"
import { Worker } from "worker_threads";

config();

test("sharding", () => {
    const manager = new ShardingManager("./shardBot.js", {
        token: process.env.DISCORD_TOKEN as string
    });

    setTimeout(async () => {
        console.log(await manager.fetchClientValues("guilds.cache.size"));
    }, 5000)

    manager.spawn();
})

test("bot w/o sharding", () => {
    new Worker("./shardBot.js");
})

test.run()