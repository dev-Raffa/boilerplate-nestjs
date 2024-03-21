import { Validator_Errors } from '../../constants/validatorErrors/validatorErrors.const';
import { Validator } from 'src/utils/validators/validator';

export function Validate(validator: InstanceType<typeof Validator>) {
  return (target: any, propertyKey: string) => {
    let value = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(v: any) {
        if (!validator.validate(v)) {
          if (target[Validator_Errors]) {
            target[Validator_Errors].push(propertyKey);
          } else {
            Object.defineProperty(target, Validator_Errors, {
              value: [propertyKey],
              configurable: true,
              enumerable: false,
              writable: true
            });
            target.getValidatorErros = function () {
              return target[Validator_Errors];
            };
          }
        } else {
          value = v;
        }
      },
      configurable: true,
      enumerable: true
    });
  };
}
