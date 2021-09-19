import '../styles/globals.css'

import React from 'react';
// The authentication state exposed by UserProvider can be accessed in any
// component using the useUser() hook.
import { UserProvider } from '@auth0/nextjs-auth0';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}
