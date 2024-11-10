import { Helmet } from "react-helmet-async";

import { CONFIG } from "../config-global";

import { LoginView } from "../view/login/login-view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Login - ${CONFIG.appName}`}</title>
      </Helmet>

      <LoginView />
    </>
  );
}
