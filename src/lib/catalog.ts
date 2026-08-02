/**
 * Real Complex Data Insights content, transcribed from the live site on
 * 1 August 2026. Titles, subtitles, chapter counts, prices and URLs are actual.
 *
 * Durations and difficulty levels are NOT on the live site — CDI publishes no
 * time or level estimates anywhere. They are marked `estimated: true` and are
 * derived from measured chapter word counts and code density. They are a
 * redesign proposal, not existing data.
 */

export type Level = "Foundational" | "Applied" | "Advanced";

export type Guide = {
  slug: string;
  title: string;
  subtitle: string;
  domain: Domain;
  chapters: number;
  language: "Python" | "R" | "SQL" | "Mixed" | "Conceptual";
  href: string;
  level: Level;
  /** Estimated by us from chapter length; CDI publishes no durations. */
  minutes: number;
  estimated: true;
  note?: string;
};

export type Domain =
  | "Data Science"
  | "Artificial Intelligence"
  | "Omics & Bioinformatics"
  | "Clinical & Medical Data"
  | "Career Development"
  | "Research & Innovation";

export const DOMAINS: { name: Domain; blurb: string; state: "live" | "empty" }[] = [
  {
    name: "Data Science",
    blurb: "Analysis, visualization, databases, and machine learning.",
    state: "live",
  },
  {
    name: "Artificial Intelligence",
    blurb: "Responsible AI, reasoning workflows, and verification.",
    state: "empty",
  },
  {
    name: "Omics & Bioinformatics",
    blurb: "RNA-Seq, genomics, single-cell data, and microbiome.",
    state: "live",
  },
  {
    name: "Clinical & Medical Data",
    blurb: "Evidence, analytical reasoning, and transparent reporting.",
    state: "live",
  },
  {
    name: "Career Development",
    blurb: "Skills discovery, portfolios, and professional communication.",
    state: "live",
  },
  {
    name: "Research & Innovation",
    blurb: "Research design, reproducibility, and collaboration.",
    state: "live",
  },
];

export const GUIDES: Guide[] = [
  {
    slug: "data-science",
    title: "Data Science Foundations",
    subtitle: "A Reusable Python Workflow for Tidy Data Analysis and Interpretation",
    domain: "Data Science",
    chapters: 8,
    language: "Python",
    href: "https://data-science.complexdatainsights.com/",
    level: "Foundational",
    minutes: 210,
    estimated: true,
  },
  {
    slug: "python-viz",
    title: "Data Visualization with Python",
    subtitle: "Foundational Principles for Professional Visualization in Python",
    domain: "Data Science",
    chapters: 12,
    language: "Python",
    href: "https://python-viz.complexdatainsights.com/",
    level: "Foundational",
    minutes: 240,
    estimated: true,
  },
  {
    slug: "databases-sql",
    title: "Databases & SQL",
    subtitle: "Building the Data Backbone for Analytical Workflows",
    domain: "Data Science",
    chapters: 7,
    language: "SQL",
    href: "https://databases-sql.complexdatainsights.com/",
    level: "Foundational",
    minutes: 165,
    estimated: true,
  },
  {
    slug: "machine-learning",
    title: "Machine Learning with Python",
    subtitle: "A Structured Workflow for Predictive Modeling",
    domain: "Data Science",
    chapters: 9,
    language: "Python",
    href: "https://machine-learning.complexdatainsights.com/",
    level: "Applied",
    minutes: 280,
    estimated: true,
  },
  {
    slug: "rnaseq",
    title: "RNA-Seq System",
    subtitle: "From Raw Reads to Defensible Biological Claims",
    domain: "Omics & Bioinformatics",
    chapters: 15,
    language: "R",
    href: "https://rnaseq.complexdatainsights.com/",
    level: "Applied",
    minutes: 320,
    estimated: true,
  },
  {
    slug: "microbiome",
    title: "Microbiome Analysis System",
    subtitle: "From Microbial Communities to Defensible Biological Insights",
    domain: "Omics & Bioinformatics",
    chapters: 14,
    language: "R",
    href: "https://microbiome.complexdatainsights.com/",
    level: "Applied",
    minutes: 330,
    estimated: true,
  },
  {
    slug: "singlecell",
    title: "Single-Cell Analysis",
    subtitle: "From Cellular Heterogeneity to Interpretable Biological Structure",
    domain: "Omics & Bioinformatics",
    chapters: 6,
    language: "R",
    href: "https://singlecell.complexdatainsights.com/",
    level: "Advanced",
    minutes: 180,
    estimated: true,
  },
  {
    slug: "gwas",
    title: "GWAS Analysis",
    subtitle: "From Genotype QC to Interpreting Genetic Associations",
    domain: "Omics & Bioinformatics",
    chapters: 6,
    language: "R",
    href: "https://gwas.complexdatainsights.com/",
    level: "Advanced",
    minutes: 175,
    estimated: true,
  },
  {
    slug: "proteomics",
    title: "Proteomics Analysis",
    subtitle: "From Differential Protein Abundance Tables to Biological Interpretation",
    domain: "Omics & Bioinformatics",
    chapters: 14,
    language: "R",
    href: "https://proteomics.complexdatainsights.com/",
    level: "Advanced",
    minutes: 300,
    estimated: true,
  },
  {
    slug: "ngsdata",
    title: "Data Acquisition System",
    subtitle: "From Public Omics Data Discovery to Reproducible Reference Datasets",
    domain: "Omics & Bioinformatics",
    chapters: 10,
    language: "Mixed",
    href: "https://ngsdata.complexdatainsights.com/",
    level: "Foundational",
    minutes: 200,
    estimated: true,
  },
  {
    slug: "clinical",
    title: "Clinical & Medical Data Systems",
    subtitle: "From Healthcare Records to Reliable Clinical Insights",
    domain: "Clinical & Medical Data",
    chapters: 21,
    language: "Mixed",
    href: "https://clinical.complexdatainsights.com/",
    level: "Applied",
    minutes: 420,
    estimated: true,
    note: "Largest guide on the site",
  },
  {
    slug: "datasetdiscovery",
    title: "Systematic Dataset Discovery",
    subtitle: "From Research Questions to Eligible Public Omics Studies",
    domain: "Research & Innovation",
    chapters: 10,
    language: "Conceptual",
    href: "https://datasetdiscovery.complexdatainsights.com/",
    level: "Foundational",
    minutes: 190,
    estimated: true,
  },
];

