export function transformKlineData(data: any) {
  return {
    openTime: new Date(data?.k?.t)?.toISOString(),
    openPrice: data.k.o,
    highPrice: data.k.h,
    lowPrice: data.k.l,
    closePrice: data.k.c,
    volume: data.k.V,
  };
}
