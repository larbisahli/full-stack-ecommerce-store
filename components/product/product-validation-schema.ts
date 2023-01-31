import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  // thumbnail
  // gallery
  name: yup.string().required('form:error-product-name-required'),
  shortDescription: yup
    .string()
    .test(
      'len',
      'Description Must be less than 160 characters',
      (val) => val.length < 160
    )
    .required('form:error-short-description-required'),
  description: yup.string().required('form:error-product-description-required'),
  // salePrice: yup
  //   .number()
  //   .typeError('form:error-amount-must-number')
  //   .positive('form:error-price-must-positive')
  //   .required('form:error-sale-price-required'),
  // comparePrice: yup
  //   .number()
  //   .typeError('form:error-amount-must-number')
  //   .transform((value) => (isNaN(value) ? null : value)),
  // quantity: yup
  //   .number()
  //   .typeError('form:error-amount-must-number')
  //   .required('form:error-quantity-required'),
  categories: yup.array().min(1, 'Category Required')
});
