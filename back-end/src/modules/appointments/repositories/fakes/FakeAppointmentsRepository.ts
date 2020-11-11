import { uuid } from 'uuidv4';
import { getMonth, getYear, isEqual, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'; 
import Appointment from '../../infra/typeorm/entities/Appointment';
import IFindAllInMonthDTO from '@modules/appointments/dtos/IFindAllInMonthDTO';
import IFindAllInDayDTO from '@modules/appointments/dtos/IFindAllInDayDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> { 
    const findAppointment = this.appointments.find(appointment => 
      isEqual(appointment.date, date),
    );
    
    return findAppointment;
  }

  public async findAllInMonth({
    provider_id,
    month,
    year,
  }: IFindAllInMonthDTO):Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
      );
    });

    return appointments;
}  

public async findAllInDay({
  provider_id,
  day,
  month,
  year,
}: IFindAllInDayDTO):Promise<Appointment[]> {
  const appointments = this.appointments.filter(appointment => {
    return (
      appointment.provider_id === provider_id &&
      getDate(appointment.date) === day &&
      getMonth(appointment.date) + 1 === month &&
      getYear(appointment.date) === year,
    );
  });

  return appointments;
}

  public async create({ 
    provider_id,
    user_id, 
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
