import PropTypes from 'prop-types';
import Head from 'next/head';
import { NAV_LINKS } from '../../constants/navLinks';
import Header from '../../shared/components/Header';
import Footer from '../../shared/components/Footer';
import Mailing from '../../shared/components/Mailing';
import styles from './Layout.styles.js';

const Layout = ({ children, title, description, canonicalPathname }) => {
  return (
    <div className="layout">
      <Head>
        <title>{title ? title + ' - ' : ''}Blog - Lauren Ashpole</title>
      </Head>

      <Header links={NAV_LINKS} enableAnalytics={true} />
      <main className="layout__main">{children}</main>

      <Footer>
        <Mailing location="footer" isInline={true} />
      </Footer>

      <style jsx global>
        {styles}
      </style>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  description: PropTypes.string,
  canonicalPathname: PropTypes.string
};

export default Layout;