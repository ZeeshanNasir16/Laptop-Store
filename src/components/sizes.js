// eslint-disable-next-line import/no-anonymous-default-export
export default {
   up() {},
   down(size) {
      const sizes = {
         xs: '576px',
         sm: '768px',
         md: '992px',
         lg: '1200px',
         xl: '1400px',
      };

      return `@media(max-width: ${sizes[size]})`;
   },
};
