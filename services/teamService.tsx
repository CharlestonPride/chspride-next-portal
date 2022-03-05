import { TeamMember } from "../types/teamMember";

export class TeamService {
  readonly collectionName = "Directors";
  readonly envId = process.env.NEXT_PUBLIC_ENV_ID;

  async getTeam(): Promise<TeamMember[]> {
    try {
      return await (
        await fetch(
          `/api/${process.env.NEXT_PUBLIC_ENV_ID}/${this.collectionName}`
        )
      ).json();
    } catch (error) {
      return [];
    }
  }

  async getById(id: string): Promise<TeamMember> {
    try {
      return await (
        await fetch(`/api/${this.envId}/${this.collectionName}/${id}`)
      ).json();
    } catch (error) {
      return undefined;
    }
  }

  async save(teamMember: TeamMember): Promise<void> {
    return await fetch(
      `/api/${this.envId}/${this.collectionName}/${teamMember.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(teamMember),
      }
    ).then((response) => {
      return;
    });
  }

  async saveNew(teamMember: TeamMember): Promise<void> {
    return await fetch(`/api/${this.envId}/${this.collectionName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teamMember),
    }).then((response) => {
      return;
    });
  }

  getNew(): TeamMember {
    return {
      envId: this.envId,
    } as TeamMember;
  }
}
