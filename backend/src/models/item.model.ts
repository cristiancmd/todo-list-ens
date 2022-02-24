import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Folder} from './folder.model';

@model(
  {
    settings: {
      foreignKeys: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        fk_item_folderId: {
          name: 'fk_item_folderId',
          entity: 'Folder',
          entityKey: 'id',
          foreignKey: 'folderId',
          onUpdate: 'CASCADE', // restrict|cascade|set null|no action|set default
          onDelete: 'CASCADE',
        },
      },
    }
  }
)
export class Item extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    default: false,
  })
  checked?: boolean;


  @property({
    type: 'string',
  })
  name: string;



  @belongsTo(() => Folder)
  folderId: number;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
}

export type ItemWithRelations = Item & ItemRelations;
