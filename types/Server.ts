export type Server = {
  id: string;
  name: string;
  iconUrl: string;
  memberCount: number;
  createdTimestamp: number;
  joinedTimestamp: number;
  owner: Owner;
  channels: Channel[];
};

export type Channel = {
  id: string;
  name: string;
  type: "GuildText" | "GuildVoice" | "GuildCategory";
};

export type Owner = {
  id: string;
  name: string;
  avatarUrl: string;
};
