import { pagePaths, type Language } from "@/content/routes.ts";
import PageFrame from "@/components/layout/PageFrame.tsx";
import { structuredDataJson } from "@/lib/structured-data.ts";
import Approach from "@/components/sections/Approach.tsx";
import Commitments from "@/components/sections/Commitments.tsx";
import Contact from "@/components/sections/Contact.tsx";
import Hero from "@/components/sections/Hero.tsx";
import HowWePrice from "@/components/sections/HowWePrice.tsx";
import HowWeWork from "@/components/sections/HowWeWork.tsx";
import Problems from "@/components/sections/Problems.tsx";
import Proof from "@/components/sections/Proof.tsx";
import Questions from "@/components/sections/Questions.tsx";
import Services from "@/components/sections/Services.tsx";

/** The home page, in either language. */
export default function HomePage({ language }: { language: Language }) {
  return (
    <PageFrame language={language} paths={pagePaths("home")}>
      <>
        <main id="main">
          <Hero language={language} />
          <Problems language={language} />
          <Services language={language} />
          <Approach language={language} />
          <HowWeWork language={language} />
          <HowWePrice language={language} />
          <Commitments language={language} />
          <Proof language={language} />
          <Questions language={language} />
          <Contact language={language} />
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson(language) }}
        />
      </>
    </PageFrame>
  );
}
