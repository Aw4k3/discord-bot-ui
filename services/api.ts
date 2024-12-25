import { Server } from "../types/Server";

const url = "http://localhost:8080";

export async function getServers(): Promise<Server[]> {
  try {
    const response = await fetch(`${url}/servers`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
