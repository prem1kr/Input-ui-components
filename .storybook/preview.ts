import '../src/index.css'; 

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
  },
  options: {
    storySort: {
      order: ['InputField', 'DataTable'],
    },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
      showName: true,
    },
  },
};

// export const decorators = [
//   (Story, context) => {
//     const theme = context.globals.theme;
//     return (
//       <div className={theme === 'dark' ? 'dark' : ''} style={{ padding: '1rem', backgroundColor: theme === 'dark' ? '#1a202c' : '#fff' }}>
//         <Story />
//       </div>
//     );
//   },
// ];
