import type { SelectChangeEvent } from '@mui/material';

import React from 'react';

import { Box, Select, MenuItem, InputLabel, Typography, FormControl, FormHelperText } from '@mui/material';

interface Option {
  value: string | number;
  label: string;
  icon?: React.ReactNode; // Ícone ou imagem opcional
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  value: string | number;
  onChange: (event: SelectChangeEvent<string | number>) => void;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'filled' | 'standard';
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  fullWidth = true,
  size = 'medium',
  variant = 'outlined',
  disabled = false,
  error = false,
  helperText = '',
}) => {
  return (
    <FormControl
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      disabled={disabled}
      error={error} // Pass error prop to FormControl
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
        renderValue={(selected) => {
          const selectedOption = options.find((option) => option.value === selected);
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {selectedOption?.icon && (
                <Box component="span" sx={{ mr: 1 }}>
                  {selectedOption.icon}
                </Box>
              )}
              <Typography variant="inherit">{selectedOption?.label}</Typography>
            </Box>
          );
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {option.icon && (
                <Box component="span" sx={{ mr: 1 }}>
                  {option.icon}
                </Box>
              )}
              <Typography variant="inherit">{option.label}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText>{helperText}</FormHelperText> // Include FormHelperText
      )}
    </FormControl>
  );
};
