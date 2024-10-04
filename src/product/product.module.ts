import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./domain/entity/product.entity";
import ProductRepositoryTypeOrm from "./infrastructure/persistance/product.repository";
import { CreateProductService } from "./application/use-case/create-product.service";
import { DeleteProductService } from "./application/use-case/delete-product.service";
import { ListProductsService } from "./application/use-case/list-products.service";
import { UpdateProductService } from "./application/use-case/update-product.service";
import { ProductRepositoryInterface } from "./domain/port/persistance/product.repository.interface";
import { OrderRepositoryInterface } from "src/order/domain/port/persistance/order.repository.interface";
import OrderRepositoryTypeOrm from "src/order/infrastructure/persistance/order.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    
    providers: [
        ProductRepositoryTypeOrm,
        OrderRepositoryTypeOrm,
        {
            provide: CreateProductService,
            useFactory: (
                productRepository: ProductRepositoryInterface
            ) => {
                return new CreateProductService(productRepository);
            },
            inject: [ProductRepositoryTypeOrm]
        },
        {
            provide: DeleteProductService,
            useFactory: (
                productRepository: ProductRepositoryInterface,
                orderRepository: OrderRepositoryInterface
            ) => {
                return new DeleteProductService(productRepository, orderRepository);
            },
            inject: [ProductRepositoryTypeOrm, OrderRepositoryTypeOrm]
        },
        {
            provide: ListProductsService,
            useFactory: (
                productRepository: ProductRepositoryInterface
            ) => {
                return new ListProductsService(productRepository);
            },
            inject: [ProductRepositoryTypeOrm]
        },
        {
            provide: UpdateProductService,
            useFactory: (
                productRepository: ProductRepositoryInterface
            ) => {
                return new UpdateProductService(productRepository);
            },
            inject: [ProductRepositoryTypeOrm]
        },
    ],
})
export class ProductModule {}