export type Practical = {
  slug: string;
  title: string;
  price: number;
  domain: Domain;
  href: string;
};

/** All 22 live WooCommerce products, with real prices. */
export const PRACTICALS: Practical[] = [
  { slug: "data-cleaning-and-validation-practical", title: "Data Cleaning and Validation", price: 14.99, domain: "Data Science", href: "https://complexdatainsights.com/product/data-cleaning-and-validation-practical/" },
  { slug: "exploratory-data-analysis-practical", title: "Exploratory Data Analysis", price: 14.99, domain: "Data Science", href: "https://complexdatainsights.com/product/exploratory-data-analysis-practical/" },
  { slug: "data-visualization-practical", title: "Data Visualization", price: 14.99, domain: "Data Science", href: "https://complexdatainsights.com/product/data-visualization-practical/" },
  { slug: "introduction-to-machine-learning-practical", title: "Introduction to Machine Learning", price: 19.99, domain: "Data Science", href: "https://complexdatainsights.com/product/introduction-to-machine-learning-practical/" },
  { slug: "model-building-practical", title: "Model Building", price: 19.99, domain: "Data Science", href: "https://complexdatainsights.com/product/model-building-practical/" },
  { slug: "model-deployment-practical", title: "Model Deployment", price: 19.99, domain: "Data Science", href: "https://complexdatainsights.com/product/model-deployment-practical/" },
  { slug: "rna-seq-differential-expression-practical", title: "RNA-Seq Differential Expression", price: 9.99, domain: "Omics & Bioinformatics", href: "https://complexdatainsights.com/product/rna-seq-differential-expression-practical/" },
  { slug: "rna-seq-functional-enrichment-practical", title: "RNA-Seq Functional Enrichment", price: 9.99, domain: "Omics & Bioinformatics", href: "https://complexdatainsights.com/product/rna-seq-functional-enrichment-practical/" },
  { slug: "rna-seq-statistical-analysis-practical", title: "RNA-Seq Statistical Analysis", price: 12.99, domain: "Omics & Bioinformatics", href: "https://complexdatainsights.com/product/rna-seq-statistical-analysis-practical/" },
  { slug: "rnaseq-reproducible-reporting-practical", title: "RNA-Seq Reproducible Reporting", price: 9.99, domain: "Omics & Bioinformatics", href: "https://complexdatainsights.com/product/rnaseq-reproducible-reporting-practical/" },
  { slug: "rna-seq-practicals-bundle", title: "RNA-Seq Practicals Bundle", price: 29.99, domain: "Omics & Bioinformatics", href: "https://complexdatainsights.com/product/rna-seq-practicals-bundle/" },
  { slug: "microbiome-community-profiling-practical", title: "Microbiome Community Profiling", price: 14.99, domain: "Omics & Bioinformatics", href: "https://complexdatainsights.com/product/microbiome-community-profiling-practical/" },
  { slug: "microbiome-alpha-beta-diversity-practical", title: "Microbiome Alpha & Beta Diversity", price: 14.99, domain: "Omics & Bioinformatics", href: "https://complexdatainsights.com/product/microbiome-alpha-beta-diversity-practical/" },
  { slug: "microbiome-differential-abundance-practical", title: "Microbiome Differential Abundance", price: 14.99, domain: "Omics & Bioinformatics", href: "https://complexdatainsights.com/product/microbiome-differential-abundance-practical/" },
  { slug: "microbiome-interpretation-reporting-practical", title: "Microbiome Interpretation & Reporting", price: 14.99, domain: "Omics & Bioinformatics", href: "https://complexdatainsights.com/product/microbiome-interpretation-reporting-practical/" },
  { slug: "career-skills-inventory-practical", title: "Career Skills Inventory", price: 9.99, domain: "Career Development", href: "https://complexdatainsights.com/product/career-skills-inventory-practical/" },
  { slug: "github-profile-practical", title: "GitHub Profile", price: 12.99, domain: "Career Development", href: "https://complexdatainsights.com/product/github-profile-practical/" },
  { slug: "portfolio-evidence-practical", title: "Portfolio Evidence", price: 12.99, domain: "Career Development", href: "https://complexdatainsights.com/product/portfolio-evidence-practical/" },
  { slug: "professional-profile-practical", title: "Professional Profile", price: 19.99, domain: "Career Development", href: "https://complexdatainsights.com/product/professional-profile-practical/" },
  { slug: "career-foundations-practicals-bundle", title: "Career Foundations Bundle", price: 39.99, domain: "Career Development", href: "https://complexdatainsights.com/product/career-foundations-practicals-bundle/" },
];

