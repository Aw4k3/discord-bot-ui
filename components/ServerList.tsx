"use client";

import { Server } from "@/types/Server";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import Link from "next/link";
import styles from "./ServerList.module.css";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import * as Motion from "motion/react-client";

export default function ServerList({ list }: { list: Server[] }) {
  const [servers, setServers] = useState<Server[]>(list);

  return (
    <ul className={styles.serverList}>
      <AnimatePresence>
        {servers.map((server, i) => (
          <Motion.li
            className={styles.card}
            key={i}
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              ease: "easeOut",
              duration: 0.4,
              delay: 0.02 * i,
              type: "spring",
            }}
          >
            <Link href={`/server/${server.id}`}>
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
          </Motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
