import * as Sentry from '@sentry/nextjs';

interface LogsType {
  message: string | null;
  error: Error | string;
}

export function sentry({ message, error }: LogsType) {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error);
    return;
  }
  console.error(`<==: ${message} :==>`);
  if (message === 'graphQLClient.request') {
    console.error(JSON.stringify(error, undefined, 2));
  } else {
    console.error(error);
  }
  console.error(`<==:============:==>`);
  return;
}
