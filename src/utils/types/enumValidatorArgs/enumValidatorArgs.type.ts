export interface EnumValidatorArgs {
  value: string;
  options: {
    enum: { [key: string]: string | number };
  };
}
