import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetsRepository } from "@/repository/in-memory/in-memory-pets-repository";
import { CreatePetUseCase } from "./create-pet-use-case";
import { InMemoryPetsRequirementsForAdoptionRepository } from "@/repository/in-memory/in-memory-pets-requirements-for-adoption-repository";

let petsRepository: InMemoryPetsRepository;
let petsRequirementsForAdoption: InMemoryPetsRequirementsForAdoptionRepository;
let sut: CreatePetUseCase;

describe("Create Animal Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    petsRequirementsForAdoption =
      new InMemoryPetsRequirementsForAdoptionRepository();

    sut = new CreatePetUseCase(petsRepository, petsRequirementsForAdoption);
  });

  it("Should be able to register an animal", async () => {
    const animal = await sut.execute({
      name: "Floquinho",
      about: "Um belo cachorro",
      age: "puppy",
      ambient_type: "compact",
      energy: 4,
      ngo_id: "asdfasdfasdfas",
      gender: "male",
      independency_level: "low",
      size: "small",
      type: "dog",
      requirementsForAdoption: [
        {
          description: "Incrivel",
        },
        {
          description: "Necessita de muito espaco",
        },
      ],
    });

    expect(animal.id).toEqual(expect.any(String));
    expect(animal.created_at).toEqual(expect.any(Date));
  });
});
