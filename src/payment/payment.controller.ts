import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() createPaymentIntentDto: any) {
    const { amount, email } = createPaymentIntentDto;
    const paymentIntent = await this.paymentService.createPaymentIntent(
      amount,
      email,
    );
    return { clientSecret: paymentIntent.client_secret };
  }
}
