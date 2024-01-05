import { InMemoryPetsRepository } from "@/repository/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchPetsByCityUseCase } from "./fetch-pets-by-city-use-case";
import { InMemoryNGOsRepository } from "@/repository/in-memory/in-memory-NGOs-repository";
import { InMemoryAddressesRepository } from "@/repository/in-memory/in-memory-address-repository";
import { NGO } from "drizzle/schema/ngo";

let ngosRepository: InMemoryNGOsRepository;
let addressesRepository: InMemoryAddressesRepository;
let petsRepository: InMemoryPetsRepository;
let fetchPetsByCityUseCase: FetchPetsByCityUseCase;

let ngo1: NGO;
let ngo2: NGO;

describe("Fetch Pets by City use Case", () => {
  beforeEach(async () => {
    ngosRepository = new InMemoryNGOsRepository();
    addressesRepository = new InMemoryAddressesRepository();
    petsRepository = new InMemoryPetsRepository();
    fetchPetsByCityUseCase = new FetchPetsByCityUseCase(
      petsRepository,
      addressesRepository,
    );

    ngo1 = await ngosRepository.create({
      name: "Bela Adocao",
      email: "bela@adocao.com",
      password_hash: "ASDJFHALKJSDHAULJSd",
      phone: "14996123109",
    });

    ngo2 = await ngosRepository.create({
      name: "Incrivel",
      email: "incrivel@adocao.com",
      password_hash: "ASDJFHALKJSDHAULJSd",
      phone: "14996123109",
    });

    await addressesRepository.create({
      cep: "18770000",
      city: "Águas de Santa Bárbara",
      district: "Centro",
      street: "Rua Marques do Vale",
      latitude: -22.881247,
      longitude: -49.240583,
      ngo_id: ngo1.id,
    });

    await addressesRepository.create({
      cep: "18770000",
      city: "Águas de Santa Bárbara",
      district: "Centro",
      street: "Rua Marques do Vale",
      latitude: -23.881247,
      longitude: -49.240583,
      ngo_id: ngo2.id,
    });
  });

  it("Should be able to fetch pets by city", async () => {
    await petsRepository.create({
      name: "Branquinho",
      about: "Um belo cao",
      age: "adult",
      ambient_type: "compact",
      energy: 1,
      gender: "male",
      independency_level: "low",
      ngo_id: ngo1.id,
      size: "small",
      type: "dog",
    });

    await petsRepository.create({
      name: "Amarelinha",
      about: "Um belo cao caramelo",
      age: "puppy",
      ambient_type: "spacious",
      energy: 1,
      gender: "female",
      independency_level: "high",
      ngo_id: ngo2.id,
      size: "small",
      type: "dog",
    });

    const pets = await fetchPetsByCityUseCase.execute({
      city_name: "Águas de Santa Bárbara",
      page: 1,
    });

    expect(pets.pets.length).toEqual(2);
  });

  it("Should be able to fetch 20 pets by page", async () => {
    const createPetPromise = [];

    for (let i = 1; i <= 10; i++) {
      const petPromise = await petsRepository.create({
        name: `Branquinho ${i}`,
        about: "Um belo cao",
        age: "adult",
        ambient_type: "compact",
        energy: 1,
        gender: "male",
        independency_level: "low",
        ngo_id: ngo1.id,
        size: "small",
        type: "dog",
      });

      const petPromise2 = await petsRepository.create({
        name: `Branquinho ${i + 10}`,
        about: "Um belo cao",
        age: "adult",
        ambient_type: "compact",
        energy: 1,
        gender: "male",
        independency_level: "low",
        ngo_id: ngo2.id,
        size: "small",
        type: "dog",
      });

      createPetPromise.push(petPromise, petPromise2);
    }

    await Promise.all(createPetPromise);

    const pets = await fetchPetsByCityUseCase.execute({
      city_name: "Águas de Santa Bárbara",
      page: 1,
    });

    expect(pets.pets.length).toEqual(20);
  });

  it("Should be able to fetch pets by filters", async () => {
    await petsRepository.create({
      name: "Branquinho",
      about: "Um belo cao",
      age: "adult",
      ambient_type: "compact",
      energy: 1,
      gender: "male",
      independency_level: "low",
      ngo_id: ngo1.id,
      size: "small",
      type: "dog",
    });

    await petsRepository.create({
      name: "Amarelinha",
      about: "Um belo cao caramelo",
      age: "puppy",
      ambient_type: "spacious",
      energy: 1,
      gender: "female",
      independency_level: "high",
      ngo_id: ngo2.id,
      size: "small",
      type: "dog",
    });

    await petsRepository.create({
      name: "Floquinho",
      about: "Um belo cao caramelo",
      age: "adult",
      ambient_type: "spacious",
      energy: 1,
      gender: "female",
      independency_level: "high",
      ngo_id: ngo2.id,
      size: "small",
      type: "dog",
    });

    const pets = await fetchPetsByCityUseCase.execute({
      city_name: "Águas de Santa Bárbara",
      page: 1,
      filters: {
        age: "adult",
        ambientType: "spacious",
      },
    });

    expect(pets.pets.length).toEqual(1);
    expect(pets.pets[0].name).toEqual("Floquinho");
  });
});
