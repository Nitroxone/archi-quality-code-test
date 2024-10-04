import { Product } from "../../entity/product.entity";

export interface ProductRepositoryInterface {
  save(order: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findByName(customerName: string): Promise<Product[]>;
  deleteProduct(id: string): Promise<void>;
}
