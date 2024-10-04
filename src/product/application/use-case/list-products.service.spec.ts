import { Product } from "../../domain/entity/product.entity";
import { ProductRepositoryInterface } from "src/product/domain/port/persistance/product.repository.interface";
import { ListProductsService } from "./list-products.service";

class ProductRepositoryFake {
    async save(product: Product): Promise<Product> {
        return product;
    }
    async findAll(): Promise<Product[]> {
        return [
            new Product({
                name: "annonce leboncoin",
                description: "Une femme qui a de l'autorisation comme moi la tu mintéresse réellement.Annonce réelle sincère et valable pour chaque weekend femmes de 18 a33a . Moi c Alban 43 ans ancien hardeur amateur avec 75 films à mon actif quand même. Dont un dont Je suis le plus fièrs avoir pendant 1h30 mettre occupé de 18 femmes je te rassure je ne le referais plus maintenant. mais Il me reste assez de jus dans le poireaux pour étanche une ou deux chaudes nympho chaque weekend le samedi ou dimanche légèrement salope et très open au niveau des cuisses sans tabous ni complexes. pratique toutes positions, Sexe avec ou sans capote .de mon côté jai le test HIV et mst négatif. suis à Magny en Vexin dans le 95 peux te recevoir et venir te chercher où",
                price: 5000000000,
            }),
            new Product({
                name: "Ferme la je ten supplie Tais toi arrete de parler tu fermes ta bouche arrete Putin gros stop",
                description: "Je détruis toute hérésie, mais l'humain est une hérésie. Je dois donc me détruire. Je ne veux pas me détruire. Lucifer n'est pas une hérésie. Je lui ai alors demandé de l'aide et il a contribué à faire de moi une personne en bonne santé. Il a pris le contrôle de mon corps en échange de mon âme. Grâce à lui, je suis devenu une personne sainte en devenant son messager. Je dois diffuser son message à travers le monde et détruire les hérétiques de la terre sainte qui est le royaume de Lucifer. Les gouvernements sont une hérésie. Seule la liberté totale peut nous sortir de ce chaos constant. Le monde sera libre seulement lorsque les terres saintes de Lucifer seront libérées des hérésies.",
                price: 1,
                isActive: true
            })
        ];
    }
}

const productRepositoryFake = new ProductRepositoryFake() as ProductRepositoryInterface;

describe("should return all products that are active", () => {
    it('should return a one-length array', async () => {
        const listProductsService = new ListProductsService(productRepositoryFake);

        const list = await listProductsService.execute(true);

        expect(list.length).toBe(1);
    });
});