import PostgresClient from '@lib/database';
import { categoryQueries } from '@lib/sql/index';
import { Category as CategoryType } from '@ts-types/generated';

export default class Category extends PostgresClient {
  constructor() {
    super();
  }

  // ADMIN
  public categoriesSelectAllForAdmin = async () => {
    const limit = 999;
    const offset = 999;

    try {
      const { rows } = await this.query<CategoryType, number>(
        categoryQueries.getCategoriesSelectAllForAdmin(),
        [limit, offset]
      );
      return rows;
    } catch (error) {
      return {
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          error,
          message: error?.message,
          from: 'categoriesSelectForAdmin'
        }
      };
    }
  };
}
