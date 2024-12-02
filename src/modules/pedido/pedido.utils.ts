export const verificarEstoque = (
    estoqueAtual: number,
    quantidadeSolicitada: number,
): boolean => {
    return estoqueAtual >= quantidadeSolicitada;
};

export const calcularValorTotal = (
    itens: { quantidade: number; valorUnitario: number }[],
): number => {
    // Verifica se à algum item tem valores negativos
    for (const item of itens) {
        if (item.quantidade < 0 || item.valorUnitario < 0) {
            throw new Error("Valores inválidos");
        }
    }

    // Calcula o valor total
    return itens.reduce(
        (total, item) => total + item.quantidade * item.valorUnitario,
        0,
    );
};
