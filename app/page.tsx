import { getServers } from "@/services/api";
import ServerList from "@/components/ServerList";
import styles from "./page.module.css";

export default async function Servers() {
  const servers = await getServers();

  return (
    <section className={styles.page}>
      <div className={styles.blueSpotLight}></div>
      <div className={styles.purpleSpotLight}></div>
      <h1>Servers ({servers.length})</h1>
      {servers.length > 0 ? (
        <ServerList list={servers}/>
      ) : (
        <p>No servers found</p>
      )}
    </section>
  );
}
