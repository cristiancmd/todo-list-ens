import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Item, ItemRelations, Folder} from '../models';
import {FolderRepository} from './folder.repository';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.id,
  ItemRelations
> {

  public readonly folder: BelongsToAccessor<Folder, typeof Item.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FolderRepository') protected folderRepositoryGetter: Getter<FolderRepository>,
  ) {
    super(Item, dataSource);
    this.folder = this.createBelongsToAccessorFor('folder', folderRepositoryGetter,);
    this.registerInclusionResolver('folder', this.folder.inclusionResolver);
  }
}
