import { Collection } from "discord.js";
import { dirname, join } from "jsr:@std/url";
import { Command } from "../types/Command.ts";

export async function loadCommands() {
  const commands = new Collection<string, Command>();

  const commandsPath = join(dirname(import.meta.url), "..", "commands");

  for await (const commandFile of Deno.readDir(commandsPath)) {
    if (!commandFile.name.endsWith(".ts")) continue;

    const fileUrl = join(commandsPath, commandFile.name).href;
    const command: Command = await import(fileUrl);

    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${fileUrl} is missing a required "data" or "execute" property.`,
      );
    }
  }

  return commands;
}
