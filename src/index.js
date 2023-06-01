// Require the necessary discord.js classes, i use .env instead config.js
const { Client, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

// Create a new client instance
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessages,
] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, () => {
	console.log('Ready, Set, GO!');
});

client.on('messageCreate', (message) => {
	if (message.author.bot) {
		return;
	}

	if (message.content === 'hallo' || message.content === 'hey' || message.content === 'hello') {
		message.reply('hallo');
	}
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);