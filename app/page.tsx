"use client";

import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useState } from "react";

export default function Servers() {
  const [servers, setServers] = useState<any[]>([{}]);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {servers.length > 0 ? servers.map((server, i) => <Card key={i} isFooterBlurred>
        <Image alt="Server Icon"/>
        <CardFooter>
          <p>Server Name</p>
        </CardFooter>
      </Card>) : <p>No servers found</p>}
    </section>
  );
}
