export function useRoleType() {
  const translateRoleType = (role: string) => {
    switch (role) {
      case 'Lead':
        return 'Leiter';
      case 'Censor':
        return 'Zensor';
      case 'Participant':
        return 'Teilnehmer';
      case '':
        return '--Alle--';
    }
  };

  return { translateRoleType };
}
