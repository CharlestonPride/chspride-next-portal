export interface TeamMember {
  id: string;
  envId: string;
  active: boolean;
  prefix: string;
  firstName: string;
  lastName: string;
  suffix: string;
  title: string;
  executive: boolean;
  order: number;
  dateElected: Date;
  dateElectedToBoard: Date;
  image: string;
  pronouns: Pronouns;
  bio: string;
}

export interface Pronouns {
  subjective: string;
  objective: string;
  possessive: string;
}
