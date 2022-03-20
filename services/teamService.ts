import { TeamMember } from "../types/teamMember";
import { BaseService } from "./baseService";

export class TeamService extends BaseService<TeamMember> {
  public constructor() {
    super("Directors");
  }
}
