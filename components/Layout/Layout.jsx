import { Navbar } from './Navbar'
import { useWalletConfig } from '../../providers/ConfigProvider';

export function Layout({ children }) {
  const { brand } = useWalletConfig();

  return (
    <div style={{ backgroundColor: '#000000', color: brand.fontColor }} className="min-h-screen">
      <main className="max-w-screen-2xl mx-auto">
        <div className='flex flex-row w-full overflow-hidden'>
          <Navbar brand={brand} />
          <div style={{ backgroundColor: brand.backgroundColor}} className='w-full pt-24 min-h-screen'>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

