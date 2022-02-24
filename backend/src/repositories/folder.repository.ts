import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {SqliteDataSource} from '../datasources';
import {Folder, FolderRelations, Item} from '../models';
import {ItemRepository} from './item.repository';

export class FolderRepository extends DefaultCrudRepository<
  Folder,
  typeof Folder.prototype.id,
  FolderRelations
> {
  public readonly items: HasManyRepositoryFactory<Item, typeof Folder.prototype.id>;

  constructor(
    @inject('datasources.sqlite') dataSource: SqliteDataSource,
    @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>,
  ) {
    super(Folder, dataSource);
    this.items = this.createHasManyRepositoryFactoryFor('items', itemRepositoryGetter,);
    this.registerInclusionResolver('items', this.items.inclusionResolver);
  }
}
