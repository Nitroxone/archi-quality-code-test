import { InjectDataSource } from '@nestjs/typeorm';
import { Product } from 'src/product/domain/entity/product.entity';
import { ProductRepositoryInterface } from '../../domain/port/persistance/product.repository.interface';
import { DataSource, Repository } from 'typeorm';

export default class OrderRepositoryTypeOrm
  extends Repository<Product>
  implements ProductRepositoryInterface
{
  constructor(@InjectDataSource() private readonly datasource: DataSource) {
    super(Product, datasource.createEntityManager());
  }

  async findById(id: string): Promise<Product | null> {
    const queryBuilder = this.createQueryBuilder('Product');

    queryBuilder.where('Product.id = :id', { id });

    return queryBuilder.getOne();
  }

  async findAll(): Promise<Product[]> {
    const queryBuilder = this.createQueryBuilder('Product');

    return queryBuilder.getMany();
  }

  async findByName(name: string): Promise<Product[]> {
    const queryBuilder = this.createQueryBuilder('Product');

    queryBuilder.where('Product.name = :name', { name });

    return queryBuilder.getMany();
  }

  async deleteProduct(id: string): Promise<void> {
    const queryBuilder = this.createQueryBuilder('Product');

    queryBuilder.where('Product.id = :id', { id });

    await queryBuilder.delete().execute();
  }
}
