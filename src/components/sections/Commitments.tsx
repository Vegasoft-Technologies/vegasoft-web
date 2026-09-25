import { commitments } from "@/content/en/commitments.ts";
import Draft from "@/components/ui/Draft.tsx";
import PageSection from "@/components/ui/PageSection.tsx";
import RowList from "@/components/ui/RowList.tsx";

export default function Commitments() {
  const development = process.env.NODE_ENV === "development";
  return (
    <PageSection id="commitments" title={commitments.title} intro={commitments.intro}>
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
          // A draft is shown in place in development only (docs/decisions/0004).
          if (!development) return null;
          return (
            <li key={item.id}>
              <Draft>
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
