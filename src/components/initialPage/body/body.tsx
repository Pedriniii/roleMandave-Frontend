import React from 'react';
import './body.css'; // Estilo CSS para o calendário

const MonthCalendar = () => {
  const currentMonth = new Date().getMonth(); // Mês atual (0 a 11)
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  return (
    <div className="month-calendar">
      {monthNames.map((month, index) => {
        const isPastMonth = index < currentMonth;
        const isCurrentMonth = index == currentMonth;
        const classNames = isPastMonth ? 'month past-month' : 'month' && isCurrentMonth ? 'month current-month' : 'month';
        return (
          <div key={month} className={classNames}>
            {month}
          </div>
        );
      })}
    </div>
  );
};

export default MonthCalendar;
