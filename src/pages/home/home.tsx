import { Helmet } from "react-helmet-async";
import { CONFIG } from "../../config-global";

import HomePage from "../../view/home/view/homePage-view";

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`Home - ${CONFIG.appName}`}</title>
      </Helmet>

      <HomePage />
    </>
  );
}
