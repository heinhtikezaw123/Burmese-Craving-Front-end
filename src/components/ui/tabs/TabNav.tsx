// TabNav.tsx
import React from 'react';

interface TabNavProps {
    tabs: { id: string; label: string }[];
    activeTab: string;
    onTabClick: (tabId: string) => void;
}

const TabNav: React.FC<TabNavProps> = ({ tabs, activeTab, onTabClick }) => {
    return (
        <div className="flex space-x-4 border-b">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabClick(tab.id)}
                    className={`pb-2 min-w-[80px] text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-primary'
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TabNav;
