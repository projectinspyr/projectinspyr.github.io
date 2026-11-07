/** FAQs on the About and Partners pages. Edited in /keystatic (Lists → FAQs); stored in data/faqs.json. */
import data from "./data/faqs.json";

export type Faq = { question: string; answer: string };

export const aboutFaqs: Faq[] = data.about;

export const partnerFaqs: Faq[] = data.partners;
