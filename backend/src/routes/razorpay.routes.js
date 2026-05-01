import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import Order from '../models/order.model.js';

dotenv.config();

const router = express.Router();

// Initialize Razorpay instance safely (only if keys exist)
let razorpayInstance = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

router.post('/create-order', async (req, res) => {
  try {
    if (!razorpayInstance) {
      // Fallback for development/demo
      if (process.env.NODE_ENV === 'development') {
        return res.json({ id: 'order_mock_123', amount: req.body.amount * 100, currency: 'INR' });
      }
      return res.status(500).json({ error: "Razorpay keys not configured" });
    }

    const { amount } = req.body;
    
    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Razorpay Error:', error);
    res.status(500).json({ error: error.message || "Failed to create order" });
  }
});

router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;
    
    // Fallback for development
    if (!razorpayInstance) {
      if (process.env.NODE_ENV === 'development') {
        if (orderData) {
          const order = new Order({ ...orderData, isPaid: true, paidAt: Date.now() });
          await order.save();
        }
        return res.json({ success: true });
      }
      return res.status(500).json({ error: "Razorpay keys not configured" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      if (orderData) {
        const order = new Order({
          ...orderData,
          isPaid: true,
          paidAt: Date.now(),
          paymentResult: {
            id: razorpay_payment_id,
            status: 'paid',
            update_time: new Date().toISOString(),
            email_address: orderData.guestEmail || '',
          }
        });
        await order.save();
      }
      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error('Verification Error:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
