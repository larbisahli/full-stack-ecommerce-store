import databaseConn from '@lib/conn';
import PostgresClient from '@lib/database';
import { productQueries } from '@lib/sql';
import { isEmpty } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import slugify from 'slugify';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;
    try {
      switch (method) {
        case this.POST: {
          // **** TRANSACTION ****
          try {
            await databaseConn.connect();
            const staff = await this.authorization(databaseConn, req, res);
            const { id, additions, deletions } = body;

            await databaseConn.query('BEGIN');

            const productId = id;

            const {
              productMain,
              thumbnail: A_thumbnail,
              gallery: A_gallery = [],
              categories: A_categories = [],
              variations: A_variations = [],
              variationOptions: A_variation_options = []
            } = additions;

            const {
              thumbnail: D_thumbnail,
              gallery: D_gallery,
              categories: D_categories = [],
              variations: D_variations = [],
              variationOptions: D_variation_options = []
            } = deletions;

            // ---------------- Products Main ----------------
            if (!isEmpty(productMain)) {
              const slug = slugify(
                productMain.name?.replace(/[^A-Za-z0-9\s!?]/g, '').trim()
              )?.toLowerCase();

              await databaseConn.query(productQueries.updateProduct(), [
                productId,
                slug,
                productMain.name,
                productMain.sku,
                productMain.salePrice,
                productMain.comparePrice,
                productMain.buyingPrice,
                productMain.quantity,
                productMain.shortDescription,
                productMain.description,
                productMain.type.id,
                productMain.published,
                productMain.disableOutOfStock,
                productMain.note,
                staff?.id
              ]);
            } else {
              await databaseConn.query(productQueries.updateProductUpdateBy(), [
                productId,
                staff?.id
              ]);
            }

            // ------ Additions Thumbnail ------
            if (!isEmpty(A_thumbnail)) {
              await databaseConn.query(productQueries.insertImage(), [
                productId,
                A_thumbnail?.image,
                true
              ]);
            }

            // ------ Deletions Thumbnail ------
            if (!isEmpty(D_thumbnail)) {
              await databaseConn.query(productQueries.deleteImage(), [
                D_thumbnail?.id
              ]);
            }

            // ------ Additions Gallery ------
            for await (const { image } of A_gallery) {
              await databaseConn.query(productQueries.insertImage(), [
                productId,
                image,
                false
              ]);
            }

            // ------ Deletions Gallery ------
            for await (const { id } of D_gallery) {
              await databaseConn.query(productQueries.deleteImage(), [id]);
            }

            // ------ Additions Categories ------
            for await (const { id: categoryId } of A_categories) {
              await databaseConn.query(productQueries.insertProductCategory(), [
                productId,
                categoryId
              ]);
            }

            // ------ Deletions Categories ------
            for await (const { id: categoryId } of D_categories) {
              await databaseConn.query(productQueries.deleteProductCategory(), [
                productId,
                categoryId
              ]);
            }

            // ---------------- Additions variations & variation_options ----------------
            for await (const { attribute, selectedValues } of A_variations) {
              let productAttributeId;

              const { rows: ProductAttribute } = await databaseConn.query(
                productQueries.getProductAttribute(),
                [productId, attribute?.id]
              );

              if (ProductAttribute[0]?.id) {
                productAttributeId = ProductAttribute[0]?.id;
              } else {
                const { rows } = await databaseConn.query(
                  productQueries.insertProductAttribute(),
                  [productId, attribute?.id]
                );
                productAttributeId = rows[0]?.id;
              }

              for await (const { id: attributeValueId } of selectedValues) {
                await databaseConn.query(
                  productQueries.insertProductAttributeValue(),
                  [productAttributeId, attributeValueId]
                );
              }
            }

            // ---------------- variation_options ----------------
            for await (const opt_values of A_variation_options) {
              const { rows: galleryRows } = await databaseConn.query(
                productQueries.getImage(),
                [opt_values?.image]
              );

              const image_id = galleryRows[0]?.id;

              if (opt_values?.id) {
                // Update variant_options
                await databaseConn.query(productQueries.updateVariantOption(), [
                  opt_values?.id,
                  opt_values?.title,
                  image_id,
                  opt_values?.salePrice,
                  opt_values?.comparePrice,
                  opt_values?.buyingPrice,
                  opt_values?.quantity,
                  opt_values?.sku,
                  opt_values?.active
                ]);
              } else {
                // insert variant_options
                const { rows: VariantOptionsRows } = await databaseConn.query(
                  productQueries.insertVariantOption(),
                  [
                    opt_values?.title,
                    image_id,
                    productId,
                    opt_values?.salePrice,
                    opt_values?.comparePrice,
                    opt_values?.buyingPrice,
                    opt_values?.quantity,
                    opt_values?.sku,
                    opt_values?.active
                  ]
                );

                const variantOptionId = VariantOptionsRows[0]?.id;

                const { rows: variantRows } = await databaseConn.query(
                  productQueries.insertVariant(),
                  [opt_values?.title, productId, variantOptionId]
                );

                const variantId = variantRows[0]?.id;

                for await (const attributeValueId of opt_values.options) {
                  const { rows: AttributeValueRows } = await databaseConn.query(
                    productQueries.getAttributeValue(),
                    [attributeValueId]
                  );

                  const attributeId = AttributeValueRows[0]?.attributeId;

                  const { rows: ProductAttributeRows } =
                    await databaseConn.query(
                      productQueries.getProductAttribute(),
                      [productId, attributeId]
                    );

                  const productAttributeId = ProductAttributeRows[0]?.id;

                  const { rows: ProductAttributeValueRows } =
                    await databaseConn.query(
                      productQueries.getProductAttributeValue(),
                      [productAttributeId, attributeValueId]
                    );

                  const product_attributeValueId =
                    ProductAttributeValueRows[0]?.id;

                  await databaseConn.query(
                    productQueries.insertVariantValue(),
                    [variantId, product_attributeValueId]
                  );
                }
              }
            }

            // ---------------- Deletions variations & variation_options ----------------

            // Delete variation_options
            for await (const { id: variantOptionId } of D_variation_options) {
              const { rows } = await databaseConn.query(
                productQueries.getVariant(),
                [variantOptionId]
              );

              const variantId = rows[0]?.id;

              await databaseConn.query(productQueries.deleteVariantValue(), [
                variantId
              ]);

              await databaseConn.query(productQueries.deleteVariantOption(), [
                id
              ]);

              await databaseConn.query(productQueries.deleteVariant(), [
                variantId
              ]);
            }

            // Delete variations
            for await (const { attribute, attributeValues } of D_variations) {
              const { rows } = await databaseConn.query(
                productQueries.getProductAttribute(),
                [productId, attribute?.id]
              );

              const productAttributeId = rows[0]?.id;

              if (isEmpty(attributeValues)) {
                await databaseConn.query(
                  productQueries.deleteProductAttributeValueAll(),
                  [productAttributeId]
                );
                await databaseConn.query(
                  productQueries.deleteProductAttribute(),
                  [productAttributeId]
                );
              } else {
                for await (const { id: attributeValueId } of attributeValues) {
                  await databaseConn.query(
                    productQueries.deleteProductAttributeValue(),
                    [productAttributeId, attributeValueId]
                  );
                }
              }
            }

            await databaseConn.query('COMMIT');
            return res.status(200).json({ product: { id } });
          } catch (error) {
            await databaseConn.query('ROLLBACK');
            console.log({ error });
            if (
              error?.code === '23505' &&
              error?.constraint === 'products_slug_key'
            ) {
              return res.status(404).json({
                type: 'PRODUCT_NAME_ALREADY_EXIST'
              });
            } else {
              return res.status(500).json({
                error: {
                  type: 'SERVER_ERROR',
                  message: error?.message
                }
              });
            }
          } finally {
            databaseConn.clean();
          }
        }
        default:
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`There was some error`);
      }
    } catch (error) {
      return res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'updateProduct'
        }
      });
    }
  };
}

export default new Handler().execute;
