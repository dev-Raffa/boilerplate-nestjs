export type lengthValidatorArgs = {
  value: string;
  msgError: string;
  options?: {
    max?: number;
    min?: number;
  };
};
