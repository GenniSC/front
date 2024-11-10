import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export const SearchForm: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    alert(`Buscando por: ${query}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        marginTop: 2,
      }}
    >
      <TextField
        variant="outlined"
        label="Buscar linha ou parada"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Buscar
      </Button>
    </Box>
  );
};
