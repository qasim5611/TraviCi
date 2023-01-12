import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import DashboardLayout, { MileStoneLayout } from "src/layouts/DashboardLayout";
import LoginLayout from "src/layouts/LoginLayout";
export const routes = [
  {
    exact: true,
    path: "/",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/LogIn")),
  },
  {
    exact: true,
    path: "/registration",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Registration/")),
  },
  {
    exact: true,
    path: "/forgot-password",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/ForgotPassword/")),
  },
  {
    exact: true,
    path: "/reset-password",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/ResetPassword/")),
  },
  {
    exact: true,
    path: "/my-profile",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/MyProfile")),
  },

  {
    exact: true,
    path: "/dashboard",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard")),
  },
  {
    exact: true,
    path: "/user-transaction",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/TransactionManagement")),
  },


  {
    exact: true,
    path: "/travi-yml",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Travis")),
  },




  {
    exact: true,
    path: "/view-transaction",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/TransactionManagement/viewTransaction")
    ),
  },
  {
    exact: true,
    path: "/help-support",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/HelpAndSupport")),
  },
  {
    exact: true,
    path: "/terms-support",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/HelpAndSupport/termsAndSupport")
    ),
  },
  {
    exact: true,
    path: "/terms-register",
    // guard: true,
    // layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/HelpAndSupport/terms-register")
    ),
  },
  {
    exact: true,
    path: "/add-milestone",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/HelpAndSupport")),
  },
  {
    exact: true,
    path: "/notifications",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Notification/index")),
  },
  {
    exact: true,
    path: "/notification-detail",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Notification/NotificationDetails")
    ),
  },

  {
    exact: true,
    path: "/my-projects",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/MyProjects/")),
  },
  {
    exact: true,
    path: "/my-subscriptions",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Mysubscriptions")),
  },
  {
    exact: true,
    path: "/contact-us",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/ContactUs/")),
  },
  {
    exact: true,
    path: "/milestone-details",
    // guard:true,
    layout: DashboardLayout,
    // layout: MileStoneLayout,
    component: lazy(() => import("src/views/pages/MilestoneDetails/")),
  },
  {
    exact: true,
    path: "/pricing",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Pricing/")),
  },
  {
    exact: true,
    path: "/reply-data",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/MilestoneDetails/ReplyOndisputeTable")),
  },
  {
    exact: true,
    path: "/payment",
    // guard:true,
    // layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Payment")),
  },
  {
    exact: true,
    path: "/home",
    // guard:true,
    // layout: DashboardLayout,
    component: lazy(() => import("src/component/Home")),
  },

  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    component: () => <Redirect to="/404" />,
  },
];
