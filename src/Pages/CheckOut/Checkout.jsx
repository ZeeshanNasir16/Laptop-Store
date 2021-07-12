import React, { useEffect, useState } from 'react';
import {
   Paper,
   Stepper,
   Step,
   StepLabel,
   Button,
   Typography,
   CircularProgress,
   Divider,
} from '@material-ui/core';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import styles from './CheckoutStyles';
import { commerce } from '../../lib/commerce';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loading/Loading';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
const steps = ['Shipping address', 'Payment details'];

export default function Checkout({
   handleCaptureOrder,
   order,
   error,
}) {
   const classes = styles();
   const [activeStep, setActiveStep] = React.useState(0);
   const cart = useSelector((state) => state.cart);
   const [checkoutToken, setcheckoutToken] = useState(null);
   const [shippingData, setShippingData] = useState({});
   const dispatch = useDispatch();
   const history = useHistory();

   // ? Generate token id as soon as someone enters checkout page
   useEffect(() => {
      const generateToken = async () => {
         try {
            console.log('generate TOken ', cart.cart_id);
            const token = await commerce.checkout.generateToken(
               cart.cart_id,
               { type: 'cart' }
            );
            setcheckoutToken(token);
         } catch (error) {}
      };
      if (!cart.loading && cart.totalItems !== 0) generateToken();
   }, [cart]);

   const handleNext = () =>
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

   const handlePrevious = () =>
      setActiveStep((prevActiveStep) => prevActiveStep - 1);

   const next = (data) => {
      handleNext();
      setShippingData(data);
   };

   const Form = () =>
      activeStep === 0 ? (
         <AddressForm checkoutToken={checkoutToken} next={next} />
      ) : (
         activeStep === 1 && (
            <PaymentForm
               checkoutToken={checkoutToken}
               shippingData={shippingData}
               goBack={handlePrevious}
               onCaptureCheckout={handleCaptureOrder}
               nextStep={handleNext}
            />
         )
      );

   const handleAfterCheckout = () => {
      try {
         console.log(cart.cart_id);
         commerce.cart.empty().then((response) => {
            if (response.success) {
               const { id, total_items, line_items, subtotal } =
                  response.cart;
               console.log(id);
               dispatch({
                  type: 'CART_UPDATE_SUCCESS',
                  payload: {
                     totalItems: total_items,
                     lineItems: line_items,
                     subTotal: subtotal.raw,
                     cart_id: id,
                  },
               });
               history.push('/');
            }
         });
      } catch (er) {
         alert('Error :', er);
      }
   };

   let Confirmation = () =>
      order.customer ? (
         <>
            <div>
               <Typography variant='h5'>
                  Thank you for your purchase,{' '}
                  {order.customer.firstname} {order.customer.lastname}
                  !
               </Typography>
               <Divider className={classes.divider} />
               <Typography variant='subtitle2'>
                  Order ref: {order.customer_reference}
               </Typography>
            </div>
            <br />
            <Button
               variant='outlined'
               type='button'
               onClick={handleAfterCheckout}
            >
               Back to home
            </Button>
         </>
      ) : (
         <div className={classes.spinner}>
            <CircularProgress />
         </div>
      );

   if (error) {
      Confirmation = () => (
         <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br />
            <Button
               component={Link}
               variant='outlined'
               type='button'
               to='/'
            >
               Back to home
            </Button>
         </>
      );
   }

   if (!cart.loading)
      return (
         <React.Fragment>
            <main className={classes.layout}>
               <Paper className={classes.paper}>
                  <Typography
                     component='h1'
                     variant='h4'
                     align='center'
                  >
                     Checkout
                  </Typography>
                  <Stepper
                     activeStep={activeStep}
                     className={classes.stepper}
                  >
                     {steps.map((label) => (
                        <Step key={label}>
                           <StepLabel>{label}</StepLabel>
                        </Step>
                     ))}
                  </Stepper>

                  <div style={{ minHeight: 400 }}>
                     {activeStep === steps.length ? (
                        <Confirmation />
                     ) : (
                        checkoutToken && <Form />
                     )}
                  </div>
               </Paper>
            </main>
         </React.Fragment>
      );
   else return <Loader />;
}
