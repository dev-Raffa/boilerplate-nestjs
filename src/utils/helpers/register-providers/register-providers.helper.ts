import { Provider, Type } from '@nestjs/common';
import { DataSource } from 'typeorm';

export function registerProviders(
  entity: Type<any>,
  service: Type<any>
): Provider[];

export function registerProviders(
  entity: Type<any>,
  service: Type<any>,
  others: Provider[]
): Provider[];

export function registerProviders(
  entity: Type<any>,
  service: Type<any>,
  others?: Provider[]
): Provider[] {
  const baseProviders: Provider[] = [
    {
      provide: 'REPOSITORY',
      useFactory: (datasource: DataSource) => datasource.getRepository(entity),
      inject: ['DATA_SOURCE']
    },
    {
      provide: 'SERVICE',
      useClass: service
    }
  ];
  return others ? [...baseProviders, ...others] : [...baseProviders];
}
