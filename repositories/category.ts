import PostgresClient from '@lib/database';
import { categoryQueries } from '@lib/sql/index';
import { Category as CategoryType } from '@ts-types/generated';

export default class Category extends PostgresClient {
  constructor() {
    super();
  }

  // ADMIN
  public category = async (
    {id}: CategoryType,
  ) => {
    try {
      const { rows } = await this.query<CategoryType, (string)>(
        categoryQueries.getCategory(),
        [id]
      );

      return rows[0];
    } catch (error) {
      return {
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'category',
        }
      }
    }
  };

  // ADMIN
  public categories = async (
    {page}: CategoryType,
  ) => {
    const offset = page === 0 ? 0 : (page - 1) * this.limit;

    try {
      const { rows: categories } = await this.query<CategoryType, (number)>(
        categoryQueries.getCategories(),
        [this.limit, offset]
      );

      const count = await this.categoriesCount()

      return {categories, count}
    } catch (error) {
      return {
        error:{
            type: this.ErrorNames.SERVER_ERROR,
            message: error?.message,
            from: 'categories',
        }
      }
    }
  };

  // ADMIN
  public categoriesCount = async () => {
    try {
      const { rows } = await this.query<{count: number}, any>(
        categoryQueries.getCategoriesCount(),
        []
      );
      const {count} = rows[0]
      return count ? Number(count): 0
    } catch (error) {
      return {
          type: this.ErrorNames.SERVER_ERROR,
          error,
          message: error?.message,
          from: 'categoriesCount',
      }
    }
  };

  // ADMIN
  public categoriesSelectForAdmin = async (
    parent: any,
    { id }: CategoryType,
  ) => {
    const limit = 999;
    const offset = 999;

    try {
      if (id) {
        const { rows } = await this.query<CategoryType, (string|number)>(
          categoryQueries.getCategoriesParentsSelectForAdminWithId(),
          [id, limit, offset]
        );
        return rows;
      } else {
        const { rows } = await this.query<CategoryType, (string|number)>(
          categoryQueries.getCategoriesParentsSelectForAdmin(),
          [limit, offset]
        );
        return rows;
      }
    } catch (error) {
      return {
        error:{
          type: this.ErrorNames.SERVER_ERROR,
          error,
          message: error?.message,
          from: 'categoriesSelectForAdmin',
        }
      }
    }
  };

  // ADMIN
  public categoriesSelectAllForAdmin = async () => {
    const limit = 999
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
          from: 'categoriesSelectForAdmin',
        }
      }
    }
  };

  // ADMIN
  public createCategory = async (
    body: CategoryType,
  ) => {

    try {
      const {parentId, name, description} = body
      const { rows } = await this.query<CategoryType, (string)>(
        categoryQueries.insertCategory(),
        [
          parentId,
          name,
          description
        ]
      );

      return rows[0];
    } catch (error) {
      return {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'updateCategory',
      }
    }
  };

  // ADMIN
  public updateCategory = async (
    body: CategoryType,
  ) => {
    try {
      const {id, parentId, name, description} = body
      const { rows } = await this.query<CategoryType, (string)>(
        categoryQueries.updateCategory(),
        [
          id,
          parentId,
          name,
          description,
        ]
      );

      return rows[0];
    } catch (error) {
      return {
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message,
          from: 'updateCategory',
        }
      }
    }
  };
}
