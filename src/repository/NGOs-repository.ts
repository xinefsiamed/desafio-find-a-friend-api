import { NGO, newNGO } from "drizzle/schema/ngo";

export interface PartialNgo {
  id: string;
  name: string;
  description: string | null;
  phone: string;
  email: string;
}

export interface NGOsRepository {
  create(data: newNGO): Promise<NGO>;
  findByEmail(email: string): Promise<NGO | null>;
  findByid(id: string): Promise<PartialNgo | null>;
}
