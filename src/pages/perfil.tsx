import { Helmet } from "react-helmet-async";

import { CONFIG } from "../config-global";

import PerfilView from "../view/perfil/perfil-view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`Perfil - ${CONFIG.appName}`}</title>
      </Helmet>

      <PerfilView />
    </>
  );
}
