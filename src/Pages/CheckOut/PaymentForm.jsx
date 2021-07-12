import React from 'react';
import { Typography, Button } from '@material-ui/core';
import {
   Elements,
   CardElement,
   ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const stripePromise = loadStripe(
   process.env.REACT_APP_STRIPE_PUBLIC_KEY
);

export default function PaymentForm({
   checkoutToken,
   shippingData,
   goBack,
   onCaptureCheckout,
   nextStep,
}) {
   const handleSubmit = async (event, elements, stripe) => {
      event.preventDefault();

      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);

      // ? We gonna use stripe api to create the payment method, todo that;

      const { error, paymentMethod } =
         await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
         });

      if (error) console.log(error);
      else {
         const orderData = {
            line_items: checkoutToken.live.line_items,
            customer: {
               firstname: shippingData.firstName,
               lastname: shippingData.lastName,
               email: shippingData.email,
            },
            shipping: {
               name: 'Primary',
               street: shippingData.address1,
               town_city: shippingData.city,
               county_state: shippingData.shippingSubdivision,
               postal_zip_code: shippingData.zip,
               country: shippingData.shippingCountry,
            },
            billing: {
               name: `${shippingData.firstName} ${shippingData.lastName}`,
               street: shippingData.address1,
               town_city: shippingData.city,
               county_state: shippingData.shippingSubdivision,
               postal_zip_code: shippingData.zip,
               country: shippingData.shippingCountry,
            },
            fulfillment: {
               shipping_method: shippingData.shippingOption,
            },
            payment: {
               gateway: 'stripe',
               stripe: {
                  payment_method_id: paymentMethod.id,
               },
            },
         };
         onCaptureCheckout(checkoutToken.id, orderData);
         nextStep();
      }
   };

   return (
      <React.Fragment>
         <Review checkoutToken={checkoutToken} />
         <Typography variant='h6' gutterBottom align='center'>
            Payment method
         </Typography>
         <Elements stripe={stripePromise}>
            <ElementsConsumer>
               {({ elements, stripe }) => (
                  <form
                     onSubmit={(e) =>
                        handleSubmit(e, elements, stripe)
                     }
                  >
                     <CardElement />
                     <br />
                     <br />
                     <div
                        style={{
                           display: 'flex',
                           justifyContent: 'space-between',
                        }}
                     >
                        <Button variant='outlined' onClick={goBack}>
                           Back
                        </Button>
                        <Button
                           type='submit'
                           variant='contained'
                           disabled={!stripe}
                           color='primary'
                        >
                           Pay{' '}
                           {
                              checkoutToken.live.subtotal
                                 .formatted_with_symbol
                           }
                        </Button>
                     </div>
                  </form>
               )}
            </ElementsConsumer>
         </Elements>
      </React.Fragment>
   );
}
