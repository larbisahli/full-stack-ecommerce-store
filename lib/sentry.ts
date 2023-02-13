interface LogsType {
  message: string | null;
  error: Error | string;
}

export function sentry({ message, error }: LogsType) {
  console.error(`<==: ${message} :==>`);
  if (message === 'graphQLClient.request') {
    console.error(JSON.stringify(error, undefined, 2));
  } else {
    console.error(error);
  }
  console.error(`<==:============:==>`);
  return;
}
