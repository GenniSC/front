import { Helmet } from "react-helmet-async";

import { CONFIG } from "../config-global";

import { RegisterView } from "../view/cadastro/cadastro-view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Cadastro - ${CONFIG.appName}`}</title>
      </Helmet>

      <RegisterView />
    </>
  );
}
