import { Divider, Drawer } from "@common";
import SidebarFooter from './SidebarFooter';
import SidebarHeader from './SidebarHeader';
import SidebarNavItems from './SidebarNavItems';

const drawerWidth = 280;

const DashboardSidebar = ({ open, onDrawerClose }) => {
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: 'white',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <SidebarHeader onDrawerClose={onDrawerClose} />
            <Divider />
            <SidebarNavItems onItemClick={onDrawerClose} />
            <SidebarFooter />
        </Drawer>
    );
};

export default DashboardSidebar;