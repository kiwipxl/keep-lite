export function onGqlError(err) {
  let errors = [];

  if (err.graphQLErrors && err.graphQLErrors.length > 0) {
    errors.push(...err.graphQLErrors);
  }

  if (
    err.networkError &&
    err.networkError.result &&
    err.networkError.result.errors.length > 0
  ) {
    errors.push(...err.networkError.result.errors);
  }

  console.error("gql error", err.message, errors);
}

export function getGqlErrors(err) {
  let errors = [];

  if (err.graphQLErrors && err.graphQLErrors.length > 0) {
    errors.push(...err.graphQLErrors);
  }

  if (
    err.networkError &&
    err.networkError.result &&
    err.networkError.result.errors.length > 0
  ) {
    errors.push(...err.networkError.result.errors);
  }

  return errors;
}
