import { contentFor } from "@/content/index.ts";
import { anchorId, type Language } from "@/content/routes.ts";
import { showSoon } from "@/lib/soon.ts";
import Draft from "@/components/ui/Draft.tsx";
import PageSection from "@/components/ui/PageSection.tsx";
import RowList from "@/components/ui/RowList.tsx";

export default function Commitments({ language }: { language: Language }) {
  const { commitments } = contentFor(language);
  return (
    <PageSection
      id={anchorId("commitments", language)}
      title={commitments.title}
      intro={commitments.intro}
    >
      <RowList>
        {commitments.items.map((item) => {
          if (item.approved) {
            return (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            );
          }
          // A draft is shown in place only where the markers are on (src/lib/soon.ts).
          if (!showSoon) return null;
          return (
            <li key={item.id}>
              <Draft language={language}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Draft>
            </li>
          );
        })}
      </RowList>
    </PageSection>
  );
}
