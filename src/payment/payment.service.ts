import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  private readonly amount = 100;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2024-06-20',
      },
    );
  }

  async createPaymentIntent(email: string) {
    try {
      return await this.stripe.paymentIntents.create({
        amount: this.amount,
        currency: 'usd',
        receipt_email: email,
        automatic_payment_methods: {
          enabled: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create payment intent');
    }
  }
}
