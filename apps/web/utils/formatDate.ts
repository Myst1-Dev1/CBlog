export function formatDate(dateInput: string | Date) {
  const date = new Date(dateInput);
  
  // Garante que a data é válida antes de formatar
  if (isNaN(date.getTime())) return "";

  // Formata o dia e o ano normalmente, e o mês de forma abreviada
  const day = date.toLocaleDateString('pt-BR', { day: '2-digit' });
  let month = date.toLocaleDateString('pt-BR', { month: 'short' });
  const year = date.getFullYear();

  // Remove o ponto que o pt-BR costuma colocar na abreviação (ex: "jan." vira "Jan")
  month = month.replace('.', '');
  // Deixa a primeira letra do mês maiúscula
  month = month.charAt(0).toUpperCase() + month.slice(1);

  return `${day} ${month}, ${year}`;
}