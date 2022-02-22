import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Folder,
  Item,
} from '../models';
import {FolderRepository} from '../repositories';

export class FolderItemController {
  constructor(
    @repository(FolderRepository) protected folderRepository: FolderRepository,
  ) { }

  @get('/folders/{id}/items', {
    responses: {
      '200': {
        description: 'Array of Folder has many Item',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Item)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Item>,
  ): Promise<Item[]> {
    return this.folderRepository.items(id).find(filter);
  }

  @post('/folders/{id}/items', {
    responses: {
      '200': {
        description: 'Folder model instance',
        content: {'application/json': {schema: getModelSchemaRef(Item)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Folder.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {
            title: 'NewItemInFolder',
            exclude: ['id'],
            optional: ['folderId']
          }),
        },
      },
    }) item: Omit<Item, 'id'>,
  ): Promise<Item> {
    return this.folderRepository.items(id).create(item);
  }

  @patch('/folders/{id}/items', {
    responses: {
      '200': {
        description: 'Folder.Item PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {partial: true}),
        },
      },
    })
    item: Partial<Item>,
    @param.query.object('where', getWhereSchemaFor(Item)) where?: Where<Item>,
  ): Promise<Count> {
    return this.folderRepository.items(id).patch(item, where);
  }

  @del('/folders/{id}/items', {
    responses: {
      '200': {
        description: 'Folder.Item DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Item)) where?: Where<Item>,
  ): Promise<Count> {
    return this.folderRepository.items(id).delete(where);
  }
}
