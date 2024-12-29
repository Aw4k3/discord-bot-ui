"use client";

import { getServer, joinVoiceChannel, sendMessage } from "@/services/api";
import styles from "./page.module.css";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useEffect, useState } from "react";
import { Server } from "@/types/Server";
import { useParams } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { BackIcon, HashTag, SpeakerIcon } from "@/components/icons";
import Link from "next/link";

export default function ServerDetails() {
  // const server = await getServer((await params).id);
  const params = useParams<{ id: string }>();
  const [server, setServer] = useState<Server>();
  const [message, setMessage] = useState<string>("");
  const [textChannelId, setTextChannelId] = useState<string>("");
  const [voiceChannelId, setVoiceChannelId] = useState<string>("");

  useEffect(() => {
    getServer(params.id).then((result) => setServer(result as Server));
  }, []);

  if (!server) {
    return <div>Server not found</div>;
  }

  return (
    <section className="flex flex-col gap-4 md:py-6">
      <header className={styles.header}>
        <Link href={"/"}>
          <BackIcon fill="white"/>
        </Link>
        <Image src={server.iconUrl} alt="Server Icon" radius="full" height={48} />
        <h1>{server.name}</h1>
      </header>
      <section className={styles.statsArray}>
        <Card className={styles.statsCard}>
          <CardBody className={styles.statsCardBody}>
            <div className={styles.ownerStat}>
              <Image src={server.owner.avatarUrl} alt="Owner Avatar" radius="full" height={72} />
              <p className={styles.statValue}>{server.owner.name}</p>
            </div>
            <p>Owner</p>
          </CardBody>
        </Card>
        <Card className={styles.statsCard}>
          <CardBody className={styles.statsCardBody}>
            <p className={styles.statValue}>{server.memberCount}</p>
            <p>Members</p>
          </CardBody>
        </Card>
      </section>
      <section className={styles.statsArray}>
        <Card className={styles.statsCard}>
          <CardBody className={styles.statsCardBody}>
            <p className={styles.statValue}>{new Date(server.createdTimestamp).toLocaleDateString()}</p>
            <p>Creation Date</p>
          </CardBody>
        </Card>
        <Card className={styles.statsCard}>
          <CardBody className={styles.statsCardBody}>
            <p className={styles.statValue}>{new Date(server.joinedTimestamp).toLocaleDateString()}</p>
            <p>Joined Date</p>
          </CardBody>
        </Card>
      </section>
      <header className={styles.header}>
        <h1>Actions</h1>
      </header>
      <section className={styles.actionsPanel}>
        <Card>
          <CardBody>
            <Form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(textChannelId, message);
              }}
            >
              <h2>Send Message</h2>
              <Input name="message" label="Message" onValueChange={setMessage} isClearable isRequired />
              <Select name="channel" label="Channel" isRequired onChange={(e) => setTextChannelId(e.target.value)}>
                {server.channels
                  .filter((channel) => channel.type === "GuildText")
                  .map((channel) => (
                    <SelectItem key={channel.id} value={channel.id} startContent={<HashTag fill="#ccc" />}>
                      {channel.name}
                    </SelectItem>
                  ))}
              </Select>
              <Button
                className={styles.formSubmit}
                type="submit"
                isDisabled={!(textChannelId && message)}
                color="primary"
              >
                Send
              </Button>
            </Form>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                joinVoiceChannel(voiceChannelId);
              }}
            >
              <h2>Join Voice Channel</h2>
              <Select name="channel" label="Channel" isRequired onChange={(e) => setVoiceChannelId(e.target.value)}>
                {server.channels
                  .filter((channel) => channel.type === "GuildVoice")
                  .map((channel) => (
                    <SelectItem key={channel.id} value={channel.id} startContent={<SpeakerIcon fill="#ccc" />}>
                      {channel.name}
                    </SelectItem>
                  ))}
              </Select>
              <Button
                className={styles.formSubmit}
                type="submit"
                isDisabled={!(voiceChannelId)}
                color="primary"
              >
                Join
              </Button>
            </Form>
          </CardBody>
        </Card>
      </section>
    </section>
  );
}
