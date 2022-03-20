export interface BaseRecord {
  id: string;
  envId: string;
}

export abstract class BaseService<T extends BaseRecord> {
  public constructor(collectionName: string) {
    this.collectionName = collectionName;
  }
  private collectionName: string;
  readonly envId = process.env.NEXT_PUBLIC_ENV_ID;

  async getAll(): Promise<T[]> {
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

  async getById(id: string): Promise<T> {
    try {
      return await (
        await fetch(`/api/${this.envId}/${this.collectionName}/${id}`)
      ).json();
    } catch (error) {
      return undefined;
    }
  }

  async save(record: T): Promise<void> {
    return await fetch(
      `/api/${this.envId}/${this.collectionName}/${record.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      }
    ).then((response) => {
      return;
    });
  }

  async saveNew(record: T): Promise<void> {
    return await fetch(`/api/${this.envId}/${this.collectionName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    }).then((response) => {
      return;
    });
  }

  getNew(): T {
    return {
      envId: this.envId,
    } as T;
  }
}
