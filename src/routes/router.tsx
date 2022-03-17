import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import {
  Agenda,
  Appointments,
  Dashboard,
  DoctorProfile,
  Home,
  PatientDetail,
  Patients,
  UpsertPatient,
  Consultation,
  CommingSoon,
} from '@containers';

// Auth Conponents
import { Login, Register, ForgotPassword, Verification } from '@containers';

import { Consultations } from '@containers';

import { Layout } from '../hoc/layout';

import AuthenticatedRoute from './authenticated-route/authenticated-route';
import UnauthenticatedRoute from './unauthenticated-route/unauthenticated-route';

export function Router() {
  return (
    <Switch>
      <AuthenticatedRoute exact path="/">
        <Home />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/dashboard">
        <Dashboard />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/agenda">
        <Agenda />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/reports">
        <CommingSoon />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/appointments">
        <Appointments />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/appointments/:appointmentId/edit">
        <Appointments />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/patients/add">
        <Layout>
          <UpsertPatient />
        </Layout>
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/patients/:patientId/edit">
        <Layout>
          <UpsertPatient />
        </Layout>
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/patients/:patientId">
        <Layout>
          <PatientDetail />
        </Layout>
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/patients">
        <Layout>
          <Patients />
        </Layout>
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/profile">
        <DoctorProfile />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/consultations">
        <Consultations />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/consultation/:consultationId">
        <Layout>
          <Consultation />
        </Layout>
      </AuthenticatedRoute>

      <UnauthenticatedRoute exact path="/register">
        <Register />
      </UnauthenticatedRoute>

      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>

      <UnauthenticatedRoute exact path="/forgot-password">
        <ForgotPassword />
      </UnauthenticatedRoute>

      <UnauthenticatedRoute exact path="/verification">
        <Verification />
      </UnauthenticatedRoute>

      <Redirect to="dashboard" from="/" />

      {/* Finally, catch all unmatched Router */}
      {/* <Route> */}
      {/* <NotFound /> */}
      {/* </Route> */}
    </Switch>
  );
}
