import { InMemoryNGOsRepository } from "@/repository/in-memory/in-memory-NGOs-repository";
import { InMemoryAddressesRepository } from "@/repository/in-memory/in-memory-address-repository";
import { beforeEach, describe, it, expect } from "vitest";
import { CreateNGOUsecase } from "./create-ngo-use-case";
import { NGOAlreadyExistsError } from "./errors/ngo-already-exists-error";

let NGOsRepository: InMemoryNGOsRepository;
let addressesRepository: InMemoryAddressesRepository;
let sut: CreateNGOUsecase;

describe("Create NGO use case", () => {
  beforeEach(() => {
    NGOsRepository = new InMemoryNGOsRepository();
    addressesRepository = new InMemoryAddressesRepository();
    sut = new CreateNGOUsecase(NGOsRepository, addressesRepository);
  });

  it("Should be able to register an NGO", async () => {
    const { NGO } = await sut.execute({
      name: "Adote",
      cep: "18770000",
      city: "Águas de Santa Bárbara",
      district: "Centro",
      email: "adoteumpet@gmail.com",
      latitude: -22.881247,
      longitude: -49.240583,
      phone: "14997993243",
      password: "123456",
      street: "Rua Marques do Vale",
      description: "Faça a vida de um pet melhor",
    });

    expect(NGO.id).toEqual(expect.any(String));
    expect(NGO.address).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        ngo_id: NGO.id,
      }),
    );
  });

  it("Should not be able to register an NGO with same email twice", async () => {
    await sut.execute({
      name: "Adote",
      cep: "18770000",
      city: "Águas de Santa Bárbara",
      district: "Centro",
      email: "adoteumpet@gmail.com",
      latitude: -22.881247,
      longitude: -49.240583,
      phone: "14997993243",
      password: "123456",
      street: "Rua Marques do Vale",
      description: "Faça a vida de um pet melhor",
    });

    expect(
      async () =>
        await sut.execute({
          name: "Melhor ONG",
          cep: "18770000",
          city: "Águas de Santa Bárbara",
          district: "Centro",
          email: "adoteumpet@gmail.com",
          latitude: -22.881247,
          longitude: -49.240583,
          phone: "14997993243",
          password: "123456",
          street: "Rua Marques do Vale",
          description: "Faça a vida de um pet melhor",
        }),
    ).rejects.toBeInstanceOf(NGOAlreadyExistsError);
  });
});