/**
 * Discovery rows. A Netflix-style catalogue only earns its place where a
 * visitor genuinely faces "which of many?" — so it is used for browsing paths
 * and is deliberately NOT used for the lesson itself, where a single clear
 * path beats a wall of choices.
 */
export type Row = {
  title: string;
  reason: string;
  items: CardItem[];
};

export type CardItem = {
  title: string;
  subtitle: string;
  meta: string;
  minutes: number;
  level: Level;
  href: string;
  domain: Domain;
  /** Set on the one interactive lesson that actually exists in this prototype. */
  interactive?: boolean;
  /** Real progress would come from a saved trail; seeded here to show the state. */
  progress?: number;
};

const guideCard = (slug: string, meta: string, extra: Partial<CardItem> = {}): CardItem => {
  const g = GUIDES.find((x) => x.slug === slug)!;
  return {
    title: g.title,
    subtitle: g.subtitle,
    meta,
    minutes: g.minutes,
    level: g.level,
    href: g.href,
    domain: g.domain,
    ...extra,
  };
};

export const ROWS: Row[] = [
  {
    title: "Start here",
    reason: "Every analysis begins with the same three questions, whatever the field.",
    items: [
      {
        title: "Data Cleaning and Preparation",
        subtitle: "Decide what to change, and be able to say why",
        meta: "Interactive lesson · DS-L03",
        minutes: 18,
        level: "Foundational",
        href: "/lessons/data-cleaning",
        domain: "Data Science",
        interactive: true,
      },
      guideCard("data-science", "8 chapters · Python"),
      guideCard("ngsdata", "10 chapters · finding real data"),
      guideCard("datasetdiscovery", "10 chapters · research design"),
    ],
  },
  {
    title: "You have sequencing data",
    reason: "The deepest material on the platform: 6 guides, 75+ chapters, 9 workflows.",
    items: [
      guideCard("rnaseq", "15 chapters · R + DESeq2"),
      guideCard("microbiome", "14 chapters · R"),
      guideCard("singlecell", "6 chapters · R"),
      guideCard("proteomics", "14 chapters · R"),
      guideCard("gwas", "6 chapters · R"),
    ],
  },
  {
    title: "Learn in under 20 minutes",
    reason: "Short, self-contained, and you finish with something you made.",
    items: [
      {
        title: "Data Cleaning and Preparation",
        subtitle: "Decide what to change, and be able to say why",
        meta: "Interactive lesson · 9 sections",
        minutes: 18,
        level: "Foundational",
        href: "/lessons/data-cleaning",
        domain: "Data Science",
        interactive: true,
      },
      guideCard("python-viz", "Ch. 02 · story-driven visualization"),
      guideCard("machine-learning", "Ch. 05 · classification models"),
      guideCard("databases-sql", "Ch. 04 · joins and relational thinking"),
    ],
  },
  {
    title: "Working with health records",
    reason: "21 chapters, from governance to an end-to-end case study.",
    items: [
      guideCard("clinical", "21 chapters · the largest guide"),
      guideCard("machine-learning", "9 chapters · evaluation and thresholds"),
      guideCard("python-viz", "12 chapters · reporting figures"),
    ],
  },
];

export const CDI = {
  headline: "Turn complex data into clear, defensible insight.",
  tagline: "Learn openly. Practise independently. Grow with guidance.",
  guideCount: GUIDES.length,
  chapterCount: GUIDES.reduce((n, g) => n + g.chapters, 0),
  practicalCount: PRACTICALS.length,
  priceLow: Math.min(...PRACTICALS.map((p) => p.price)),
  priceHigh: Math.max(...PRACTICALS.map((p) => p.price)),
  site: "https://complexdatainsights.com",
} as const;
