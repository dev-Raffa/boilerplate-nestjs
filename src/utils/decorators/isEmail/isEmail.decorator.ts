import { EmailValidator } from '../../validators/email/email.validator';
import { Validate } from '../Validate/validate.decorator';

type argsEmailDecorator = {
  errorMsg?: string;
  nullable?: boolean;
};

export function isEmail(args: argsEmailDecorator) {
  return Validate(new EmailValidator(), {
    errorMsg:
      args.errorMsg ||
      'the email should contain a valid format like "name@domain.com" & a valid domain',
    nullable: args.nullable || false
  });
}
