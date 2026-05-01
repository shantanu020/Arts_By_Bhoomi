import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, customerDetails } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in paise
      currency: 'inr',
      metadata: {
        customer_email: customerDetails.email,
        customer_name: `${customerDetails.firstName} ${customerDetails.lastName}`
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe Error:', error.message);
    
    // Fallback for demo
    if (process.env.NODE_ENV === 'development' || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
      return res.json({ clientSecret: 'mock_secret_for_demo' });
    }

    res.status(500).json({ error: error.message });
  }
});

export default router;
