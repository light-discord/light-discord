import { GatewayIntentBits } from '../gateway/GatewayIntentBits';

export interface ClientOptions {
    /**
     * An array of the bot's intents you need
     * @example
     * intents: [
     *    GatewayIntentBits.Guilds,
     *    GatewayIntentBits.GuildMembers,
     *    GatewayIntentBits.GuildMessages,
     *    GatewayIntentBits.MessageContent
     * ]
     */
    intents: GatewayIntentBits[];
}