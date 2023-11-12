import { useRouter } from 'next/router';
import { Layout } from '../components';
import Head from 'next/head';
import WalletProvider from '../providers/ConfigProvider';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  const renderComponent = () => (
    isHomePage
      ? <Component {...pageProps} />
      : <Layout><Component {...pageProps} /></Layout>
  );

  return (
    <WalletProvider>
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
        {renderComponent()}
    </WalletProvider>
  );
}

export default MyApp;
