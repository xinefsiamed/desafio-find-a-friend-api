import { beforeEach, describe, expect, it } from "vitest";
import { CreateRequirementsForAdoptionUseCase } from "./create-requirements-for-adoption-use-case";
import { InMemoryPetsRequirementsForAdoptionRepository } from "@/repository/in-memory/in-memory-pets-requirements-for-adoption-repository";
import { InMemoryPetsRepository } from "@/repository/in-memory/in-memory-pets-repository";

let animalsRequirementsForAdoptionRepository: InMemoryPetsRequirementsForAdoptionRepository;
let PetsRepository: InMemoryPetsRepository;
let sut: CreateRequirementsForAdoptionUseCase;

describe("Create Requirements For Adoption Use Case", () => {
  beforeEach(() => {
    animalsRequirementsForAdoptionRepository =
      new InMemoryPetsRequirementsForAdoptionRepository();
    PetsRepository = new InMemoryPetsRepository();
    sut = new CreateRequirementsForAdoptionUseCase(
      animalsRequirementsForAdoptionRepository,
      PetsRepository,
    );
  });

  it("Should be able to register requirements for adoption", async () => {
    const animal = await PetsRepository.create({
      name: "flocos",
      about: "Incrivel",
      age: "adult",
      ambient_type: "compact",
      energy: 3,
      gender: "female",
      independency_level: "high",
      size: "large",
      type: "dog",
      ngo_id: "asdjhfalsjkdf",
    });

    const newRequirement = {
      animail_i: animal.id,
      descriptions: ["Necessita de banho constante"],
    };

    const requirements = await sut.execute({
      pet_id: newRequirement.animail_i,
      descriptions: newRequirement.descriptions,
    });

    expect(requirements).toEqual([
      expect.objectContaining({
        id: expect.any(String),
      }),
    ]);
  });

  it("Should not be able to register any requirement for a non existent animal", async () => {
    const newRequirement = {
      animail_i: "bsalskjdfa120u",
      descriptions: ["Necessita de banho constante"],
    };

    await expect(
      async () =>
        await sut.execute({
          pet_id: newRequirement.animail_i,
          descriptions: newRequirement.descriptions,
        }),
    ).rejects.toBeInstanceOf(Error);
  });
});
