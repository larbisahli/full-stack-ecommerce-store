import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Checkbox from '@components/ui/checkbox';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';
import { STAFF_LOGIN } from '@graphql/login';
import { yupResolver } from '@hookform/resolvers/yup';
import { useErrorLogger } from '@hooks/useErrorLogger';
import { ROUTES } from '@utils/routes';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
  success: boolean;
};

const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('form:error-email-format')
    .required('form:error-email-required'),
  password: yup.string().required('form:error-password-required')
});

const defaultValues = {
  email: '',
  password: '',
  rememberMe: false
};

const LoginForm = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(loginFormSchema)
  });

  // const [staffLogin, { loading }] = useMutation(STAFF_LOGIN, {
  //   onCompleted: (data: { staffLogin: FormValues }) => {
  //     if (data?.staffLogin?.success) {
  //       router.push(ROUTES.DASHBOARD);
  //     }
  //   }
  // });

  const loading = true;

  useErrorLogger(error);

  async function onSubmit({ email, password, rememberMe }: FormValues) {
    const variables = {
      email,
      password,
      rememberMe
    };
    // staffLogin({ variables }).catch((err) => {
    //   setError(err);
    // });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t('form:input-label-email')}
          {...register('email')}
          type="email"
          variant="outline"
          className="mb-4"
          error={t(errors?.email?.message!)}
        />
        <PasswordInput
          label={t('form:input-label-password')}
          forgotPassHelpText={t('form:input-forgot-password-label')}
          {...register('password')}
          error={t(errors?.password?.message!)}
          variant="outline"
          className="mb-4"
          forgotPageLink="/forgot-password"
        />
        <Checkbox
          label={t('form:input-label-remember-me')}
          {...register('rememberMe')}
          className="mb-4"
        />
        <Button
          className="w-full"
          loading={loading && !error}
          disabled={loading && !error}
        >
          {t('form:button-label-login')}
        </Button>

        {error ? (
          <Alert
            message={t(error)}
            variant="error"
            closeable={true}
            className="mt-5"
            onClose={() => setError(null)}
          />
        ) : null}
      </form>
    </>
  );
};

export default LoginForm;
