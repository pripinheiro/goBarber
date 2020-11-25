import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListMonthAvalabilityService from '@modules/appointments/services/ListMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listMonthAvalability = container.resolve(ListMonthAvalabilityService);
  
    const availability = await listMonthAvalability.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });
  
    return response.json(availability);
  }
}