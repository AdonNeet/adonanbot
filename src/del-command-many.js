/* eslint-disable no-inline-comments */
/* eslint-disable no-mixed-spaces-and-tabs */
const dotenv = require('dotenv');
const { REST, Routes } = require('discord.js');

dotenv.config();

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const rest = new REST({ version: '10' }).setToken(token);

const choosen = ['hey', 'ping'];

try {
	console.log(`Removing ${choosen} slash command`);

	rest.get(Routes.applicationGuildCommands(clientId, guildId))
		.then(data => {
			const promises = [];
			for (const choose of choosen) {
				for (const command of data) {
					if (command.name === choose) {
						const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`;
						promises.push(rest.delete(deleteUrl));
						break;
					}
					else {
						continue;
					}
				}
			}

			return Promise.all(promises);
		});
	console.log(`Removing ${choosen} slash command done`);
}
catch (error) {
	console.log(`There was an error: ${error}`);
}
