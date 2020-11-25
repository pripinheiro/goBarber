import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvalabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const listProviderDayAvalability = container.resolve(ListProviderDayAvalabilityService);
  
    const availability = await listProviderDayAvalability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });
  
    return response.json(availability);
  }
}