"use client";

import { getServers } from "@/services/api";
import { Server } from "@/types/Server";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Servers() {
  const [servers, setServers] = useState<Server[]>([]);
  
  useEffect(() => {
    getServers().then((data) => setServers(data));
  }, []);

  return (
    <section className="flex flex-col gap-4 md:py-6">
      <h1>Servers ({servers.length})</h1>
      {servers.length > 0 ? (
        <ul className={styles.serverList}>
          {servers.map((server, i) => (
            <Link className={styles.card} href={`/server/${server.id}`} key={i}>
              <Card isFooterBlurred>
                <Image
                  className={styles.cardBackground}
                  alt="Server Icon"
                  src={server.iconUrl}
                  width={"100%"}
                  shadow="lg"
                />
                <CardBody className={styles.cardBody}>
                  <Image className={styles.serverIcon} alt="Server Icon" src={server.iconUrl} />
                  <div className={styles.serverInfo}>
                    <h2>{server.name}</h2>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </ul>
      ) : (
        <p>No servers found</p>
      )}
    </section>
  );
}
