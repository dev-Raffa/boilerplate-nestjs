import { Type } from '@nestjs/common';
import { Validator_Errors } from '../../constants/validatorErrors/validatorErrors.const';
import { Validator } from '../../../utils/validators/validator';
import { errorsException } from '../../../utils/types/ErrorsException/errorsException.type';
import { validatorArgs } from '../../../utils/interfaces/validatorArgs/validatorArgs.interface';

export interface TValidatorsOptions {
  nullable?: boolean;
  isArray?: boolean;
  type?: Type;
}

export interface TValidateDecorator<T extends validatorArgs>
  extends TValidatorsOptions {
  validator?: InstanceType<typeof Validator>;
  validatorArgs?: T;
}

export function Validate<T extends validatorArgs>(args: TValidateDecorator<T>) {
  return (target: any, propertyKey: string) => {
    let value = target[propertyKey];

    function checkErrorsExist() {
      if (!target[Validator_Errors]) {
        Object.defineProperty(target, Validator_Errors, {
          value: [],
          configurable: true,
          enumerable: false,
          writable: true
        });

        target.getValidatorErrors = () => {
          return target[Validator_Errors];
        };
      }
    }

    function clearError() {
      if (target[Validator_Errors]) {
        const errorIndex = target[Validator_Errors].findIndex(
          (e: errorsException) => e.field === propertyKey
        );

        errorIndex >= 0 && target[Validator_Errors].splice(errorIndex, 1);
      }
    }

    function errorIfValueIsUndefined() {
      clearError();
      target[Validator_Errors].push({
        field: propertyKey,
        error: `the property ${propertyKey} is required`
      });
    }

    function registerTypeErrors(errors: errorsException[]) {
      clearError();
      errors.forEach((e) => {
        target[Validator_Errors].push({
          propertyKey: `${propertyKey}.${e.field}`,
          error: e.error
        });
      });
    }

    function definingObjectProperty() {
      Object.defineProperty(target, propertyKey, {
        get() {
          return value;
        },
        set: setValue,
        configurable: true,
        enumerable: true
      });
    }

    function validateComplexType(newValue: any) {
      clearError();
      const instanceType = new args.type();
      Object.assign(instanceType, newValue);
      const erros: [] = instanceType.getValidatorErrors();
      registerTypeErrors(erros);
    }

    function validateSimpleType(newValue: any) {
      clearError();
      const newValueIsValid = args.validator.validate({
        value: newValue,
        options: args.validatorArgs.options
      });

      if (!newValueIsValid) {
        target[Validator_Errors].push({
          field: propertyKey,
          error: args.validatorArgs.errorMsg
        } as errorsException);

        return;
      }
      value = newValue;
    }

    function validateArrayType(newValue: any[]) {
      clearError();
      newValue.forEach((element, index) => {
        if (args.validator && args.validatorArgs) {
          const isValid = args.validator.validate({
            value: element,
            options: args.validatorArgs?.options
          });

          if (!isValid) {
            target[Validator_Errors].push({
              field: `${propertyKey}[${index}]`,
              error: 'Invalid array element'
            });
          }
        } else if (args.type) {
          const instance = new args.type();
          Object.assign(instance, element);
          const errors = instance.getValidatorErrors();

          errors.forEach((error: errorsException) => {
            target[Validator_Errors].push({
              field: `${propertyKey}[${index}].${error.field}`,
              error: error.error
            });
          });
        }
      });
    }

    const setValue = (newValue: any) => {
      clearError();

      if (newValue === undefined) {
        errorIfValueIsUndefined();
        return;
      }

      if (args.isArray) {
        if (!Array.isArray(newValue)) {
          target[Validator_Errors].push({
            field: propertyKey,
            error: `The ${propertyKey} must be a array`
          });
          return;
        }

        validateArrayType(Array(...newValue));
      } else if (args.type) {
        validateComplexType(newValue);
      } else if (args.validator && args.validatorArgs) {
        validateSimpleType(newValue);
      } else {
        value = newValue;
      }
    };

    checkErrorsExist();

    if (!value && args.nullable === false) {
      errorIfValueIsUndefined();
    }

    definingObjectProperty();
  };
}
