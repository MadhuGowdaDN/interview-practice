import { Card, CardContent, Typography } from '@mui/material';

export const MetricCard = ({ label, value }: { label: string; value: string | number }) => (
  <Card>
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h4" fontWeight={700} mt={1}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);
