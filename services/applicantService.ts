import { Applicant } from "../types/applicant";
import { BaseService } from "./baseService";

export class ApplicantService extends BaseService<Applicant> {
  public constructor() {
    super("Applications");
  }
}
