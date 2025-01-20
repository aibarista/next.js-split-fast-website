import React from 'react';
import routes from 'routes';

import { ReactComponent as HomeIcon } from 'assets/images/icon_home.svg';
import { ReactComponent as AthleteIcon } from 'assets/images/icon_athlete.svg';
import { ReactComponent as TeamIcon } from 'assets/images/icon_team.svg';
import { ReactComponent as CompetitionIcon } from 'assets/images/icon_competition.svg';
import { ReactComponent as UserIcon } from 'assets/images/icon_user_setting.svg';
import { ReactComponent as SettingIcon } from 'assets/images/icon_settings.svg';

export const links = [
  {
    name: 'Club Dashboard',
    url: routes.admin.dashboard,
    icon: <HomeIcon />,
  },
  {
    name: 'My Dashboard',
    url: routes.admin.athleteDashboard,
    icon: <TeamIcon />,
    allowedRoles: ['Member'],
  },
  {
    name: 'Meets',
    url: routes.admin.meets,
    icon: <CompetitionIcon />,
  },
  {
    name: 'Members',
    url: routes.admin.members,
    icon: <UserIcon />,
    allowedRoles: ['Owner', 'Admin', 'Official'],
  },
  {
    name: 'Athletes',
    url: routes.admin.athletes,
    icon: <AthleteIcon />,
    allowedRoles: ['Owner', 'Admin', 'Official'],
  },
  {
    name: 'Club Settings',
    url: routes.admin.notification,
    icon: <SettingIcon />,
    allowedRoles: ['Owner', 'Admin'],
  },
];
