export interface IMockBaseEntity {
  id: number;
  name: string;
  age: number;
}

export class MockBaseEntity implements IMockBaseEntity {
  id: number;
  name: string;
  age: number;

  constructor(id: number, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}
