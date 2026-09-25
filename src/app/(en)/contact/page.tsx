import { company, companyLabels } from "@/content/company.ts";
import { commitment } from "@/content/en/commitments.ts";
import { contact } from "@/content/en/contact.ts";
import { home } from "@/content/en/home.ts";
import { site } from "@/content/site.ts";
import { pageMetadata } from "@/lib/metadata.ts";
import Container from "@/components/ui/Container.tsx";
import DetailList, { type Detail } from "@/components/ui/DetailList.tsx";
import PageIntro from "@/components/ui/PageIntro.tsx";
import PageSection from "@/components/ui/PageSection.tsx";
import Placeholder from "@/components/ui/Placeholder.tsx";
import styles from "./page.module.css";

export const metadata = pageMetadata(contact.meta, "/contact");

export default function ContactPage() {
  const reply = commitment("reply");
  const details: Detail[] = [
    {
      label: home.contact.emailLabel,
      node: <a href={`mailto:${site.email}`}>{site.email}</a>,
    },
    { label: home.contact.phoneLabel, node: <a href={site.phoneHref}>{site.phone}</a> },
    ...(reply ? [{ label: contact.details.replyLabel, value: reply.text }] : []),
    { label: companyLabels.location, value: company.location },
    { label: companyLabels.serviceArea, value: company.serviceArea },
    { label: companyLabels.social, value: company.social },
  ];
  return (
    <main id="main">
      <PageIntro
        title={contact.title}
        lead={home.contact.body}
        note={home.contact.hint}
      />
      <PageSection id="details" title={contact.details.title}>
        <DetailList details={details} />
      </PageSection>
      {process.env.NODE_ENV === "development" && (
        <div className={styles.form}>
          <Container>
            <Placeholder text={contact.formPlaceholder} />
          </Container>
        </div>
      )}
    </main>
  );
}
