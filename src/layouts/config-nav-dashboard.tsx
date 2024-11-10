import { Role } from 'src/contexts/types';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
    roles: [
      Role.Admin,
      Role.Artista,
      Role.Empresario,
      Role.EmpresarioExterno,
      Role.Financeiro,
      Role.Visitante,
    ],
  },
  {
    title: 'Artistas',
    path: '/artistas',
    icon: icon('ic-artistas'),
    roles: [Role.Admin],
  },

  {
    title: 'Eventos',
    path: '/evento',
    icon: icon('ic-calendar'),
    roles: [
      Role.Admin,
      Role.Financeiro,
      Role.Artista,
      Role.Empresario,
      Role.EmpresarioExterno,
      Role.Visitante,
    ],
  },

  {
    title: 'Contratantes',
    path: '/contratantes',
    icon: icon('ic-contratantes'),
    roles: [Role.Admin, Role.Empresario, Role.EmpresarioExterno],
  },
  {
    title: 'Compromissos',
    path: '/compromissos',
    icon: icon('ic-compromissos'),
    roles: [Role.Admin, Role.Artista, Role.Empresario, Role.EmpresarioExterno],
  },
  {
    title: 'Gestão',
    icon: icon('ic-gestao'),
    children: [
      {
        title: 'Usuários',
        path: '/usuarios',
        icon: icon('ic-user'),
      },
      {
        title: 'Empresários',
        path: '/empresarios',
        icon: icon('ic-empresarios'),
      },
      {
        title: 'Tipos de Eventos',
        path: '/tipos-eventos',
        icon: icon('ic-tipos-eventos'),
      },
    ],
    roles: [Role.Admin],
  },
  {
    title: 'Financeiro',
    path: '/financeiro',
    icon: icon('ic-relatorios'),
    roles: [Role.Admin, Role.Financeiro],
  },
  {
    title: 'Perfil',
    path: '/perfil',
    icon: icon('ic-perfil'),
    roles: [Role.Admin, Role.Artista, Role.Empresario, Role.EmpresarioExterno, Role.Financeiro],
  },
];
