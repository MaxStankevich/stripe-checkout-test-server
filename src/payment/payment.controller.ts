import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Body() createPaymentIntentDto: CreatePaymentIntentDto,
  ) {
    const { email } = createPaymentIntentDto;
    try {
      const paymentIntent =
        await this.paymentService.createPaymentIntent(email);
      return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create payment intent');
    }
  }
}
