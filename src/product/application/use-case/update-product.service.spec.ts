import { Product } from "../../domain/entity/product.entity";
import { UpdateProductService } from "./update-product.service";
import { ProductRepositoryInterface } from "src/product/domain/port/persistance/product.repository.interface";
import { CreateProductService } from "./create-product.service";

class ProductRepositoryFake {
    async save(product: Product): Promise<Product> {
        return product;
    }
    async findById(productId: string): Promise<Product> {
        return Promise.resolve(Object.assign(
            new Product({
                name: "annonce leboncoin",
                description: "Une femme qui a de l'autorisation comme moi la tu mintéresse réellement.Annonce réelle sincère et valable pour chaque weekend femmes de 18 a33a . Moi c Alban 43 ans ancien hardeur amateur avec 75 films à mon actif quand même. Dont un dont Je suis le plus fièrs avoir pendant 1h30 mettre occupé de 18 femmes je te rassure je ne le referais plus maintenant. mais Il me reste assez de jus dans le poireaux pour étanche une ou deux chaudes nympho chaque weekend le samedi ou dimanche légèrement salope et très open au niveau des cuisses sans tabous ni complexes. pratique toutes positions, Sexe avec ou sans capote .de mon côté jai le test HIV et mst négatif. suis à Magny en Vexin dans le 95 peux te recevoir et venir te chercher où",
                price: 5000000000,
            }), { id: productId }
        ) || null);
    }
}

const productRepositoryFake = new ProductRepositoryFake() as ProductRepositoryInterface;

describe('should have updated product information', () => {
    it('should have updated name', async () => {
        const updateProductService = new UpdateProductService(productRepositoryFake);
        const createProductService = new CreateProductService(productRepositoryFake);

        const product = await createProductService.execute({
            name: "annonce leboncoin",
            description: "Une femme qui a de l'autorisation comme moi la tu mintéresse réellement.Annonce réelle sincère et valable pour chaque weekend femmes de 18 a33a . Moi c Alban 43 ans ancien hardeur amateur avec 75 films à mon actif quand même. Dont un dont Je suis le plus fièrs avoir pendant 1h30 mettre occupé de 18 femmes je te rassure je ne le referais plus maintenant. mais Il me reste assez de jus dans le poireaux pour étanche une ou deux chaudes nympho chaque weekend le samedi ou dimanche légèrement salope et très open au niveau des cuisses sans tabous ni complexes. pratique toutes positions, Sexe avec ou sans capote .de mon côté jai le test HIV et mst négatif. suis à Magny en Vexin dans le 95 peux te recevoir et venir te chercher où",
            price: 5000000000,
        });
        const updatedProduct = await updateProductService.execute(product.id, {
            name: "annonce leboncoin",
            description: "hummmmeeeee je ces pas quoi ecrir eau lala ses compliquais hyn la tim",
            price: 5000000000,
        });

        expect(updatedProduct.description).not.toEqual(product.description);
    })
})