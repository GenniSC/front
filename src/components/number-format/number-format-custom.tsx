import type { InputBaseComponentProps } from '@mui/material/InputBase';

import React from 'react';
import { NumericFormat } from 'react-number-format';

interface NumberFormatCustomProps extends InputBaseComponentProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currency: 'BRL' | 'USD' | 'EUR'; // Inclui EUR como uma opção de moeda
  inputRef?: React.Ref<HTMLInputElement>;
}

const NumberFormatCustom = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, currency, ...other } = props;

  const formatConfig = {
    BRL: {
      thousandSeparator: '.',
      decimalSeparator: ',',
      prefix: 'R$ ',
    },
    USD: {
      thousandSeparator: ',',
      decimalSeparator: '.',
      prefix: '$ ',
    },
    EUR: {
      thousandSeparator: '.',
      decimalSeparator: ',',
      prefix: '€ ',
    },
  };

  // Acessa a configuração baseada no valor de currency
  const config = formatConfig[currency] || formatConfig.BRL;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }}
      thousandSeparator={config.thousandSeparator}
      decimalSeparator={config.decimalSeparator}
      isNumericString
      prefix={config.prefix}
    />
  );
};

export default NumberFormatCustom;
