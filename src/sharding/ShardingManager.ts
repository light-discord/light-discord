import { EventEmitter } from 'events';
import { ShardingOptions } from './ShardingOptions';
import { getGatewayBot } from '../rest';
import { Worker } from 'worker_threads';
import { Shard } from './Shard';

export class ShardingManager extends EventEmitter {
    script: string;
    options: ShardingOptions;

    totalShards?: number;

    constructor(script: string, options: ShardingOptions) {
        super();

        this.script = script;
        this.options = options;
    }

    async spawn() {
        const gateway = await getGatewayBot(this.options.token);
        this.totalShards = gateway.shards;

        if (!this.totalShards) {
            throw new Error('Failed to get total number of shards from Discord.');
        }

        for (let i = 0; i < this.totalShards; i++) {
            const shard = new Shard(this, i);

            shard.spawn();
        }
    }
}