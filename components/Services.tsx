import { serviceKeys } from "@/lib/site";
import { getDict } from "@/lib/dict";
import type { Lang } from "@/lib/i18n";
import { IconBlinds, IconGlass, IconHandle, IconHelmet, IconPane, IconParquet, IconProfile, IconWindow } from "./Icons";

const icons = {
  aluminium: IconWindow,
  "verre-trempe": IconGlass,
  verre: IconPane,
  accessoires: IconProfile,
  quincaillerie: IconHandle,
  stores: IconBlinds,
  parquet: IconParquet,
  btp: IconHelmet,
} as const;

export default function Services({ lang }: { lang: Lang }) {
  const services = getDict(lang).services;
  return (
    <div className="grid-4">
      {serviceKeys.map((key, i) => {
        const Icon = icons[key];
        const s = services[i]!;
        return (
          <article className="service" key={key}>
            <span className="service__badge">
              <Icon />
            </span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
