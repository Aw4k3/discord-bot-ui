import { getServers } from "@/services/api";
import styles from "./page.module.css";

export default async function Servers() {
  return (
    <section className={styles.page}>
      <div className={styles.blueSpotLight}></div>
      <div className={styles.purpleSpotLight}></div>
      <h1>Dashboard</h1>
    </section>
  );
}
