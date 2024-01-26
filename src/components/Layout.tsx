import Navbar from './navbar/Navbar.tsx';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="content">
        {children}
      </div>
    </>
  );
};

export default Layout;
