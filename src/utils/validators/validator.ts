import { validateArgs } from '../types/validateArgs/validateArgs.type';

export abstract class Validator {
  abstract validate(args: validateArgs): boolean;
}
