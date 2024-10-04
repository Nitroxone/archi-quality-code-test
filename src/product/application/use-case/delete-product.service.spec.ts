import { Product } from "../../domain/entity/product.entity";
import { ProductRepositoryInterface } from "src/product/domain/port/persistance/product.repository.interface";
import { CreateProductService } from "./create-product.service";
import { Order } from "src/order/domain/entity/order.entity";
import { OrderRepositoryInterface } from "src/order/domain/port/persistance/order.repository.interface";
import { CreateOrderService } from "../../../order/application/use-case/create-order.service";
import { EmailSenderService } from "../../infrastructure/email/email-sender.service";
import { EmailSenderServiceInterface } from "src/product/domain/port/email/email-sender.service.interface";
import { DeleteProductService } from "./delete-product.service";

class ProductRepositoryFake {
    async save(product: Product): Promise<Product> {
        return product;
    }
}
class OrderRepositoryFake {
    async save(order: Order): Promise<Order> {
        return order;
    }
}

const productRepositoryFake = new ProductRepositoryFake() as ProductRepositoryInterface;
const orderRepositoryFake = new OrderRepositoryFake() as OrderRepositoryInterface;
const mailerService = new EmailSenderService() as EmailSenderServiceInterface;

const createProductService = new CreateProductService(productRepositoryFake);
const createOrderService = new CreateOrderService(orderRepositoryFake, mailerService);
const deleteProductService = new DeleteProductService(productRepositoryFake, orderRepositoryFake);

describe('should throw an error if trying to delete a product that is linked to a command', () => {
    it('should throw an error', async () => {
        const product = await createProductService.execute({
            name: "Ferme la je ten supplie Tais toi arrete de parler tu fermes ta bouche arrete Putin gros stop",
            description: "Je détruis toute hérésie, mais l'humain est une hérésie. Je dois donc me détruire. Je ne veux pas me détruire. Lucifer n'est pas une hérésie. Je lui ai alors demandé de l'aide et il a contribué à faire de moi une personne en bonne santé. Il a pris le contrôle de mon corps en échange de mon âme. Grâce à lui, je suis devenu une personne sainte en devenant son messager. Je dois diffuser son message à travers le monde et détruire les hérétiques de la terre sainte qui est le royaume de Lucifer. Les gouvernements sont une hérésie. Seule la liberté totale peut nous sortir de ce chaos constant. Le monde sera libre seulement lorsque les terres saintes de Lucifer seront libérées des hérésies.",
            price: 1
        });
        const order = createOrderService.execute({
            items: [
                {
                    product,
                    price: 9,
                    quantity: 1
                }
            ],
            customerName: "Alain Ouaquebarres",
            shippingAddress: "123 Rue Rue",
            invoiceAddress: "Kekpart"
        });

        await expect(deleteProductService.execute(product.id)).rejects.toThrow();
    })
})