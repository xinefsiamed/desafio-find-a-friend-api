import { InMemoryPetsRepository } from "@/repository/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchPetsByNgoUseCase } from "./fetch-pets-by-ngo-use-case";
import { InMemoryNGOsRepository } from "@/repository/in-memory/in-memory-NGOs-repository";
import { NGO } from "drizzle/schema/ngo";

let petsRepository: InMemoryPetsRepository;
let sut: FetchPetsByNgoUseCase;
let NGORepository: InMemoryNGOsRepository;

let ngo: NGO;

describe("Fetch Pets by NGO Use Case", () => {
  beforeEach(async () => {
    NGORepository = new InMemoryNGOsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new FetchPetsByNgoUseCase(petsRepository);

    ngo = await NGORepository.create({
      name: "Bela Adocao",
      email: "bela@adocao.com",
      password_hash: "ASDJFHALKJSDHAULJSd",
      phone: "14996123109",
    });
  });

  it("Should be able to fetch pets by NGO", async () => {
    await petsRepository.create({
      name: "Branquinho",
      about: "Um belo cao",
      age: "adult",
      ambient_type: "compact",
      energy: 1,
      gender: "male",
      independency_level: "low",
      ngo_id: ngo.id,
      size: "small",
      type: "dog",
    });

    const pets = await sut.execute({ ngo_id: ngo.id, page: 1 });

    expect(pets.pets.length).toEqual(1);
  });

  it("Should be able to fetch pets by page", async () => {
    const createPetPromise = [];

    for (let i = 1; i <= 23; i++) {
      const petPromise = await petsRepository.create({
        name: `Branquinho ${i}`,
        about: "Um belo cao",
        age: "adult",
        ambient_type: "compact",
        energy: 1,
        gender: "male",
        independency_level: "low",
        ngo_id: ngo.id,
        size: "small",
        type: "dog",
      });

      createPetPromise.push(petPromise);
    }

    await Promise.all(createPetPromise);

    const pets = await sut.execute({ ngo_id: ngo.id, page: 2 });

    expect(pets.pets.length).toEqual(3);
  });
});
