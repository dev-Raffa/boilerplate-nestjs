import { Validator_Errors } from '../../constants/validatorErrors/validatorErrors.const';
import { Validator } from '../../../utils/validators/validator';
import { errorsException } from 'src/utils/types/ErrorsException/errorsException.type';

export type validateDecoratorOptions = {
  validator: InstanceType<typeof Validator>;
  msgError: string;
};
export function Validate(options: validateDecoratorOptions) {
  return (target: any, propertyKey: string) => {
    let value = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(v: any) {
        const hasError = options.validator.validate({
          value: v,
          msgError: options.msgError
        });
        if (hasError) {
          if (target[Validator_Errors]) {
            target[Validator_Errors].push(propertyKey);
          } else {
            Object.defineProperty(target, Validator_Errors, {
              value: [
                {
                  field: propertyKey,
                  error: options.msgError
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
