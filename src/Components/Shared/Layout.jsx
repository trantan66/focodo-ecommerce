import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Navigation from './Navigation';

export default function Layout() {
    return (
        <div>
            <div className="fixed top-0 right-0 left-0 z-50">
                <Header />
                <Navigation />
            </div>
            <div className="mt-[136px] py-[10px]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
