import { Command } from '@sapphire/framework';

export class ClearCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, { ...options, description: 'Request message be deleted.' });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder //
                .setName('clear')
                .setDescription('Clear the chat by sending blank text...')
        );
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        await interaction.reply({ content: 'Clearing chat:\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nCleared.' });
    }
}