import React from 'react';
import { Routes, Route } from 'react-router-dom';

import routes from './routes';
import ProtectedRoute from './ProtectedRoute';

import AuthLayout from 'layouts/AuthLayout';
import AdminLayout from 'layouts/AdminLayout';
import FormWithFooterLayout from 'layouts/FormWithFooterLayout';

/* Auth Pages */
import Login from 'pages/auth/Login';
import VerifyEmail from 'pages/auth/VerifyEmail';
import SetPassword from 'pages/auth/SetPassword';
import ForgotPassword from 'pages/auth/ForgotPassword';
import ResetPassword from 'pages/auth/ResetPassword';

/* Admin Page*/
import ClubDashboard from 'pages/admin/ClubDashboard';
import AthleteDashboard from 'pages/admin/AthleteDashboard';

import Competitions from 'pages/admin/Meets';
import AddMeet from 'pages/admin/AddMeet';
import ShowMeet from 'pages/admin/ShowMeet';
import EditMeet from 'pages/admin/EditMeet';
import Events from 'pages/admin/Events';
import Results from 'pages/admin/Results';

import MyProfile from 'pages/admin/MyProfile';

import ClubMembers from 'pages/admin/ClubMembers';
import AddMember from 'pages/admin/AddMember';
import ShowMember from 'pages/admin/ShowMember';
import EditMember from 'pages/admin/EditMember';

import Athletes from 'pages/admin/Athletes';
import AddUser from 'pages/admin/AddUser';
import AddAthlete from 'pages/admin/AddAthlete';
import EditAthlete from 'pages/admin/EditAthlete';

import Homepage from 'pages/client/Homepage';
import NotFound from 'pages/NotFound';

const RouteConfig = () => {
  return (
    <Routes>
      <Route path={routes.client.home} element={<Homepage />} />
      <Route element={<AuthLayout />}>
        <Route path={routes.auth.login} element={<Login />} />
        <Route path={routes.auth.verifyEmail} element={<VerifyEmail />} />
        <Route path={routes.auth.setPassword} element={<SetPassword />} />
        <Route path={routes.auth.forgotPassword} element={<ForgotPassword />} />
        <Route path={routes.auth.resetPassword} element={<ResetPassword />} />
      </Route>

      <Route element={<FormWithFooterLayout />}>
        <Route
          path={routes.admin.addUser.path}
          element={
            <ProtectedRoute allowedRoles={['Owner', 'Admin']}>
              <AddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.admin.addAthlete.path}
          element={
            <ProtectedRoute allowedRoles={['Owner', 'Admin']}>
              <AddAthlete />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.admin.editAthlete.path}
          element={
            <ProtectedRoute allowedRoles={['Owner', 'Admin']}>
              <EditAthlete />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.admin.addMeet.path}
          element={
            <ProtectedRoute allowedRoles={['Owner', 'Admin']}>
              <AddMeet />
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.admin.editMeet.path}
          element={
            <ProtectedRoute allowedRoles={['Owner', 'Admin', 'Official']}>
              <EditMeet />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.admin.addMember.path}
          element={
            <ProtectedRoute allowedRoles={['Owner', 'Admin']}>
              <AddMember />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.admin.editMember.path}
          element={
            <ProtectedRoute allowedRoles={['Owner', 'Admin']}>
              <EditMember />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route element={<AdminLayout />}>
        <Route
          path={routes.admin.dashboard}
          element={
            <ProtectedRoute>
              <ClubDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.admin.athleteDashboard}
          element={
            <ProtectedRoute>
              <AthleteDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.admin.athletes}
          element={
            <ProtectedRoute allowedRoles={['Owner', 'Admin', 'Official']}>
              <Athletes />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.admin.meets}
          element={
            <ProtectedRoute>
              <Competitions />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.admin.showMeet.path}
          element={
            <ProtectedRoute>
              <ShowMeet />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.admin.events.path}
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.admin.results.path}
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.admin.results.path}
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.admin.editResults.path}
          element={
            <ProtectedRoute>
              <Results isOpenEditPopup={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.admin.members}
          element={
            <ProtectedRoute allowedRoles={['Owner', 'Admin', 'Official']}>
              <ClubMembers />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.admin.showMember.path}
          element={
            <ProtectedRoute
              allowedRoles={['Owner', 'Admin', 'Official']}
              isShowMemberPage={true}
            >
              <ShowMember />
            </ProtectedRoute>
          }
        />
        <Route path={routes.admin.profile} element={<MyProfile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteConfig;
