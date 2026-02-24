import { Search as SearchIcon } from "@icon";
import { Box, alpha, useTheme } from "@common";
import { useState } from "@react";

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
    const theme = useTheme();
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    return (
        <Box sx={{
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            borderRadius: 3,
            px: 2,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            width: '300px'
        }}>
            <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            <input
                placeholder={placeholder}
                value={query}
                onChange={handleChange}
                style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    width: '100%',
                    fontFamily: 'inherit',
                    fontSize: '0.875rem'
                }}
            />
        </Box>
    );
};

export default SearchBar;