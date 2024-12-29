import { Server } from "../types/Server";

const url = "http://localhost:8080";

export async function getServers(): Promise<Server[]> {
  try {
    const response = await fetch(`${url}/servers`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getServer(id: string): Promise<Server | null> {
  try {
    const response = await fetch(`${url}/serverinfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ serverId: id }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function sendMessage(channelId: string, message: string) {
  await fetch(`${url}/sendmessage`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      textChannelId: channelId,
      message: message,
    }),
  });
}

export async function joinVoiceChannel(channelId: string) {
  await fetch(`${url}/joinvoicechannel`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      voiceChannelId: channelId,
    }),
  });
}