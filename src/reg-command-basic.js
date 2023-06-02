const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const commands = [
	{
		name: 'hey',
		description: 'Replies with hey!',
	},
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log('Registering slash commands...');


		await rest.put(
			Routes.applicationGuildCommands(
				clientId,
				guildId,
			),
			{ body: commands },
		);

		console.log('Slash commands were registered succesfully');
	}
	catch (error) {
		console.log(`There was an error: ${error}`);
	}
})();