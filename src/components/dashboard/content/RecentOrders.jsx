import { Box, Paper, Typography } from "@common";

const RecentOrders = ({ orders = [] }) => {
    const defaultOrders = [
        { id: 1, orderNumber: '1234', status: 'Processing', items: 2, amount: 129.99, paymentStatus: 'Pending' },
        { id: 2, orderNumber: '1235', status: 'Shipped', items: 3, amount: 249.99, paymentStatus: 'Paid' },
        { id: 3, orderNumber: '1236', status: 'Delivered', items: 1, amount: 79.99, paymentStatus: 'Paid' },
        { id: 4, orderNumber: '1237', status: 'Processing', items: 4, amount: 399.99, paymentStatus: 'Pending' },
    ];

    const displayOrders = orders.length > 0 ? orders : defaultOrders;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Processing': return '#FF9800';
            case 'Shipped': return '#2196F3';
            case 'Delivered': return '#4CAF50';
            default: return '#9E9E9E';
        }
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }} elevation={1}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Recent Orders</Typography>
            {displayOrders.map((order) => (
                <Box key={order.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Order #{order.orderNumber}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {order.status} • {order.items} items
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>${order.amount.toFixed(2)}</Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: getStatusColor(order.status),
                                display: 'block'
                            }}
                        >
                            {order.paymentStatus}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Paper>
    );
};

export default RecentOrders;