// correlationId.ts
// export const generateCorrelationId = (): string => {
//   return (
//     Math.random().toString() +
//     Math.random().toString() +
//     Math.random().toString()
//   );
// };

// src/infrastructure/utility/correlationId.ts
import { v4 as uuidv4 } from "uuid";

export const generateCorrelationId = (): string => {
  return uuidv4();
};
