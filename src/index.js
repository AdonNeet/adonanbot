// Require the necessary discord.js classes, i use .env instead config.js
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const token = process.env.TOKEN;

// Create a new client instance
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessages,
] });

// it's for loading commands files
client.commands = new Collection();
const folderPath = path.join(__dirname, '../commands');
const commandFolders = fs.readdirSync(folderPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(folderPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.date.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`);
		}
	}
}
// end for loading commands files

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, () => {
	console.log('Ready, Set, GO!');
});

// it's for interaction when commands was called
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});
// end for interaction command

client.on('messageCreate', (message) => {
	if (message.author.bot) {
		return;
	}

	if (message.content === 'hallo' || message.content === 'hey' || message.content === 'hello') {
		message.reply('hallo');
	}
});

// It's for the basic command interaction
// client.on('interactionCreate', (interaction) => {
// 	if (!interaction.isChatInputCommand()) {
// 		return;
// 	}
// 	if (interaction.commandName === 'hey') {
// 		interaction.reply('hey!');
// 	}
// });

// Log in to Discord with your client's token
client.login(token);