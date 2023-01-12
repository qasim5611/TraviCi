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
    component: lazy(() => import("src/views/auth/Registration")),
  },
  {
    exact: true,
    path: "/forgot-password",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/ForgotPassword")),
  },
  {
    exact: true,
    path: "/reset-password",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/ResetPassword")),
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
    path: "/help-support",
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
    path: "/user-management",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/UserManagement")),
  },
  {
    exact: true,
    path: "/dispute-management",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/DisputeManagement/DisputeContractList")
    ),
  },
  {
    exact: true,
    path: "/dispute-list",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/DisputeManagement/DisputeManagement")
    ),
  },
  {
    exact: true,
    path: "/commission",
    // guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/Commission")),
  },
  {
    exact: true,
    path: "/view-user",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/UserManagement/viewUser")),
  },
  {
    exact: true,
    path: "/contracts-view",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/UserManagement/Components/Contractsview")
    ),
  },
  {
    exact: true,
    path: "/view-individual-contract",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/UserManagement/Components/viewIndividualContract")
    ),
  },
  {
    exact: true,
    path: "/validatore-management",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/ValidatorManagement/index")),
  },

  {
    exact: true,
    path: "/subscription-management",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/SubscriptionManagement")),
  },
  {
    exact: true,
    path: "/view-subscription-plan",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/SubscriptionManagement/viewPlan")
    ),
  },

  {
    exact: true,
    path: "/edit-plan",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/SubscriptionManagement/editPlan")
    ),
  },
  {
    exact: true,
    path: "/transaction-management",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/TransactionManagement")),
  },
  {
    exact: true,
    path: "/milestone-management",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/MilestoneManagement")),
  },
  {
    exact: true,
    path: "/view-milestone",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/MilestoneManagement/viewMilestone")
    ),
  },
  {
    exact: true,
    path: "/contract-management",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/ContractManagement")),
  },
  {
    exact: true,
    path: "/view-transaction",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/TransactionManagement/viewTransaction")
    ),
  },
  {
    exact: true,
    path: "/static-content-management",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/StaticContentManagement")),
  },

  {
    exact: true,
    path: "/Faq",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/FAQs/Index")),
  },
  {
    exact: true,
    path: "/edit-faq",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/FAQs/EditFAQs")),
  },
  {
    exact: true,
    path: "/add-faq",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/FAQs/AddFaq")),
  },
  {
    exact: true,
    path: "/view-faq",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/FAQs/ViewFAQs")),
  },
  {
    exact: true,
    path: "/view-static",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/StaticContentManagement/view-static")
    ),
  },
  {
    exact: true,
    path: "/edit-static",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/StaticContentManagement/editStatic")
    ),
  },
  {
    exact: true,
    path: "/validator-management",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/ValidatorManagement")),
  },
  {
    exact: true,
    path: "/add-validator",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/ValidatorManagement/AddextValidator")
    ),
  },
  {
    exact: true,
    path: "/view-validator",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/ValidatorManagement/viewValidator")
    ),
  },
  {
    exact: true,
    path: "/edit-validator",
    // guard:true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/ValidatorManagement/editValidator")
    ),
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
