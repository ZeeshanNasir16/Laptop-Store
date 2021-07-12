import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

function FormInput({ name, label, required }) {
   const { control } = useFormContext();
   return (
      <Grid item xs={12} sm={6}>
         <Controller
            name={name}
            control={control}
            defaultValue=''
            rules={{ required: `${label} required` }}
            render={({ ...field }) => (
               <TextField
                  {...field}
                  label={label}
                  name={name}
                  type={name}
                  required
                  fullWidth
               />
            )}
         />
      </Grid>
   );
}

export default FormInput;
