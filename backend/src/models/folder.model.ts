import {Entity, hasMany, model, property} from '@loopback/repository';
import {Item} from './item.model';

@model({

}
)
export class Folder extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name: string;

  @hasMany(() => Item)
  items: Item[];

  constructor(data?: Partial<Folder>) {
    super(data);
  }
}

export interface FolderRelations {
  // describe navigational properties here
}

export type FolderWithRelations = Folder & FolderRelations;
