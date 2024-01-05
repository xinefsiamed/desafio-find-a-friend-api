import { Pet, newPet } from "drizzle/schema/pet";
import { PetsRepository, FiltersTypes } from "../pets-repository";
import { createId } from "@paralleldrive/cuid2";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async create(data: newPet) {
    const pet = {
      id: createId(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      type: data.type,
      ngo_id: data.ngo_id,
      energy: data.energy,
      gender: data.gender,
      independency_level: data.independency_level,
      ambient_type: data.ambient_type,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async getPetsByNgoId(ngo_id: string, page: number) {
    const pets = this.items
      .filter((pet) => pet.ngo_id === ngo_id)
      .slice((page - 1) * 20, page * 20);

    return pets;
  }

  async getPetsByNgosIds(
    ngosIds: string[],
    page: number,
    filters?: FiltersTypes,
  ) {
    const pets = this.items
      .filter(
        (pet) =>
          ngosIds.includes(pet.ngo_id) &&
          (!filters?.age || pet.age === filters.age) &&
          (!filters?.ambientType || pet.ambient_type === filters.ambientType) &&
          (!filters?.energy || pet.energy === filters.energy) &&
          (!filters?.gender || pet.gender === filters.gender) &&
          (!filters?.independecyLevel ||
            pet.independency_level === filters.independecyLevel) &&
          (!filters?.size || pet.size === filters.size),
      )
      .slice((page - 1) * 20, page * 20);

    return pets;
  }
}
