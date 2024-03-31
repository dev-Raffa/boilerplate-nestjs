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
          const errors: errorsException[] = target[Validator_Errors];

          if (errors) {
            const errorIndex = errors.findIndex((e) => e.field === propertyKey);

            if (errorIndex > -1) {
              errors[errorIndex].error = validatorArgs.errorMsg;
            } else {
              target[Validator_Errors].push({
                field: propertyKey,
                error: validatorArgs.errorMsg
              } as errorsException);
            }
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
          const errors: errorsException[] = target[Validator_Errors];

          if (errors) {
            const errorIndex = errors.findIndex((e) => e.field === propertyKey);

            errorIndex > -1 && errors.splice(errorIndex, 1);
          }
          value = v;
        }
      },
      configurable: true,
      enumerable: true
    });
  };
}
