import { beforeEach, describe, expect, it } from "vitest";
import { FetchPetDetailsUseCase } from "./fetch-pet-details-use-case";
import { InMemoryPetsRepository } from "@/repository/in-memory/in-memory-pets-repository";
import { InMemoryPetsImagesRepository } from "@/repository/in-memory/in-memory-pets-images-repository";
import { InMemoryPetsRequirementsForAdoptionRepository } from "@/repository/in-memory/in-memory-pets-requirements-for-adoption-repository";
import { PetNotExistsError } from "./errors/animal-not-exists-error";

let petsRepository: InMemoryPetsRepository;
let petsImagesRepository: InMemoryPetsImagesRepository;
let petsRequirementsForAdoptionRepository: InMemoryPetsRequirementsForAdoptionRepository;
let fetchPetDetailsUseCase: FetchPetDetailsUseCase;

describe("Fetch Pet Details Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    petsImagesRepository = new InMemoryPetsImagesRepository();
    petsRequirementsForAdoptionRepository =
      new InMemoryPetsRequirementsForAdoptionRepository();
    fetchPetDetailsUseCase = new FetchPetDetailsUseCase(
      petsRepository,
      petsImagesRepository,
      petsRequirementsForAdoptionRepository,
    );
  });

  it("Should be able to fetch pet details", async () => {
    const pet = await petsRepository.create({
      name: "Branquinho",
      about: "Um belo cao",
      age: "adult",
      ambient_type: "compact",
      energy: 1,
      gender: "male",
      independency_level: "low",
      ngo_id: "asdfgkjasfjas;ljkdf",
      size: "small",
      type: "dog",
    });

    await petsImagesRepository.create({
      pet_id: pet.id,
      image_name: "um belo flocos",
    });

    await petsImagesRepository.create({
      pet_id: pet.id,
      image_name: "branquinho ",
    });

    await petsRequirementsForAdoptionRepository.create([
      {
        pet_id: pet.id,
        description: "Necessita de muito espaço para brincar",
      },
      {
        pet_id: pet.id,
        description: "Necessita de um grande quintal",
      },
    ]);

    const petDetails = await fetchPetDetailsUseCase.execute({ id: pet.id });

    expect(petDetails.pet).toEqual(
      expect.objectContaining({
        images: expect.any(Array),
        requirementsForAdoption: expect.any(Array),
      }),
    );
    expect(petDetails.pet.images.length).toEqual(2);
    expect(petDetails.pet.requirementsForAdoption.length).toEqual(2);
  });

  it("Should not be able to fetch details from a non existent pet", async () => {
    expect(
      async () =>
        await fetchPetDetailsUseCase.execute({ id: "non-existent-id" }),
    ).rejects.toBeInstanceOf(PetNotExistsError);
  });
});
