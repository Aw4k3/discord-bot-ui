import { getServers } from "@/services/api";
import { Server } from "@/types/Server";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import styles from "./page.module.css";

export default async function Servers() {
  const servers = await getServers();

  return (
    <section className="flex flex-col gap-4 md:py-6">
      <h1>Servers ({servers.length})</h1>
      {servers.length > 0 ? (
        <ul className={styles.serverList}>
          {servers.map((server, i) => (
            <Card className={styles.card} key={i} isFooterBlurred>
              <Image className={styles.cardBackground} alt="Server Icon" src={server.icon} width={"100%"} shadow="lg"/>
              <CardBody className={styles.cardBody}>
                <Image className={styles.serverIcon} alt="Server Icon" src={server.icon} />
                <div className={styles.serverInfo}>
                  <h2>{server.name}</h2>
                  <p>Member count: {server.memberCount}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </ul>
      ) : (
        <p>No servers found</p>
      )}
    </section>
  );
}
