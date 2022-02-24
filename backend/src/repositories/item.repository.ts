import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {SqliteDataSource} from '../datasources';
import {Folder, Item, ItemRelations} from '../models';
import {FolderRepository} from './folder.repository';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.id,
  ItemRelations
> {
  public readonly folder: BelongsToAccessor<Folder, typeof Item.prototype.id>;

  constructor(
    @inject('datasources.sqlite') dataSource: SqliteDataSource,
    @repository.getter('FolderRepository') protected folderRepositoryGetter: Getter<FolderRepository>,
  ) {
    super(Item, dataSource);
    this.folder = this.createBelongsToAccessorFor('folder', folderRepositoryGetter,);
    this.registerInclusionResolver('folder', this.folder.inclusionResolver);
  }
}
