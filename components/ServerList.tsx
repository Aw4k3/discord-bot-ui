"use client";

import { Server } from "@/types/Server";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import styles from "./ServerList.module.css";
import { useState } from "react";

export default function ServerList({
  list,
}: {
  list: Server[];
}) {
  const [servers, setServers] = useState<Server[]>(list);
  
  return (
    <ul className={styles.serverList}>
      {servers.map((server, i) => (
        <Link className={styles.card} href={`/server/${server.id}`} key={i}>
          <Card isFooterBlurred>
            <Image className={styles.cardBackground} alt="Server Icon" src={server.iconUrl} width={"100%"} shadow="lg" />
            <CardBody className={styles.cardBody}>
              <Image className={styles.serverIcon} alt="Server Icon" src={server.iconUrl} />
              <div className={styles.serverInfo}>
                <h2>{server.name}</h2>
                <p>Member count: {server.memberCount}</p>
              </div>
            </CardBody>
          </Card>
        </Link>
      ))}
    </ul>
  );
}
