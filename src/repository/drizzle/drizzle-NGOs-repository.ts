import { NGOs, newNGO } from "drizzle/schema/ngo";
import { NGOsRepository } from "../NGOs-repository";
import { drizzleClient } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export class DrizzleNGOsRepository implements NGOsRepository {
  async create(data: newNGO) {
    const ngo = await drizzleClient.insert(NGOs).values(data).returning();

    return ngo[0];
  }

  async findByEmail(email: string) {
    const ngo = await drizzleClient
      .select()
      .from(NGOs)
      .where(eq(NGOs.email, email));

    if (!ngo) {
      return null;
    }

    return ngo[0];
  }

  async findByid(id: string) {
    const ngo = await drizzleClient
      .select({
        id: NGOs.id,
        name: NGOs.name,
        description: NGOs.description,
        phone: NGOs.phone,
        email: NGOs.email,
      })
      .from(NGOs)
      .where(eq(NGOs.id, id));

    return ngo[0];
  }
}
