import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits, TextChannel } from 'discord.js';
import { CronJob } from 'cron';
import dotenv from 'dotenv';
dotenv.config();

const client = new SapphireClient({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const job = new CronJob(
    '0 4 * * *', 
    async () => {
        const channel = client.channels.cache.get('1136523488560160778')!;
        if (!(channel instanceof TextChannel)) return;
        await channel.bulkDelete(99);
    },
    null,
    true,
    'Australia/Brisbane'
);

job.start();
client.login(process.env.TOKEN);