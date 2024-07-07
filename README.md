# *Work in Progress*
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/imlogang-organization/pterodactyl-bot/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/imlogang-organization/pterodactyl-bot/tree/main)

# Pterodactyl Discord Bot
This Discord allows you to control your Pterodactyl Server(s) via Discord. 

# Commands
`/change_state` This allows you to change the Power State of a given Server that you have added to `servers.json`.
`/ips` This allows a user to list the description of all servers on your Pterdactyl Server.
`/whitelist` This command is mostly for Minecraft servers but will give the option for all servers.

# How to use the Pterodactyl Discord Bot
1. `mkdir pterodactyl-bot`
2. `wget https://raw.githubusercontent.com/imlogang-organization/pterodactyl-bot/main/docker-compose.yaml`
3. `wget https://raw.githubusercontent.com/imlogang-organization/pterodactyl-bot/main/.env`
4. `wget https://raw.githubusercontent.com/imlogang-organization/pterodactyl-bot/main/servers.json`
5. Edit the `.env` file with the necessary tokens.
6. Edit the `servers.json` with the necessary Names that you want the Server Value.
   1. The Server Value is derived from the 8-digit alphanumeric key in the URL of a given server.
7. `docker compose up -d` 