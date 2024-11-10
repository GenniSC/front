import { useState, useEffect } from 'react';

import { Grid, MenuItem, TextField } from '@mui/material';

import { getListaEstados } from 'src/utils/estados';

import { getCidadesUF } from 'src/services/ibge.service';

interface EstadoCidadeSelectorProps {
  estado: string;
  setEstado: React.Dispatch<React.SetStateAction<string>>;
  cidade: string;
  setCidade: React.Dispatch<React.SetStateAction<string>>;
  size?: 'small' | 'medium';
  error?: boolean;
  helperText?: string;
  disabled?: boolean; // Nova prop para controle de desativação
}

export const EstadoCidadeSelector: React.FC<EstadoCidadeSelectorProps> = ({
  estado,
  cidade,
  setEstado,
  setCidade,
  size = 'medium',
  error = false,
  helperText = '',
  disabled = false, // Valor padrão
}) => {
  const [cidades, setCidades] = useState<string[]>([]);
  const [estados] = useState<string[]>(getListaEstados());
  const [estadoSearch, setEstadoSearch] = useState('');
  const [cidadeSearch, setCidadeSearch] = useState('');

  useEffect(() => {
    if (estado) {
      fetchCidades(estado);
    }
  }, [estado]);

  const fetchCidades = async (estado: string) => {
    const response = await getCidadesUF(estado);
    setCidades(response.map((cidade: any) => cidade));
  };

  const handleEstadoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedEstado = e.target.value;
    setEstado(selectedEstado);
    setCidade(''); // Reset cidade quando o estado muda
    fetchCidades(selectedEstado);
  };

  const handleCidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCidade(e.target.value);
  };

  // Filtrando os estados e cidades com base na pesquisa
  const filteredEstados = estados.filter((estado) =>
    estado.toLowerCase().includes(estadoSearch.toLowerCase())
  );
  const filteredCidades = cidades.filter((cidade) =>
    cidade.toLowerCase().includes(cidadeSearch.toLowerCase())
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          select
          variant="outlined"
          label="Estado"
          value={estado}
          onChange={handleEstadoChange}
          onInput={(e) => setEstadoSearch((e.target as HTMLInputElement).value)}
          size={size}
          error={error}
          helperText={helperText}
          disabled={disabled} // Aplicando a prop disabled
        >
          {filteredEstados.map((estado) => (
            <MenuItem key={estado} value={estado}>
              {estado}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          select
          variant="outlined"
          label="Cidade"
          value={cidade}
          onChange={handleCidadeChange}
          disabled={disabled || !estado} // Desativado se estado não estiver selecionado ou se disabled for true
          onInput={(e) => setCidadeSearch((e.target as HTMLInputElement).value)}
          size={size}
          error={error}
          helperText={helperText}
        >
          {filteredCidades.map((cidade) => (
            <MenuItem key={cidade} value={cidade}>
              {cidade}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};
