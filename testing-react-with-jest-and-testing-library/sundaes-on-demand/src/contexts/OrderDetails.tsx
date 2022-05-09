import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { PRICE_PER_ITEM } from "./../constants";

const OrderDetails: any = createContext(null);

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function useOrderDetails() {
  const context: any = useContext(OrderDetails);
  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }
  return context;
}

function calculateSubtotal(
  optionType: "scoops" | "toppings",
  optionCounts: any
) {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }
  return optionCount * PRICE_PER_ITEM[optionType];
}

export function OrderDetailsProvider(props: any) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map<string, number>(),
    toppings: new Map<string, number>(),
  });

  const zeroCurrency = formatCurrency(0);

  const [total, setTotal] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubTotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubTotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubTotal + toppingsSubTotal;
    setTotal({
      scoops: formatCurrency(scoopsSubTotal),
      toppings: formatCurrency(toppingsSubTotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  function updateItemCount(
    name: string,
    newItemCount: string,
    optionType: string
  ) {
    const newOptionsCounts: any = { ...optionCounts };
    const optionCountsMap = newOptionsCounts[optionType];
    optionCountsMap.set(name, parseInt(newItemCount));
    setOptionCounts(newOptionsCounts);
  }

  const value = useMemo(() => {
    return [
      {
        ...optionCounts,
        total,
      },
      updateItemCount,
    ];
  }, [optionCounts, total]);

  return <OrderDetails.Provider value={value} {...props} />;
}
