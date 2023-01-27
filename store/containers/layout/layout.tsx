import { CartDrawer, Drawer } from '../drawer/drawer';
import Footer from './footer';
import Header from './header';

const Layout = (props) => (
  <main
    className="relative min-h-screen h-screen flex-grow overflow-y-auto"
    style={{
      minHeight: '-webkit-fill-available',
      WebkitOverflowScrolling: 'touch',
      ...props.style
    }}
  >
    <Drawer />
    <Header categories={props.categories} />
    <div className="flex flex-col w-full h-full flex-grow">
      <div className="pt-90px flex-auto">{props.children}</div>
      <Footer />
    </div>
    <CartDrawer />
  </main>
);
export default Layout;
