import { NGO, newNGO } from "drizzle/schema/ngo";
import { NGOsRepository, PartialNgo } from "../NGOs-repository";
import { createId } from "@paralleldrive/cuid2";

export class InMemoryNGOsRepository implements NGOsRepository {
  public items: NGO[] = [];

  async create(data: newNGO) {
    const ngo = {
      id: createId(),
      name: data.name,
      description: data.description as string | null,
      email: data.email,
      phone: data.phone,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(ngo);

    return ngo;
  }

  async findByEmail(email: string) {
    const ngo = this.items.find((ngo) => ngo.email === email);

    if (!ngo) {
      return null;
    }

    return ngo;
  }

  async findByid(id: string): Promise<PartialNgo | null> {
    const ngo = this.items.find((ngo) => ngo.id === id);

    if (!ngo) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, created_at, ...partialNgo } = ngo;

    return partialNgo;
  }
}
