import { company } from "@/content/company.ts";
import { contentFor } from "@/content/index.ts";
import { pagePath, pagePaths, type Language } from "@/content/routes.ts";
import PageFrame from "@/components/layout/PageFrame.tsx";
import { site } from "@/content/site.ts";
import ContactForm from "@/components/ui/ContactForm.tsx";
import DetailList, { type Detail } from "@/components/ui/DetailList.tsx";
import PageIntro from "@/components/ui/PageIntro.tsx";
import PageSection from "@/components/ui/PageSection.tsx";

export default function ContactPage({ language }: { language: Language }) {
  const { commitments, companyLabels, contact, home } = contentFor(language);
  const reply = commitments.items.find((item) => item.id === "reply" && item.approved);
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
    <PageFrame language={language} paths={pagePaths("contact")}>
      <main id="main">
        <PageIntro
          title={contact.title}
          lead={home.contact.body}
          note={home.contact.hint}
        />
        <PageSection id="form" title={contact.form.title}>
          <ContactForm
            language={language}
            copy={contact.form}
            email={site.email}
            phone={site.phone}
            phoneHref={site.phoneHref}
            privacyHref={pagePath("privacy", language)}
          />
        </PageSection>
        <PageSection id="details" title={contact.details.title} rule>
          <DetailList language={language} details={details} />
        </PageSection>
      </main>
    </PageFrame>
  );
}
