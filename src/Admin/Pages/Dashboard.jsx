import React from 'react';
// import DashboardStatsGrid from '../Components/Dashboard/DashboardStatsGrid';
// import TransactionChart from '../Components/Dashboard/TransactionChart';
// import BuyProfileChart from '../Components/Dashboard/BuyProfileChart';
// import RecentOrder from '../Components/Dashboard/RecentOrder';
// import PopularProduct from '../Components/Dashboard/PopularProduct';
import AnnualRevenue from '../Components/Dashboard/AnnualRevenue';
import TotalRevenue from '../Components/Dashboard/TotalRevenue';
import DailyRevenue from '../Components/Dashboard/DailyRevenue';
import WeeklyRevenue from '../Components/Dashboard/WeeklyRevenue';
import TotalProduct from '../Components/Dashboard/TotalProduct';
import StopSellingProduct from '../Components/Dashboard/StopSellingProduct';
import SellingProduct from '../Components/Dashboard/SellingProduct';
import ProductTopSeller from '../Components/Dashboard/ProductTopSeller';
import ProductTopRating from '../Components/Dashboard/ProductTopRating';

function Dashboard() {
    return (
        <div className="flex gap-4 px-4 pb-4 flex-col">
            <div className="flex flex-row gap-4 w-full">
                <AnnualRevenue />
                <div className="flex flex-col gap-4 w-5/12">
                    <div className="flex flex-row gap-4">
                        <TotalRevenue />
                        <DailyRevenue />
                    </div>
                    <WeeklyRevenue />
                </div>
            </div>
            <div className="flex flex-row gap-4 w-full">
                <div className="flex flex-col gap-4 w-3/12">
                    <TotalProduct />
                    <SellingProduct />
                    <StopSellingProduct />
                </div>
                <ProductTopSeller />
                <ProductTopRating />
            </div>
        </div>
    );
}

export default Dashboard;
