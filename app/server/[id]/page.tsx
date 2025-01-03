import { getServer } from "@/services/api";
import styles from "./page.module.css";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { BackIcon } from "@/components/icons";
import Link from "next/link";
import SendMessage from "@/components/actions/SendMessage";
import JoinVoiceChannel from "@/components/actions/JoinVoiceChannel";
import { getAverageColor } from "fast-average-color-node";
import { argbFromHex, hexFromArgb, themeFromSourceColor, TonalPalette } from "@material/material-color-utilities";
import ColourChip from "@/components/ColourChip";
import { radialGradient } from "motion/dist/react-client";

export default async function ServerDetails({ params }: { params: Promise<{ id: string }> }) {
  const server = await getServer((await params).id);

  if (!server) {
    return <div>Server not found</div>;
  }

  const baseColour = await getAverageColor(server.iconUrl);
  const theme = themeFromSourceColor(argbFromHex(baseColour.hex));
  const colourKeys: string[] = Object.keys(theme.palettes);
  const palettes: TonalPalette[] = Object.values(theme.palettes);

  return (
    <section className="flex flex-col gap-4 md:py-6">
      <div
        className={styles.leftSpotLight}
        style={{
          background: `radial-gradient(circle, ${hexFromArgb(theme.palettes.primary.keyColor.toInt())} 0%, rgba(0, 0, 0, 0) 70%)`,
        }}
      ></div>
      <div
        className={styles.rightSpotLight}
        style={{
          background: `radial-gradient(circle, ${hexFromArgb(theme.palettes.secondary.keyColor.toInt())} 0%, rgba(0, 0, 0, 0) 70%)`,
        }}
      ></div>
      <header className={styles.header}>
        <div className={styles.subHeader}>
          <Link href={"/"}>
            <BackIcon fill="white" />
          </Link>
          <Image src={server.iconUrl} alt="Server Icon" radius="full" height={48} />
          <h1>{server.name}</h1>
        </div>
      </header>
      <section className={styles.statsArray}>
        <Card className={styles.statsCard}>
          <CardBody className={styles.statsCardBody}>
            <div className={styles.ownerStat}>
              <Image src={server.owner.avatarUrl} alt="Owner Avatar" radius="full" style={{maxHeight: 72}} />
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
        <SendMessage channels={server.channels} />
        <JoinVoiceChannel channels={server.channels} />
      </section>
      <header className={styles.header}>
        <h1>Colour Palette from Icon</h1>
      </header>
      <section>
        <Card isBlurred>
          <CardBody className={styles.palette}>
            {palettes.map((palette, index) =>
              colourKeys[index] !== "error" ? (
                <ColourChip key={colourKeys[index]} label={colourKeys[index]} tonalPalette={palette} />
              ) : null
            )}
          </CardBody>
        </Card>
      </section>
    </section>
  );
}
