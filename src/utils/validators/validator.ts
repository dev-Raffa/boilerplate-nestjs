type validateArgs = {
  value: string;
  msgError: string;
};

export abstract class Validator {
  abstract validate(args: validateArgs): string | void;
}
