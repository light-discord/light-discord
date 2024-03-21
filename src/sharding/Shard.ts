import { Worker } from "worker_threads";
import { ShardingManager } from "./ShardingManager";

export class Shard { 
    id: number;
    worker: Worker;
    manager: ShardingManager;
    workerData: Object;

    constructor(manager, id) {
        this.manager = manager;
        this.id = id;

        this.workerData = {
            SHARDING_MANAGER: true,
            SHARDS: this.id,
            SHARD_COUNT: this.manager.totalShards,
            DISCORD_TOKEN: this.manager.options.token
        }
    }

    spawn() {
        this.worker = new Worker(this.manager.script, { workerData: this.workerData });
    }
}