import React from "react";
import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import DefaultPage from "../pages/dashboard/DefaultPage";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage";
import SaasPage from "../pages/dashboard/SaasPage";
import ComponentPageLayout from "../pages/component/ComponentPageLayout";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import OfficialsPage from "../pages/component/OfficialsPage";
import FacilitiesPage from "../pages/component/FacilitiesPage";
import LevelsPage from "../pages/component/LevelsPage";
import OpponentsPage from "../pages/component/OpponentsPage";
import PreparationsPage from "../pages/component/PreparationsPage";
import WorkersPage from "../pages/component/WorkersPage";
import InstallationPage from "../pages/installation/InstallationPage";
import DocumentationPage from "../pages/documentation/DocumentationPage";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/installation",
    element: <InstallationPage />,
    state: "installation",
    sidebarProps: {
      displayText: "Events",
      icon: <CalendarMonthOutlinedIcon />,
    },
  },
  {
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Notices",
      icon: <MailOutlineOutlinedIcon />,
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "dashboard.index",
      },
      {
        path: "/dashboard/default",
        element: <DefaultPage />,
        state: "dashboard.default",
        sidebarProps: {
          displayText: "Default",
        },
      },
      {
        path: "/dashboard/analytics",
        element: <AnalyticsPage />,
        state: "dashboard.analytics",
        sidebarProps: {
          displayText: "Analytic",
        },
      },
      {
        path: "/dashboard/saas",
        element: <SaasPage />,
        state: "dashboard.saas",
        sidebarProps: {
          displayText: "Saas",
        },
      },
    ],
  },
  {
    path: "/component",
    element: <ComponentPageLayout />,
    state: "component",
    sidebarProps: {
      displayText: "Maintenance",
      icon: <BuildOutlinedIcon />,
    },
    child: [
      {
        path: "/component/facility",
        element: <FacilitiesPage />,
        state: "component.facility",
        sidebarProps: {
          displayText: "Facilities",
        },
      },
      {
        path: "/component/level",
        element: <LevelsPage />,
        state: "component.level",
        sidebarProps: {
          displayText: "Levels",
        },
      },
      {
        path: "/component/official",
        element: <OfficialsPage />,
        state: "component.official",
        sidebarProps: {
          displayText: "Officials",
        },
      },
      {
        path: "/component/opponent",
        element: <OpponentsPage />,
        state: "component.opponent",
        sidebarProps: {
          displayText: "Opponents",
        },
      },
      {
        path: "/component/preparation",
        element: <PreparationsPage />,
        state: "component.preparation",
        sidebarProps: {
          displayText: "Preparations",
        },
      },
      {
        path: "/component/worker",
        element: <WorkersPage />,
        state: "component.worker",
        sidebarProps: {
          displayText: "Workers",
        },
      },
    ],
  },
  {
    path: "/documentation",
    element: <DocumentationPage />,
    state: "documentation",
    sidebarProps: {
      displayText: "Documentation",
      icon: <ArticleOutlinedIcon />,
    },
  },
  // {
  //   path: "/changelog",
  //   element: <ChangelogPage />,
  //   state: "changelog",
  //   sidebarProps: {
  //     displayText: "Changelog",
  //     icon: <FormatListBulletedOutlinedIcon />
  //   }
  // }
];

export default appRoutes;
