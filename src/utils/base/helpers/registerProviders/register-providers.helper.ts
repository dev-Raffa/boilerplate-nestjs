import { Provider, Type } from '@nestjs/common';
import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';

export const registerProviders = (
  entity: EntityTarget<ObjectLiteral>,
  service: Type<any>,
  others?: Provider[]
): Provider[] => {
  const baseProviders: Provider[] = [
    {
      provide: 'ENTITY',
      useFactory: (datasource: DataSource) => datasource.getRepository(entity),
      inject: ['DATA_SOURCE']
    },
    {
      provide: 'SERVICE',
      useClass: service
    }
  ];
  return others ? [...baseProviders, ...others] : [...baseProviders];
};
