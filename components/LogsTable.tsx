"use client";

import { LogLine } from "@/types/LogLine";
import { Chip } from "@heroui/chip";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { useState } from "react";
import styles from "./LogsTable.module.css";

export default function Logs({ logLines }: { logLines: LogLine[] }) {
  const [logs, setLogs] = useState<LogLine[]>(logLines);
  const chipColors: Map<string, "warning" | "danger" | "primary" | "secondary" | "default" | "success" | undefined> =
    new Map([
      ["warning", "warning"],
      ["error", "danger"],
      ["debug", "primary"],
      ["info", "default"],
    ]);

  return (
    <Table className={styles.tableWrapper}>
      <TableHeader>
        <TableColumn>Timestamp</TableColumn>
        <TableColumn>Type</TableColumn>
        <TableColumn>Message</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>
        {logs.map((log, index) => (
          <TableRow key={index}>
            <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
            <TableCell>
              <Chip color={chipColors.get(log.type)}>
                {log.type[0].toUpperCase()}
                {log.type.slice(1)}
              </Chip>
            </TableCell>
            <TableCell>{log.message}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
