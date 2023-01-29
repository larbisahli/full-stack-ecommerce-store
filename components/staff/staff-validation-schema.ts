import * as yup from 'yup';

export const staffValidationSchema = yup.object().shape({
  firstName: yup.string().required('form:error-last-name-required'),
  lastName: yup.string().required('form:error-first-name-required'),
  email: yup
    .string()
    .email('form:error-email-format')
    .required('form:error-email-required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'form:error-match-passwords')
    .required('form:error-confirm-password'),
  password: yup.string().required('form:error-password-required')
});
