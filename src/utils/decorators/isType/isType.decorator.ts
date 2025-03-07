import { TValidatorsOptions, Validate } from '../validate/validate.decorator';

interface TIsType extends TValidatorsOptions {}

export function isType(args: TIsType) {
  return Validate({
    type: args.type,
    nullable: args.nullable || false,
    isArray: args.isArray || false
  });
}
