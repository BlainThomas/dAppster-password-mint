import { Typography } from '@mui/material';

export function PageHeader({ headerText, brand }) {
  return (
    <header className='text-center'>
      <Typography variant="h1" style={{ color: brand.fontColor }}>
        {headerText}
      </Typography>
    </header>
  );
}
