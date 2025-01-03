"use client";

import { sendMessage } from "@/services/api";
import { Channel, Server } from "@/types/Server";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { HashTag } from "../icons";
import { useState } from "react";
import styles from "./Actions.module.css";

export default function SendMessage({ channels }: { channels: Channel[] }) {
  const [textChannels, setTextChannels] = useState<Channel[]>(channels.filter((c) => c.type === "GuildText"));
  const [selectedChannelId, setSelectedChannelId] = useState<string>("");
  const [message, setMessage] = useState<string>("")

  return (
    <Card>
      <CardBody>
        <Form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(selectedChannelId, message);
          }}
        >
          <h2>Send Message</h2>
          <Input name="message" label="Message" onValueChange={setMessage} isClearable isRequired />
          <Select name="channel" label="Channel" isRequired onChange={(e) => setSelectedChannelId(e.target.value)}>
            {textChannels.map((channel) => (
              <SelectItem key={channel.id} value={channel.id} startContent={<HashTag fill="#ccc" />}>
                {channel.name}
              </SelectItem>
            ))}
          </Select>
          <Button className={styles.formSubmit} type="submit" isDisabled={!(selectedChannelId && message)} color="primary">
            Send
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
