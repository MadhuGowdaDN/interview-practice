import {
    Card,
    CardContent,
    TextField,
    Typography
} from "@common";
import { useEffect, useRef, useState } from "@react";

const ShortAnswerQuestion = ({ question, onAnswer, selectedAnswer }) => {
    const [value, setValue] = useState(selectedAnswer || '');
    useEffect(() => {
        setValue(selectedAnswer || '');
    }, [selectedAnswer]);
    let timeoutCall = useRef(null);
    const handleChange = (event) => {
        console.log("coming here", timeoutCall, event.target.value)
        event.preventDefault();
        setValue(event.target.value);
        if (timeoutCall.current) { clearTimeout(timeoutCall.current); }
        timeoutCall.current = setTimeout(() => {
            console.log("event.target.value ", event.target.value, onAnswer)
            onAnswer(question.id, event.target.value);
            timeoutCall.current = null;
        }, [1000]);
    };
    console.log("selectedAnswer ", selectedAnswer)
    return (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <CardContent>
                <Typography variant="body1" sx={{ mb: 3, fontWeight: 500 }}>
                    {question.question}
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Type your answer here..."
                    value={value}
                    onChange={handleChange}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        }
                    }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Short answer format. Be concise and specific.
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ShortAnswerQuestion;