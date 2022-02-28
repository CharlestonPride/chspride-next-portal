export interface TeamMember {
  id: string;
  envId: string;
  active: boolean;
  firstName: string;
  lastName: string;
  title: string;
  executive: boolean;
  order: number;
  dateElected: string;
  dateElectedToBoard: string;
  image: string;
  pronouns: Pronouns;
  bio: string;
}

export interface Pronouns {
  subjective: string;
  objective: string;
  possessive: string;
}
