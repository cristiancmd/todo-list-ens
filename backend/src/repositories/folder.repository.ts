import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Folder, FolderRelations, Item} from '../models';
import {ItemRepository} from './item.repository';

export class FolderRepository extends DefaultCrudRepository<
  Folder,
  typeof Folder.prototype.id,
  FolderRelations
> {

  public readonly items: HasManyRepositoryFactory<Item, typeof Folder.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>,
  ) {
    super(Folder, dataSource);
    this.items = this.createHasManyRepositoryFactoryFor('items', itemRepositoryGetter,);
    this.registerInclusionResolver('items', this.items.inclusionResolver);
  }
}
