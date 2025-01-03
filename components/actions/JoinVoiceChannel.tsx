"use client";

import { joinVoiceChannel } from "@/services/api";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Form } from "@nextui-org/form";
import { Select, SelectItem } from "@nextui-org/select";
import { SpeakerIcon } from "../icons";
import { useState } from "react";
import { Channel } from "@/types/Server";
import styles from "./Actions.module.css";

export default function JoinVoiceChannel({ channels }: { channels: Channel[] }) {
  const [voiceChannels, setVoiceChannels] = useState<Channel[]>(channels.filter((c) => c.type === "GuildVoice"));
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");
  
  return (
    <Card>
      <CardBody>
        <Form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            joinVoiceChannel(selectedChannelId);
          }}
        >
          <h2>Join Voice Channel</h2>
          <Select name="channel" label="Channel" isRequired onChange={(e) => setSelectedChannelId(e.target.value)}>
            {voiceChannels.map((channel) => (
              <SelectItem key={channel.id} value={channel.id} startContent={<SpeakerIcon fill="#ccc" />}>
                {channel.name}
              </SelectItem>
            ))}
          </Select>
          <Button className={styles.formSubmit} type="submit" isDisabled={!selectedChannelId} color="primary">
            Join
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
