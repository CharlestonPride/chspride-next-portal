import * as yup from "yup";
import { BaseRecord } from "../services/baseService";

export interface StatusInfo {
  status: string;
  name: string;
  description: string;
  badge: string;
  terminal?: boolean; // this status is a terminal state.
}

export const ApplicationStatusInfos: StatusInfo[] = [
  { status: "new", name: "New", description: "New applicant", badge: "info" },
  {
    status: "pending",
    name: "Pending",
    description:
      "Application under consideration but board not actively recruiting",
    badge: "info",
  },

  {
    status: "contacted",
    name: "Contacted",
    description: "Applicant has been contacted to schedule interview",
    badge: "info",
  },
  {
    status: "scheduled",
    name: "Scheduled for interview",
    description: "Applicant has been scheduled for an interview",
    badge: "info",
  },

  {
    status: "awaitingDecision",
    name: "Awaiting board decision",
    description: "Applicant has been interviewed. Board will vote to decide",
    badge: "primary",
  },
  {
    status: "offeredPosition",
    name: "Offered position",
    description: "Board has voted and decided to offer position.",
    badge: "primary",
  },
  {
    status: "accepted",
    name: "Accepted position",
    description: "Applicant has accepted the position",
    badge: "success",
    terminal: true,
  },
  {
    status: "declined",
    name: "Declined position",
    description: "Applicant has declined the position",
    badge: "danger",
    terminal: true,
  },
  {
    status: "rejected",
    name: "Rejected",
    description:
      "Board has rejected application or decided to not offer position",
    badge: "dark",
    terminal: true,
  },
];

export interface Applicant extends BaseRecord {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  pronouns: { subjective: string; objective: string; possessive: string };
  statement: string;
  skills: {
    administrationManagement: boolean;
    entertainment: boolean;
    eventPlanning: boolean;
    financeAccounting: boolean;
    fundraising: boolean;
    grantWriting: boolean;
    outreachAdvocacy: boolean;
    policyDevelopment: boolean;
    programEvaluation: boolean;
    socialMediaCommunications: boolean;
    visualMedia: boolean;
    volunteerManagement: boolean;
    technologyWebManagement: boolean;
    other: string;
  };
  liaison: string;
  resume: {
    fileName: string;
    type: string;
    size: number;
  };
  readBylaws: boolean;
  recaptcha: string;
  notes: string;
  status: string;
}

export const applicantSchema = yup.object({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string(),
  phoneNumber: yup.string(),
  pronouns: yup.object({
    subjective: yup.string(),
    objective: yup.string(),
    possessive: yup.string(),
  }),
  statement: yup.string(),
  skills: yup.object({
    administrationManagement: yup.boolean(),
    entertainment: yup.boolean(),
    eventPlanning: yup.boolean(),
    financeAccounting: yup.boolean(),
    fundraising: yup.boolean(),
    grantWriting: yup.boolean(),
    outreachAdvocacy: yup.boolean(),
    policyDevelopment: yup.boolean(),
    programEvaluation: yup.boolean(),
    socialMediaCommunications: yup.boolean(),
    visualMedia: yup.boolean(),
    volunteerManagement: yup.boolean(),
    technologyWebManagement: yup.boolean(),
    other: yup.string(),
  }),
  liaison: yup.string(),
  readBylaws: yup.boolean(),
  recaptcha: yup.string(),
  status: yup.string(),
});
