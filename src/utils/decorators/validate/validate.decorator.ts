import { Validator_Errors } from '../../constants/validatorErrors/validatorErrors.const';
import { Validator } from '../../../utils/validators/validator';
import { errorsException } from '../../../utils/types/ErrorsException/errorsException.type';
import { validatorArgs } from '../../../utils/interfaces/validatorArgs/validatorArgs.interface';

export function Validate<T extends validatorArgs>(
  validator: InstanceType<typeof Validator>,
  validatorArgs: T
) {
  return (target: any, propertyKey: string) => {
    let value = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(v: any) {
        const isValid = validator.validate({
          value: v,
          options: validatorArgs.options
        });
        if (!isValid) {
          if (target[Validator_Errors]) {
            target[Validator_Errors].push(propertyKey);
          } else {
            Object.defineProperty(target, Validator_Errors, {
              value: [
                {
                  field: propertyKey,
                  error: validatorArgs.errorMsg
                } as errorsException
              ],
              configurable: true,
              enumerable: false,
              writable: true
            });
            target.getValidatorErrors = function () {
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
