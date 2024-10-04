import { Product } from "src/product/domain/entity/product.entity";
import { CreateProductService } from "./create-product.service"
import { ProductRepositoryInterface } from "src/product/domain/port/persistance/product.repository.interface";

class ProductRepositoryFake {
    async save(product: Product): Promise<Product> {
        return product;
    }
}

const productRepositoryFake = new ProductRepositoryFake() as ProductRepositoryInterface;

describe("a product created without a stock has a stock set to 0", () => {
    it('should return a Product with a stock of 0', async () => {
        const createProductService = new CreateProductService(productRepositoryFake);

        const product = createProductService.execute({
            name: "annonce leboncoin",
            description: "Une femme qui a de l'autorisation comme moi la tu mintéresse réellement.Annonce réelle sincère et valable pour chaque weekend femmes de 18 a33a . Moi c Alban 43 ans ancien hardeur amateur avec 75 films à mon actif quand même. Dont un dont Je suis le plus fièrs avoir pendant 1h30 mettre occupé de 18 femmes je te rassure je ne le referais plus maintenant. mais Il me reste assez de jus dans le poireaux pour étanche une ou deux chaudes nympho chaque weekend le samedi ou dimanche légèrement salope et très open au niveau des cuisses sans tabous ni complexes. pratique toutes positions, Sexe avec ou sans capote .de mon côté jai le test HIV et mst négatif. suis à Magny en Vexin dans le 95 peux te recevoir et venir te chercher où",
            price: 5000000000
        });

        expect((await product).stock).toBe(0);
    });
})