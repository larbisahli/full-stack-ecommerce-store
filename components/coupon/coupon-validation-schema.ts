import * as yup from 'yup';
export const couponValidationSchema = yup.object().shape({
  code: yup.string().required('form:error-coupon-code-required'),
  discountValue: yup
    .number()
    .nullable(true)
    .typeError('form:error-amount-number')
    .required('form:error-amount-required'),
  maxUsage: yup
    .number()
    .nullable(true)
    .typeError('form:error-max-usage-number')
    .required('form:error-max-usage-required'),
  discountType: yup.object().required('form:error-coupon-type-required'),
  couponEndDate: yup.string().required('form:error-expire-date-required'),
  couponStartDate: yup.string().required('form:error-active-date-required')
});
