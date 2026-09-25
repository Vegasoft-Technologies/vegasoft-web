import Link from "next/link";
import { areas } from "@/content/en/areas.ts";
import { home } from "@/content/en/home.ts";
import { numbering } from "@/lib/numbering.ts";
import { servicePath } from "@/lib/services.ts";
import Container from "@/components/ui/Container.tsx";
import PilotTag from "@/components/ui/PilotTag.tsx";
import styles from "./Services.module.css";

const { services } = home;

export default function Services() {
  return (
    <section className={styles.section} id="services" aria-labelledby="services-title">
      <Container>
        <div className={styles.grid}>
          <header className={styles.head}>
            <h2 id="services-title">{services.title}</h2>
          </header>
          <p className={styles.intro}>
            {services.pilotNoteBefore} <PilotTag /> {services.pilotNoteAfter}
          </p>
        </div>
        <ol className={styles.areas}>
          {areas.map((area, i) => (
            <li key={area.slug} className={styles.area} id={area.slug}>
              <div className={styles.areaHead}>
                <span className={styles.num}>{numbering(i)}</span>
                <h3>
                  <Link href={servicePath(area.slug)}>{area.name}</Link>
                </h3>
                <p className={styles.promise}>{area.promise}</p>
                <p className={styles.audience}>
                  <b>{services.audienceLabel}</b> {area.audience}
                </p>
                {area.example && (
                  <p className={styles.example}>
                    <b>{services.exampleLabel}</b>{" "}
                    <a href={area.example.href}>{area.example.label}</a>,{" "}
                    {area.example.text}
                  </p>
                )}
              </div>
              <ul className={styles.services}>
                {area.services.map((service) => (
                  <li key={service.name}>
                    {service.name}
                    {service.pilot && <PilotTag />}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
