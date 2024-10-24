import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';

export default function Layout() {
    return (
        <div>
            <Header />
            <Navigation />
            <Outlet />
            <Footer />
        </div>
    );
}
