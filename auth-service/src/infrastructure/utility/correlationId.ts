// correlationId.ts
export const generateCorrelationId = (): string => {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
};
