export type numberValidatorArgs = {
  value: number;
  msgError: string;
  options?: {
    max?: number;
    min?: number;
  };
};
