import { afterEach, describe, expect, it, vi } from "vitest";
import { createCrudApi } from "../../src/framework/api";

type Item = { id: number; nome: string };
type NewItem = { nome: string };

const api = createCrudApi<Item, NewItem>("itens");

afterEach(() => vi.restoreAllMocks());

describe("infraestrutura da API", () => {
  it("lista recursos usando /api", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify([{ id: 1, nome: "Teste" }]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await expect(api.listar()).resolves.toEqual([{ id: 1, nome: "Teste" }]);
    expect(fetchMock).toHaveBeenCalledWith("/api/itens", expect.any(Object));
  });

  it("envia JSON ao criar", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: 2, nome: "Novo" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await api.criar({ nome: "Novo" });
    const [, options] = fetchMock.mock.calls[0];
    expect(options?.method).toBe("POST");
    expect(options?.headers).toMatchObject({ "Content-Type": "application/json" });
  });

  it("não envia Content-Type JSON em DELETE sem corpo", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 204 }));

    await api.excluir(3);
    const [, options] = fetchMock.mock.calls[0];
    expect(options?.method).toBe("DELETE");
    expect(options?.headers).toEqual({});
  });
});
