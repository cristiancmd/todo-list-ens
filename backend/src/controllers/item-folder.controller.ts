import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Item,
  Folder,
} from '../models';
import {ItemRepository} from '../repositories';

export class ItemFolderController {
  constructor(
    @repository(ItemRepository)
    public itemRepository: ItemRepository,
  ) { }

  @get('/items/{id}/folder', {
    responses: {
      '200': {
        description: 'Folder belonging to Item',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Folder)},
          },
        },
      },
    },
  })
  async getFolder(
    @param.path.number('id') id: typeof Item.prototype.id,
  ): Promise<Folder> {
    return this.itemRepository.folder(id);
  }
}
