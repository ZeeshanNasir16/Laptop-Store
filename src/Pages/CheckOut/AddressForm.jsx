import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
   Typography,
   InputLabel,
   Select,
   MenuItem,
   Grid,
   Button,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './CustomTextField';
import { commerce } from '../../lib/commerce';

const styles = makeStyles((theme) => ({
   buttons: {
      display: 'flex',
      justifyContent: 'space-between',
   },
   button: {
      marginTop: theme.spacing(5),
      backgroundColor: '#f12a43',
      color: 'white',

      '&:hover': {
         backgroundColor: '#f12a43',
         color: 'white',
      },
   },
}));

function AddressForm({ checkoutToken, next }) {
   const classes = styles();
   const [shippingCountries, setshippingCountries] = useState([]);
   const [shippingCountry, setshippingCountry] = useState('');
   const [shippingSubdivisions, setShippingSubdivisions] = useState(
      []
   );
   const [shippingSubdivision, setShippingSubdivision] = useState('');
   const [shippingOptions, setShippingOptions] = useState([]);
   const [shippingOption, setShippingOption] = useState('');

   const methods = useForm();

   //    ?  TokenId is just like you go to store and
   const fetchShippingCountries = async (checkTokenId) => {
      try {
         const { countries } =
            await commerce.services.localeListShippingCountries(
               checkTokenId.id
            );
         setshippingCountries(countries);

         // ? Object.keys extract keys from the object
         setshippingCountry(Object.keys(countries)[0]);
      } catch (error) {
         console.log(error);
      }
   };

   const fetchSubdivisions = async (countryCode) => {
      const { subdivisions } =
         await commerce.services.localeListSubdivisions(countryCode);
      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[0]);
   };

   const fetchShippingOptions = async (
      checkoutToken,
      country,
      region = null
   ) => {
      const options = await commerce.checkout.getShippingOptions(
         checkoutToken,
         { country, region }
      );

      setShippingOptions(options);
      setShippingOption(options[0].id);
   };

   //? Fetch the Shipping Countries using Checkout Token Id provided
   useEffect(() => {
      fetchShippingCountries(checkoutToken);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   //? Fetch Subdivision based on Shippping Country Selected
   useEffect(() => {
      if (shippingCountry) fetchSubdivisions(shippingCountry);
   }, [shippingCountry]);

   useEffect(() => {
      if (shippingSubdivision)
         fetchShippingOptions(
            checkoutToken.id,
            shippingCountry,
            shippingSubdivision
         );
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [shippingSubdivision]);

   const countries = Object.entries(shippingCountries).map(
      ([code, name]) => ({
         id: code,
         label: name,
      })
   );

   const subdivisions = Object.entries(shippingSubdivisions).map(
      ([code, name]) => ({
         id: code,
         label: name,
      })
   );

   const options = shippingOptions.map((so) => ({
      id: so.id,
      label: `${so.description} - ${so.price.formatted_with_symbol}`,
   }));

   return (
      <React.Fragment>
         <Typography variant='h6' gutterBottom>
            Shipping address
         </Typography>

         <FormProvider {...methods}>
            <form
               onSubmit={methods.handleSubmit((data) =>
                  next({
                     ...data,
                     shippingCountry,
                     shippingSubdivision,
                     shippingOption,
                  })
               )}
            >
               <Grid container spacing={3}>
                  {/* // ? We don't have to worry about value or manage the state of input just call this and pass some props */}
                  <FormInput
                     required
                     name='firstName'
                     label='First Name'
                  />

                  <FormInput
                     required
                     name='lastName'
                     label='Last Name'
                  />
                  <FormInput
                     required
                     name='address1'
                     label='Address'
                  />
                  <FormInput required name='email' label='Email' />
                  <FormInput required name='city' label='City' />
                  <FormInput
                     required
                     name='zip'
                     label='ZIP / Postal Code'
                  />

                  <Grid item xs={12} sm={6}>
                     <InputLabel>Shipping Country</InputLabel>
                     <Select
                        value={shippingCountry}
                        fullWidth
                        onChange={(e) =>
                           setshippingCountry(e.target.value)
                        }
                     >
                        {/* // ? Object entries give us the keys and values of these objects */}
                        {countries.map((country) => (
                           <MenuItem
                              key={country.id}
                              value={country.id}
                           >
                              {country.label}
                           </MenuItem>
                        ))}
                     </Select>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                     <InputLabel>Shipping Subdivision</InputLabel>
                     <Select
                        value={shippingSubdivision}
                        fullWidth
                        onChange={(e) =>
                           setShippingSubdivision(e.target.value)
                        }
                     >
                        {subdivisions.map((subdivision) => (
                           <MenuItem
                              key={subdivision.id}
                              value={subdivision.id}
                           >
                              {subdivision.label}
                           </MenuItem>
                        ))}
                     </Select>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                     <InputLabel>Shipping Options</InputLabel>
                     <Select
                        value={shippingOption}
                        fullWidth
                        onChange={(e) =>
                           setShippingOption(e.target.value)
                        }
                     >
                        {options.map((option) => (
                           <MenuItem
                              key={option.id}
                              value={option.id}
                           >
                              {option.label}
                           </MenuItem>
                        ))}
                     </Select>
                  </Grid>
               </Grid>
               <div className={classes.buttons}>
                  <Button
                     component={Link}
                     to='/cart'
                     className={classes.button}
                  >
                     Back to Cart
                  </Button>

                  <Button type='submit' className={classes.button}>
                     Next
                  </Button>
               </div>
            </form>
         </FormProvider>
      </React.Fragment>
   );
}

export default AddressForm;
