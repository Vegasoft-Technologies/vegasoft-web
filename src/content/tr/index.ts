// Türkçe sitedeki her sözcük, tek bir nesnede. İki dil de aynı biçimi dışa aktarır ve
// src/content/index.ts ikisini aynı tipte tutar.

import { about } from "./about.ts";
import { areas, pilotLabel } from "./areas.ts";
import { commitments } from "./commitments.ts";
import { companyLabels } from "./company-labels.ts";
import { companyPage } from "./company-page.ts";
import { contact } from "./contact.ts";
import { home } from "./home.ts";
import { legal } from "./legal.ts";
import { navigation } from "./navigation.ts";
import { notFound } from "./not-found.ts";
import { proof } from "./proof.ts";
import { questions } from "./questions.ts";
import { servicePage } from "./services.ts";

export const content = {
  about,
  areas,
  commitments,
  companyLabels,
  companyPage,
  contact,
  home,
  legal,
  navigation,
  notFound,
  pilotLabel,
  proof,
  questions,
  servicePage,
};
