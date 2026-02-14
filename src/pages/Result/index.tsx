import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const ResultPage = () => {
  const { id } = useParams();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    api.get('/reports').then(({ data }) => {
      const matched = data.find((item: any) => item.exam && item.exam._id === id) || data[0];
      setResult(matched);
    });
  }, [id]);

  if (!result) return <Typography>Loading result...</Typography>;

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Typography variant="h4" fontWeight={800}>AI Improvement Insights</Typography>
          <Typography>{result.personalizedFeedback}</Typography>
          <Stack direction="row" spacing={1} mt={2}>{result.weakAreas?.map((w: string) => <Chip key={w} label={`Weak: ${w}`} color="warning" />)}</Stack>
        </CardContent>
      </Card>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography>Topics to Revise</Typography></AccordionSummary>
        <AccordionDetails><Stack>{result.topicsToRevise?.map((t: string) => <Typography key={t}>• {t}</Typography>)}</Stack></AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography>Suggested Practice Plan</Typography></AccordionSummary>
        <AccordionDetails><Stack>{result.practicePlan?.map((p: string) => <Typography key={p}>• {p}</Typography>)}</Stack></AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default ResultPage;
