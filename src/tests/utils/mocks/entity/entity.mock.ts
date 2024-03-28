export interface IMockEntity {
  id: number;
  name: string;
  age: number;
}

export class MockEntity implements IMockEntity {
  id: number;
  name: string;
  age: number;

  constructor(id: number, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}
