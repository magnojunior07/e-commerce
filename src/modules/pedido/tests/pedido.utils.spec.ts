import { verificarEstoque, calcularValorTotal } from "../pedido.utils";

describe("Pedido Utils", () => {
    describe("verificarEstoque", () => {
        it("Deve retornar true se o estoque for suficiente", () => {
            const estoqueAtual = 10;
            const quantidadeSolicitada = 5;
            const resultado = verificarEstoque(
                estoqueAtual,
                quantidadeSolicitada,
            );
            expect(resultado).toBe(true);
        });

        it("Deve retornar false se o estoque não for suficiente", () => {
            const estoqueAtual = 3;
            const quantidadeSolicitada = 5;
            const resultado = verificarEstoque(
                estoqueAtual,
                quantidadeSolicitada,
            );
            expect(resultado).toBe(false);
        });

        it("Deve retornar true se o estoque for exatamente igual à quantidade solicitada", () => {
            const estoqueAtual = 5;
            const quantidadeSolicitada = 5;
            const resultado = verificarEstoque(
                estoqueAtual,
                quantidadeSolicitada,
            );
            expect(resultado).toBe(true);
        });
    });

    describe("calcularValorTotal", () => {
        it("Deve calcular o valor total corretamente para itens com valores positivos", () => {
            const itens = [
                { quantidade: 2, valorUnitario: 10.5 },
                { quantidade: 1, valorUnitario: 20 },
            ];
            const resultado = calcularValorTotal(itens);
            expect(resultado).toBeCloseTo(41); // 2 * 10.5 + 1 * 20 = 41
        });

        it("Deve retornar 0 se nenhum item for fornecido", () => {
            const itens: any[] = [];
            const resultado = calcularValorTotal(itens);
            expect(resultado).toBe(0);
        });

        it("Deve calcular corretamente quando as quantidades ou valores unitários forem zero", () => {
            const itens = [
                { quantidade: 0, valorUnitario: 10.5 },
                { quantidade: 3, valorUnitario: 0 },
            ];
            const resultado = calcularValorTotal(itens);
            expect(resultado).toBe(0); // 0 * 10.5 + 3 * 0 = 0
        });

        it("Deve lançar erro se algum valor for negativo", () => {
            const itens = [{ quantidade: -1, valorUnitario: 10.5 }];
            expect(() => calcularValorTotal(itens)).toThrowError(
                "Valores inválidos",
            );
        });
    });
});
