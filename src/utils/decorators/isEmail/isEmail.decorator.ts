import { EmailValidator } from '../../validators/email/email.validator';
import { TValidatorsOptions, Validate } from '../validate/validate.decorator';

interface argsEmailDecorator extends TValidatorsOptions {
  errorMsg?: string;
}

export function isEmail(args?: argsEmailDecorator) {
  return Validate({
    validator: new EmailValidator(),
    validatorArgs: {
      errorMsg:
        args?.errorMsg ||
        'the email should contain a valid format like "name@domain.com" & a valid domain'
    },
    nullable: args?.nullable || false,
    isArray: args?.isArray || false
  });
}
