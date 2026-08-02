import type { Metadata } from "next";
import { LessonClient } from "./LessonClient";

export const metadata: Metadata = {
  title: "Data Cleaning and Preparation",
  description:
    "An interactive lesson on inspecting, deciding, and validating — adapted from the CDI Data Science Foundations System, chapter 03 (DS-L03).",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Data Cleaning and Preparation",
  description:
    "Inspect a dataset, standardize its columns, investigate identical rows, choose a missing-value rule, and validate the result — producing a cleaning report.",
  learningResourceType: "Interactive lesson",
  educationalLevel: "Beginner",
  timeRequired: "PT18M",
  isAccessibleForFree: true,
  inLanguage: "en",
  teaches: [
    "Data quality inspection",
    "Distinguishing identical rows from confirmed duplicates",
    "Explicit missing-value rules",
    "Validation assertions",
  ],
  provider: {
    "@type": "Organization",
    name: "Complex Data Insights",
    url: "https://complexdatainsights.com",
  },
};

export default function DataCleaningLesson() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LessonClient />
    </>
  );
}
