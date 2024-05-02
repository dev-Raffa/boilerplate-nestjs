import { Inject } from '@nestjs/common';
import { ValidateDTOPipe } from '../../builders/pipes/validatedto/validateDto.pipe';

export class CreateDTOPipe extends ValidateDTOPipe {
  constructor(@Inject('CREATE_DTO') private readonly createDTO) {
    super(createDTO);
  }
}
