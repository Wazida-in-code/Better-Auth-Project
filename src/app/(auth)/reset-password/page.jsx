import React, { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPassword = () => {
  return (
    <div>
      <Suspense fallback={"Loading"}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
};

export default ResetPassword;
