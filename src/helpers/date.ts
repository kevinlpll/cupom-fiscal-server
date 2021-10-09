const currentDayName = () => {
  const daysOfTheWeek = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado'
  ]
  return daysOfTheWeek[new Date().getDay()]
}

const currentMonthName = () => {
  const monthNames = [
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
    'Dezembro'
  ]
  return monthNames[new Date().getMonth()]
}

export default { currentDayName, currentMonthName }
