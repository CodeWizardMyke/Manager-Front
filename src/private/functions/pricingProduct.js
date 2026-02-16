  export default function pricingProduct(qtd, price) {
    const quantity = Number(qtd);
    const unitPriceInCents = Number(price);

    if (isNaN(quantity) || isNaN(unitPriceInCents)) return "R$ 0,00";

    const totalInCents = Math.round(quantity * unitPriceInCents);
    const total = totalInCents / 100;

    return total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }