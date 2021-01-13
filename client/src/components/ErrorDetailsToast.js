import React from "react";
import ViewDetailsToast from "./ViewDetailsToast";
import { getGqlErrors } from "../sync/util";

const ErrorDetailsToast = ({ message, error, duration, onDismissed }) => {
  return (
    <ViewDetailsToast
      message={message}
      duration={duration}
      onDismissed={onDismissed}
      renderDetails={() => {
        return (
          <div>
            <p>{error.message}</p>

            {(error.graphQLErrors || error.networkError) &&
              getGqlErrors(error).map((gqlErr) => <p>{gqlErr.message}</p>)}
          </div>
        );
      }}
    ></ViewDetailsToast>
  );
};

export default ErrorDetailsToast;
