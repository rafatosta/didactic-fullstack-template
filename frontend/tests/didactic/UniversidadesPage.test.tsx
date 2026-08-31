import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const listar = vi.fn();
const criar = vi.fn();
const atualizar = vi.fn();
const excluir = vi.fn();

vi.mock("../../src/framework/resources", () => ({
  universidadesApi: { listar, criar, atualizar, excluir, buscar: vi.fn() },
}));

import { UniversidadesPage } from "../../src/pages/UniversidadesPage";

beforeEach(() => {
  vi.clearAllMocks();
  listar.mockResolvedValue([{ id: 1, nome: "Universidade A" }]);
  criar.mockResolvedValue({ id: 2, nome: "Universidade Nova" });
  atualizar.mockResolvedValue({ id: 1, nome: "Universidade Editada" });
  excluir.mockResolvedValue(undefined);
});

describe("UniversidadesPage", () => {
  it("lista universidades e permite cadastrar", async () => {
    const user = userEvent.setup();
    render(<UniversidadesPage />);

    expect(await screen.findByText("Universidade A")).toBeInTheDocument();
    await user.type(screen.getByPlaceholderText("Nome da universidade"), "Universidade Nova");
    await user.click(screen.getByRole("button", { name: "Cadastrar" }));

    expect(criar).toHaveBeenCalledWith({ nome: "Universidade Nova" });
  });

  it("permite excluir um item", async () => {
    const user = userEvent.setup();
    render(<UniversidadesPage />);

    await screen.findByText("Universidade A");
    await user.click(screen.getByRole("button", { name: "Excluir" }));
    expect(excluir).toHaveBeenCalledWith(1);
  });
});
