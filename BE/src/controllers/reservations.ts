import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GuardJwtAuth } from '@guards/authGuard';
import { ID } from '@helpers/global';
import { ReservationDto } from '@dto//reservations/reservation';
import { ReservationsService } from '@services/reservations';
import { Reservations } from '@schema/reservations/reservations';

@UseGuards(GuardJwtAuth)
@Controller('api/reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Post()
  addReservation(
    @Body() reservationDto: ReservationDto,
  ): Promise<Reservations> {
    return this.reservationsService.addReservation(reservationDto);
  }

  @Delete(':id')
  removeReservation(
    @Param('id') reservationId: ID,
    @Body() data: { userId: ID },
  ): Promise<Reservations> {
    return this.reservationsService.removeReservation(
      reservationId,
      data.userId,
    );
  }

  @Get()
  searchReservations(
    @Query() searchParams: Partial<ReservationDto>,
  ): Promise<Reservations[]> {
    return this.reservationsService.searchReservations(searchParams);
  }
}
