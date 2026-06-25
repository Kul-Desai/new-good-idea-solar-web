export const siteConfig = {
  name: "Good Idea Solar",
  url: "https://www.goodideasolar.com",
  tagline: "Farmer-first solar development.",
  description:
    "Good Idea Solar partners with family farms to create long-term income through solar development while preserving productive farmland and strengthening local communities.",
  email: "info@goodideasolar.com",
  address: "142 1/2 Monticello Ave, Annapolis, MD 21401",
  linkedIn: "https://www.linkedin.com/company/goodideasolar/",
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Get a Free Property Analysis", href: "/partner-your-land" },
  trustSignals: [
    "Family-Farm Founded",
    "Service-Disabled Veteran-Owned Small Business",
    "Member of TenneSEIA",
    "Member of Bethesda Green",
    "Active in Maryland & Tennessee",
  ],
} as const;

export const stats = [
  { value: "208 Acres", label: "Partner Farmland" },
  { value: "44 Acres", label: "Dedicated to Solar Projects" },
  { value: "4 Projects", label: "In Development" },
  { value: "10.93 MW", label: "Development Pipeline" },
] as const;

export const processSteps = [
  {
    title: "Initial Conversation",
    body: "We learn about your farm, goals, and questions before recommending any next step.",
  },
  {
    title: "Site Evaluation",
    body: "We review acreage, access, terrain, electrical infrastructure, and current agricultural use.",
  },
  {
    title: "Feasibility Assessment",
    body: "We determine whether a responsible solar project can work for the farm and community.",
  },
  {
    title: "Development",
    body: "We handle the project development work while keeping the landowner informed.",
  },
  {
    title: "Construction",
    body: "If the project moves forward, construction is planned around the farm and local needs.",
  },
  {
    title: "Long-Term Operations",
    body: "The farm continues to benefit from a long-term partnership and ongoing stewardship.",
  },
] as const;
