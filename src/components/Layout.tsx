import Navbar from './navbar/Navbar.tsx';

const Layout = ({ children, hideNavbar }) => {
  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="content">
        {children}
      </div>
    </>
  );
};

export default Layout;
