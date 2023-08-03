import { Command } from '@sapphire/framework';
import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, EmbedBuilder, TextChannel } from 'discord.js';

export class RequestDeleteCommand extends Command {
    public constructor(context: Command.Context, options: Command.Options) {
        super(context, { ...options, description: 'Request message be deleted.' });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerContextMenuCommand((builder) =>
            builder //
                .setName('Request Delete')
                .setType(ApplicationCommandType.Message)
        );
    }

    public async contextMenuRun(interaction: Command.ContextMenuCommandInteraction) {
        if (!interaction.isMessageContextMenuCommand()) return;
        const originalMessage = interaction.targetMessage;

        if (originalMessage.author.id === interaction.user.id) return await interaction.reply({ ephemeral: true, content: 'You cannot request your own message...' });

        const deleteChannel = interaction.client.channels.cache.get('1136296239412019312')!;
        if (!(deleteChannel instanceof TextChannel)) return;

        let attachments = "";

        originalMessage.attachments.map(a => a.url).forEach(url => attachments += `${url}\n`);

        attachments.trim();

        const embed = new EmbedBuilder()
            .setAuthor({ iconURL: interaction.user.displayAvatarURL(), name: interaction.user.username })
            .setThumbnail(originalMessage.author.displayAvatarURL())
            .setDescription(`[Jump To Message](${originalMessage.url})`)
            .addFields(
                { 
                    name: 'Author',
                    value: originalMessage.author.username,
                    inline: true
                },
                {
                    name: 'Created',
                    value: new Date(originalMessage.createdTimestamp+10*3600_000).toISOString(),
                    inline: true
                },
                {
                    name: 'Content',
                    value: (originalMessage.content.length > 0) ? originalMessage.content : 'Empty',
                    inline: false
                },
                {
                    name: 'Attachments',
                    value: (originalMessage.attachments.size > 0) ? attachments : '0',
                    inline: false
                },
                {
                    name: 'Meta',
                    value: `${originalMessage.channelId}|${originalMessage.id}|${originalMessage.author.id}|${interaction.user.id}`,
                    inline: false
                }
            )
            .setFooter({ text: `Message > Apps > Request Delete` })
            .setTimestamp(Date.now());

        const buttons = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('accept')
                        .setLabel('Delete')
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId('deny')
                        .setLabel('Ignore')
                        .setStyle(ButtonStyle.Secondary)
                );

        await deleteChannel.send({ embeds: [embed], components: [buttons] });
        await interaction.reply({ ephemeral: true, content: 'Request Sent...' });
    }
}