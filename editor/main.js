const {Client, Intents} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {token, guildId, clientId} = require('./config.json');

const client = new Client({intents: [Intents.FLAGS.GUILDS]});
const rest = new REST({version: '9'}).setToken(token);

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Pong!')
].map(command => command.toJSON());

(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            {body: commands},
        );

        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', () => console.log(`Ready! Logged as ${client.user.tag}`));

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const {commandName} = interaction;

    switch (commandName) {
        case 'ping': await interaction.reply('Pong!'); break;
    }
})




client.login(token);
