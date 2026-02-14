import { Card, CardContent, Typography } from '@mui/material';

interface Props {
  label: string;
  value: string | number;
}

const MetricCard = ({ label, value }: Props) => (
  <Card>
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h4" fontWeight={700}>
        {value}
      </Typography>
    </CardContent>
  </Card>
);

export default MetricCard;
