import { argbFromHex, hexFromArgb, TonalPalette } from "@material/material-color-utilities";
import styles from "./ColourChip.module.css";
import { Tooltip } from "@heroui/tooltip";

export default function ColourChip({ label, tonalPalette }: { label: string; tonalPalette: TonalPalette }) {
  const hex = hexFromArgb(tonalPalette.keyColor.toInt());
  return (
    <Tooltip content={hex}>
      <div
        className={styles.container}
        style={{
          backgroundColor: hex,
          filter: `drop-shadow(0 0 0.3rem ${hex})`,
        }}
      >
        <p className={styles.label}>{label[0].toUpperCase() + label.slice(1)}</p>
      </div>
    </Tooltip>
  );
}
