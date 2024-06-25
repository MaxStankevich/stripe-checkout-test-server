import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2024-06-20',
      },
    );
  }

  async createPaymentIntent(amount: number, email: string) {
    return await this.stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      receipt_email: email,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });
  }
}
