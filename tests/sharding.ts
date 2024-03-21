import { test } from "uvu";
import { config } from "dotenv";
import { ShardingManager } from "../src/index"
import { Worker } from "worker_threads";

config();

test("sharding", () => {
    const manager = new ShardingManager("./shardBot.js", {
        token: process.env.DISCORD_TOKEN as string
    });

    manager.spawn();
})

test("bot w/o sharding", () => {
    new Worker("./shardBot.js");
})

test.run()