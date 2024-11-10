import type { InputBaseComponentProps } from '@mui/material/InputBase';

import React from 'react';
import { NumericFormat } from 'react-number-format';

interface PercentageFormatCustomProps extends InputBaseComponentProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}

const PercentageFormatCustom = (props: PercentageFormatCustomProps) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue || '',
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }}
      suffix="%"
      isNumericString
      decimalSeparator=","
      thousandSeparator="."
      allowNegative={false}
      decimalScale={2}
      fixedDecimalScale={false}
    />
  );
};

export default PercentageFormatCustom;
