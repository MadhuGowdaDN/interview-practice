import {
    Card,
    CardContent,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
} from "@common";
import { useState } from "@react";

const MultipleChoiceQuestion = ({ question, onAnswer, selectedAnswer }) => {
    const [value, setValue] = useState(selectedAnswer || '');

    const handleChange = (event) => {
        setValue(event.target.value);
        onAnswer(question.id, event.target.value);
    };
    return (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <CardContent>
                <Typography variant="body1" sx={{ mb: 3, fontWeight: 500 }}>
                    {question.question}
                </Typography>
                <RadioGroup value={value} onChange={handleChange}>
                    {question?.options?.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            value={option}
                            control={<Radio />}
                            label={option}
                            sx={{
                                mb: 1,
                                p: 1,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: value === option ? 'primary.main' : 'divider',
                                bgcolor: value === option ? 'rgba(102, 126, 234, 0.08)' : 'transparent',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    bgcolor: 'rgba(0,0,0,0.02)',
                                    borderColor: 'primary.light'
                                }
                            }}
                        />
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    );
};

export default MultipleChoiceQuestion;