import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton() {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    console.log(newAlignment)
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="Zameendar">Zameendar</ToggleButton>
      <ToggleButton value="Khareedar">Khareedar</ToggleButton>
      <ToggleButton value="Bank">Bank</ToggleButton>
      <ToggleButton value="Androon">Androon</ToggleButton>
    </ToggleButtonGroup>
  );
}
