const routes = {
  auth: {
    login: '/login',
    register: '/register',
    general: '/auth/general',
    plan: '/auth/plan',
    billing: '/auth/billing',
    setupClub: '/auth/setup-club',
    findClubs: '/auth/find-clubs',
    verifyEmail: '/api/auth/confirm-invitation',
    setPassword: '/set-password',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
  },
  client: {
    home: '/',
  },
  admin: {
    dashboard: '/dashboard',
    clubDashboard: {
      path: '/clubs/:clubId',
      url: (id) => {
        return `/clubs/${id}`;
      },
    },
    athleteDashboard: '/athlete-dashboard',
    addUser: {
      path: '/clubs/:id/users/add',
      url: (id) => {
        return `/clubs/${id}/users/add`;
      },
    },
    events: {
      path: '/clubs/:clubId/meets/:meetId/events',
      url: (clubId, meetId) => {
        return `/clubs/${clubId}/meets/${meetId}/events`;
      },
    },
    results: {
      path: '/clubs/:clubId/meets/:meetId/results/:eventType/:ageGroup/:gender/:roundType',
      url: (clubId, meetId, eventType, ageGroup, gender, roundType) => {
        return `/clubs/${clubId}/meets/${meetId}/results/${eventType}/${ageGroup}/${gender}/${roundType}`;
      },
    },
    editResults: {
      path: '/clubs/:clubId/meets/:meetId/results/:eventType/:ageGroup/:gender/:roundType/edit',
      url: (clubId, meetId, eventType, ageGroup, gender, roundType) => {
        return `/clubs/${clubId}/meets/${meetId}/results/${eventType}/${ageGroup}/${gender}/${roundType}/edit`;
      },
    },
    meets: '/meets',
    addMeet: {
      path: '/clubs/:id/meets/add',
      url: (id) => {
        return `/clubs/${id}/meets/add`;
      },
    },
    showMeet: {
      path: '/clubs/:clubId/meets/:meetId/show',
      url: (clubId, meetId) => {
        return `/clubs/${clubId}/meets/${meetId}/show`;
      },
    },
    editMeet: {
      path: '/clubs/:clubId/meets/:meetId/edit',
      url: (clubId, meetId) => {
        return `/clubs/${clubId}/meets/${meetId}/edit`;
      },
    },
    members: '/members',
    addMember: {
      path: '/clubs/:id/members/add',
      url: (id) => {
        return `/clubs/${id}/members/add`;
      },
    },
    editMember: {
      path: '/clubs/:id/members/:email/edit',
      url: (id, email) => {
        return `/clubs/${id}/members/${email}/edit`;
      },
    },
    showMember: {
      path: '/clubs/:id/members/:email/show',
      url: (id, email) => {
        return `/clubs/${id}/members/${email}/show`;
      },
    },
    athletes: '/athletes',
    addAthlete: {
      path: '/clubs/:id/members/:email/athletes/add',
      url: (id, email) => {
        return `/clubs/${id}/members/${email}/athletes/add`;
      },
    },
    editAthlete: {
      path: '/clubs/:id/members/:email/athletes/:athleteId/edit',
      url: (id, email, athleteId) => {
        return `/clubs/${id}/members/${email}/athletes/${athleteId}/edit`;
      },
    },
    notification: '/notifications',
    profile: '/profile',
  },
  notFound: '/404',
};

export default routes;
