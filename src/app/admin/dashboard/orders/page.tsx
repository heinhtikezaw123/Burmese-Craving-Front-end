'use client';

import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setActiveTab } from '@/store/slices/tabSlice';
import TabNav from '@/components/ui/tabs/TabNav';

const AllOrders = lazy(() => import('./all/page'));
// const TodayOrders = lazy(() => import('./todayOrders/page'));
const PendingOrders = lazy(() => import('./pending/page'));
const CompletedOrders = lazy(() => import('./completed/page'));
const CancelledOrders = lazy(() => import('./cancelled/page'));

const ORDERS_PAGE_KEY = 'ordersPage';

const OrdersPage = () => {
    const dispatch = useDispatch();
    const activeTab = useSelector((state: RootState) => state.tab[ORDERS_PAGE_KEY] || 'All');



    const orderTabs = [
        { id: 'All', label: 'All' },
        // { id: 'Today', label: 'Today' },
        { id: 'Pending', label: 'Pending' },
        { id: 'Completed', label: 'Completed' },
        { id: 'Cancelled', label: 'Cancelled' },
    ];

    const handleTabClick = (tabId: string) => {
        dispatch(setActiveTab({ key: ORDERS_PAGE_KEY, tab: tabId }));
    };

    return (
        <div>
            <TabNav tabs={orderTabs} activeTab={activeTab} onTabClick={handleTabClick} />
            <div className="mt-4">
                <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
                    {activeTab === 'All' && <AllOrders />}
                    {/* {activeTab === 'Today' && <TodayOrders />} */}
                    {activeTab === 'Pending' && <PendingOrders />}
                    {activeTab === 'Completed' && <CompletedOrders />}
                    {activeTab === 'Cancelled' && <CancelledOrders />}
                </Suspense>
            </div>
        </div>
    );
};

export default OrdersPage;
