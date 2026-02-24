import { Container, Grid } from '@common';
import { useState } from "@react";
import DashboardAppBar from './appBar/DashboardAppBar';
import RecentActivity from './content/RecentActivity';
import RecentOrders from './content/RecentOrders';
import RecentUsers from './content/RecentUsers';
import RevenueChart from './content/RevenueChart';
import StatsCards from './content/StatsCards';
import WelcomeSection from './content/WelcomeSection';
import DashboardLayout from './layout/DashboardLayout';
import DashboardSidebar from './sidebar/DashboardSidebar';

const Dashboard = () => {
    const [themeMode, setThemeMode] = useState('light');

    const handleThemeToggle = () => {
        setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
        // Add your theme switching logic here
    };

    const user = {
        name: 'John',
        fullName: 'John Doe',
        email: 'john@example.com',
        initials: 'JD'
    };

    const stats = [
        { title: 'Total Revenue', value: '$54,239', change: '+12.5%', icon: 'trending-up', color: '#4CAF50' },
        { title: 'Total Users', value: '8,549', change: '+23.1%', icon: 'users', color: '#2196F3' },
        { title: 'Total Orders', value: '3,129', change: '+5.4%', icon: 'shopping-cart', color: '#FF9800' },
        { title: 'Conversion Rate', value: '3.24%', change: '-2.1%', icon: 'assessment', color: '#f44336' },
    ];

    const handleSearch = (query) => {
        console.log('Searching for:', query);
        // Add your search logic here
    };

    return (
        <DashboardLayout
            appBar={(props) => (
                <DashboardAppBar
                    {...props}
                    onThemeToggle={handleThemeToggle}
                    user={user}
                    onSearch={handleSearch}
                />
            )}
            sidebar={(props) => <DashboardSidebar {...props} />}
        >
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <WelcomeSection user={user} stats={{ newUsers: 12, newOrders: 24 }} />

                <StatsCards stats={stats} />

                <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
                    <Grid item xs={12} md={8}>
                        <RevenueChart />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <RecentActivity />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <RecentUsers />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <RecentOrders />
                    </Grid>
                </Grid>
            </Container>
        </DashboardLayout>
    );
};

export default Dashboard;