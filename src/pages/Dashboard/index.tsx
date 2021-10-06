import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DayPicker from 'react-day-picker/DayPicker';
import 'react-day-picker/lib/style.css';
import { isToday, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FiClock, FiPower } from 'react-icons/fi';
import { DayModifiers } from 'react-day-picker';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  const [selectDate, setSelectDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectDate(day);
    }
  }, []);

  const handleMonthChage = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });
    return dates;
  }, [currentMonth, monthAvailability]);

  const selectDateAsText = useMemo(() => {
    return format(selectDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectDate]);

  const selectWeekDay = useMemo(() => {}, [selectDate]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            {isToday(selectDate) && <span>Hoje</span>}
            <span>${selectDateAsText}</span>
            <span>${selectWeekDay}</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/15171550?v=4"
                alt="Jean Paulo"
              />
              <strong>Jean Paulo</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/15171550?v=4"
                  alt="Jean Paulo"
                />
                <strong>Jean Paulo</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                09:00
              </span>
              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/15171550?v=4"
                  alt="Jean Paulo"
                />
                <strong>Jean Paulo</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                14:00
              </span>
              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/15171550?v=4"
                  alt="Jean Paulo"
                />
                <strong>Jean Paulo</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                15:00
              </span>
              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/15171550?v=4"
                  alt="Jean Paulo"
                />
                <strong>Jean Paulo</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                17:00
              </span>
              <div>
                <img
                  src="https://avatars.githubusercontent.com/u/15171550?v=4"
                  alt="Jean Paulo"
                />
                <strong>Jean Paulo</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleDateChange}
            selectedDays={selectDate}
            onMonthChange={handleMonthChage}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};
export default Dashboard;
