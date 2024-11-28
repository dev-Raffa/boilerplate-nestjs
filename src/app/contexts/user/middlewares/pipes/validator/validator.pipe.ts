import { ValidatorPiPe } from '../../../../../../utils/decorators/validatorPipe/validator-pipe.decorator';
import { CreateUserDTO } from '../../../dto/create/create-user.dto';
import { UpdateUserDTO } from '../../../dto/update/update-user.dto';

@ValidatorPiPe({
  createDTO: CreateUserDTO,
  updateDTO: UpdateUserDTO
})
export class UserValidatorPipe {}
