import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';
import { NotFoundView } from '../view/error/no-found-view';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`404 page not found! | Error - ${CONFIG.appName}`}</title>
      </Helmet>

      <NotFoundView />
    </>
  );
}