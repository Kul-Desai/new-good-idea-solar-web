export type Project = {
  slug: string;
  name: string;
  code: string;
  city: string;
  state: string;
  status: string;
  capacityKw: number;
  capacityLabel: string;
  partnerAcres: number;
  solarAcres: number;
  agUse: string;
  demonstrates: string;
  description: string;
  images: string[];
  imagesAreRepresentative: boolean;
  coords: { lat: number | null; lng: number | null };
};

export const projects: Project[] = [
  {
    slug: "henderson-county",
    name: "Henderson County Sheriff's Office",
    code: "HEN1",
    city: "Lexington",
    state: "Tennessee",
    status: "In Development",
    capacityKw: 800,
    capacityLabel: "800 kW",
    partnerAcres: 5,
    solarAcres: 3,
    agUse: "Pasture",
    demonstrates: "Community & public-sector partnership",
    description:
      "Developed in partnership with Henderson County, Tennessee, this project utilizes unused land reserved for county EMS communications infrastructure. The project demonstrates how underutilized land can generate local renewable energy while supporting public services and community resilience.",
    images: ["/images/projects/henderson-county-1.jpg"],
    imagesAreRepresentative: true,
    coords: { lat: null, lng: null },
  },
  {
    slug: "libertytown-sheep-farm",
    name: "Libertytown Sheep Farm",
    code: "SBY1",
    city: "Berlin",
    state: "Maryland",
    status: "In Development",
    capacityKw: 3960,
    capacityLabel: "3.96 MW",
    partnerAcres: 81,
    solarAcres: 20,
    agUse: "Sheep grazing",
    demonstrates: "Livestock agrivoltaics",
    description:
      "The Libertytown Sheep Farm project supports the expansion of a local sheep farming operation onto a second property. The solar installation is being designed to allow continued grazing, with the panels serving as shade structures for livestock while creating a long-term source of farm income.",
    images: ["/images/projects/libertytown-sheep-farm-1.jpg"],
    imagesAreRepresentative: true,
    coords: { lat: null, lng: null },
  },
  {
    slug: "longridge-road",
    name: "Longridge Road",
    code: "LON1",
    city: "Parsonsburg",
    state: "Maryland",
    status: "In Development",
    capacityKw: 4170,
    capacityLabel: "4.17 MW",
    partnerAcres: 102,
    solarAcres: 14,
    agUse: "Agricultural land",
    demonstrates: "Farm-community collaboration",
    description:
      "The Longridge Road project is being developed in collaboration with local farmers and agricultural stakeholders to demonstrate how solar development and active farming can successfully coexist. The property is currently used for corn and soybean production and is being evaluated for future hay production alongside solar development.",
    images: ["/images/projects/longridge-road-1.jpg"],
    imagesAreRepresentative: true,
    coords: { lat: null, lng: null },
  },
  {
    slug: "sandy-spring-csa",
    name: "Sandy Spring CSA",
    code: "SAN1",
    city: "Ashton",
    state: "Maryland",
    status: "In Development",
    capacityKw: 2000,
    capacityLabel: "2.0 MW",
    partnerAcres: 20,
    solarAcres: 7,
    agUse: "Table crops",
    demonstrates: "Agricultural innovation & food production",
    description:
      "The Sandy Spring CSA project is designed as a regional agrivoltaics demonstration site exploring how food production can continue alongside solar generation. The farm currently grows produce for local food assistance programs and will help evaluate which table crops perform best under and around solar arrays.",
    images: ["/images/projects/sandy-spring-csa-1.jpg"],
    imagesAreRepresentative: true,
    coords: { lat: null, lng: null },
  },
];

export const featuredProjects = projects.filter((project) =>
  ["libertytown-sheep-farm", "henderson-county", "sandy-spring-csa"].includes(project.slug),
);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
