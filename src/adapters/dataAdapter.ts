
// Centraliza adaptação entre o modelo antigo (JSON server) e o novo (API/SQL)
export type User = { id: number; name: string; email: string; userType: 'orientando'|'orientador'|'admin' }
export type SolicitacaoNew = { orientando_id: number; orientador_id: number; temaTCC: string; descricao?: string; dataSolicitacao: string; status?: 'pendente'|'aprovada'|'rejeitada' }
export type TaskNew = { orientando_id: number; title: string; description?: string; dataEntrega: string }

// Helpers
export function toISODateFromDayMonthYear(day: string|number, monthYear: string): string {
  // monthYear e.g. "Janeiro 2025" -> 2025-01-DD
  const meses: Record<string, string> = {
    'Janeiro':'01','Fevereiro':'02','Março':'03','Marco':'03','Abril':'04','Maio':'05','Junho':'06',
    'Julho':'07','Agosto':'08','Setembro':'09','Outubro':'10','Novembro':'11','Dezembro':'12'
  };
  const [mesPt, ano] = monthYear.split(/\s+/);
  const mm = meses[mesPt] || '01';
  const dd = String(day).padStart(2,'0');
  return `${ano}-${mm}-${dd}`;
}
