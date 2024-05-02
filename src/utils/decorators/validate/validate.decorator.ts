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

    if (!target[Validator_Errors]) {
      Object.defineProperty(target, Validator_Errors, {
        value: [],
        configurable: true,
        enumerable: false,
        writable: true
      });
      target.getValidatorErrors = function () {
        return target[Validator_Errors];
      };
    }

    if (!value) {
      target[Validator_Errors].push({
        field: propertyKey,
        error: `the ${propertyKey} is required`
      } as errorsException);
    }

    const clearError = () => {
      if (target[Validator_Errors]) {
        const errorIndex = target[Validator_Errors].findIndex(
          (e) => e.field === propertyKey
        );
        errorIndex > -1 && target[Validator_Errors].splice(errorIndex, 1);
      }
    };

    const setValue = (newValue: any) => {
      if (newValue === undefined) {
        clearError();
        target[Validator_Errors].push({
          field: propertyKey,
          error: `the ${propertyKey} is required`
        } as errorsException);
        return;
      }

      clearError();

      const newValueIsValid = validator.validate({
        value: newValue,
        options: validatorArgs.options
      });

      if (!newValueIsValid) {
        target[Validator_Errors].push({
          field: propertyKey,
          error: validatorArgs.errorMsg
        } as errorsException);
        console.log(target[Validator_Errors]);
        return;
      }

      value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set: setValue,
      configurable: true,
      enumerable: true
    });
  };
}
