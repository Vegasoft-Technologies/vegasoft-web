import Link from "next/link";
import { contentFor } from "@/content/index.ts";
import { anchorId, areaSegment, servicePath, type Language } from "@/content/routes.ts";
import { numbering } from "@/lib/numbering.ts";
import Container from "@/components/ui/Container.tsx";
import PilotTag from "@/components/ui/PilotTag.tsx";
import styles from "./Services.module.css";

export default function Services({ language }: { language: Language }) {
  const { areas, home } = contentFor(language);
  const { services } = home;
  return (
    <section
      className={styles.section}
      id={anchorId("services", language)}
      aria-labelledby="services-title"
    >
      <Container>
        <div className={styles.grid}>
          <header className={styles.head}>
            <h2 id="services-title">{services.title}</h2>
          </header>
          <p className={styles.intro}>
            {services.pilotNoteBefore} <PilotTag language={language} />{" "}
            {services.pilotNoteAfter}
          </p>
        </div>
        <ol className={styles.areas}>
          {areas.map((area, i) => (
            <li
              key={area.slug}
              className={styles.area}
              id={areaSegment(area.slug, language)}
            >
              <div className={styles.areaHead}>
                <span className={styles.num}>{numbering(i)}</span>
                <h3>
                  <Link href={servicePath(area.slug, language)}>{area.name}</Link>
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
                    {service.pilot && <PilotTag language={language} />}
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
