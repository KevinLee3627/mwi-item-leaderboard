import { Theme, ThemeConfig } from 'react-select';

export const customColors: Partial<Theme['colors']> = {
  primary: 'hsl(var(--p))', //
  primary25: 'hsl(var(--nf))', // option hover
  neutral0: 'hsl(var(--b1))', // input bg
  neutral10: 'hsl(var(--p))', // multi option bg
  neutral20: 'hsl(var(--p))', // input border, divider, chevron
  neutral30: 'hsl(var(--p))', // input border hover
  neutral80: 'hsl(var(--nc))', // select text
};

export const customTheme: ThemeConfig = (theme: Theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    ...customColors,
  },
});
