import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import { TextChannel, type ButtonInteraction, EmbedBuilder, Colors } from 'discord.js';

export class ButtonHandler extends InteractionHandler {
    public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
        super(ctx, {
            ...options,
            interactionHandlerType: InteractionHandlerTypes.Button
        });
    }

    public override parse(interaction: ButtonInteraction) {
        if (interaction.customId !== 'deny') return this.none();

        return this.some();
    }

    public async run(interaction: ButtonInteraction) {
        const requestEmbed = interaction.message.embeds.at(0)!;
        const msgInfo = requestEmbed.fields.at(4)!.value.split('|');

        const embed = new EmbedBuilder(requestEmbed.data)
            .setColor(Colors.DarkGrey)
            .setTitle('Message Ignored');

        const userOne = msgInfo.at(2)!;
        const userTwo = msgInfo.at(3)!;

        const requestsChannel = interaction.client.channels.cache.get('1136523488560160778')!;
        if (!(requestsChannel instanceof TextChannel)) return;
        
        requestsChannel.send({ content: `<@${userOne}> <@${userTwo}>`, embeds: [embed] });
        interaction.client.users.cache.get(userOne)!.send({ embeds: [embed] });
        interaction.client.users.cache.get(userTwo)!.send({ embeds: [embed] });

        await interaction.update({ embeds: [embed], components: [] });

    }
}