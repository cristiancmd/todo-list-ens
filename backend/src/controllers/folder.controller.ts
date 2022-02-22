import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Folder} from '../models';
import {FolderRepository} from '../repositories';

export class FolderController {
  constructor(
    @repository(FolderRepository)
    public folderRepository : FolderRepository,
  ) {}

  @post('/folders')
  @response(200, {
    description: 'Folder model instance',
    content: {'application/json': {schema: getModelSchemaRef(Folder)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Folder, {
            title: 'NewFolder',
            exclude: ['id'],
          }),
        },
      },
    })
    folder: Omit<Folder, 'id'>,
  ): Promise<Folder> {
    return this.folderRepository.create(folder);
  }

  @get('/folders/count')
  @response(200, {
    description: 'Folder model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Folder) where?: Where<Folder>,
  ): Promise<Count> {
    return this.folderRepository.count(where);
  }

  @get('/folders')
  @response(200, {
    description: 'Array of Folder model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Folder, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Folder) filter?: Filter<Folder>,
  ): Promise<Folder[]> {
    return this.folderRepository.find(filter);
  }

  @patch('/folders')
  @response(200, {
    description: 'Folder PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Folder, {partial: true}),
        },
      },
    })
    folder: Folder,
    @param.where(Folder) where?: Where<Folder>,
  ): Promise<Count> {
    return this.folderRepository.updateAll(folder, where);
  }

  @get('/folders/{id}')
  @response(200, {
    description: 'Folder model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Folder, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Folder, {exclude: 'where'}) filter?: FilterExcludingWhere<Folder>
  ): Promise<Folder> {
    return this.folderRepository.findById(id, filter);
  }

  @patch('/folders/{id}')
  @response(204, {
    description: 'Folder PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Folder, {partial: true}),
        },
      },
    })
    folder: Folder,
  ): Promise<void> {
    await this.folderRepository.updateById(id, folder);
  }

  @put('/folders/{id}')
  @response(204, {
    description: 'Folder PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() folder: Folder,
  ): Promise<void> {
    await this.folderRepository.replaceById(id, folder);
  }

  @del('/folders/{id}')
  @response(204, {
    description: 'Folder DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.folderRepository.deleteById(id);
  }
}
