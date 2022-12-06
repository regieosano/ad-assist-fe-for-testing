import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import DefaultPage from "../pages/dashboard/DefaultPage";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import ChangelogPage from "../pages/changelog/ChangelogPage";
import AnalyticsPage from "../pages/dashboard/AnalyticsPage";
import SaasPage from "../pages/dashboard/SaasPage";
import ComponentPageLayout from "../pages/component/ComponentPageLayout";
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FacilitiesPage from "../pages/component/FacilitiesPage";
import ButtonPage from "../pages/component/ButtonPage";
import InstallationPage from "../pages/installation/InstallationPage";
import DocumentationPage from "../pages/documentation/DocumentationPage";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/installation",
    element: <InstallationPage />,
    state: "installation",
    sidebarProps: {
      displayText: "Events",
      icon: <CalendarMonthOutlinedIcon />
    }
  },
  {
    path: "/dashboard",
    element: <DashboardPageLayout />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Notices",
      icon: <MailOutlineOutlinedIcon />
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "dashboard.index"
      },
      {
        path: "/dashboard/default",
        element: <DefaultPage />,
        state: "dashboard.default",
        sidebarProps: {
          displayText: "Default"
        },
      },
      {
        path: "/dashboard/analytics",
        element: <AnalyticsPage />,
        state: "dashboard.analytics",
        sidebarProps: {
          displayText: "Analytic"
        }
      },
      {
        path: "/dashboard/saas",
        element: <SaasPage />,
        state: "dashboard.saas",
        sidebarProps: {
          displayText: "Saas"
        }
      }
    ]
  },
  {
    path: "/component",
    element: <ComponentPageLayout />,
    state: "component",
    sidebarProps: {
      displayText: "Maintenance",
      icon: <BuildOutlinedIcon />
    },
    child: [
      {
        path: "/component/facility",
        element: <FacilitiesPage />,
        state: "component.facility",
        sidebarProps: {
          displayText: "Facilities"
        },
      },
      {
        path: "/component/button",
        element: <ButtonPage />,
        state: "component.button",
        sidebarProps: {
          displayText: "Levels"
        }
      },
      {
        path: "/component/button",
        element: <ButtonPage />,
        state: "component.button",
        sidebarProps: {
          displayText: "Officials"
        }
      },
      {
        path: "/component/button",
        element: <ButtonPage />,
        state: "component.button",
        sidebarProps: {
          displayText: "Opponents"
        }
      },
      {
        path: "/component/button",
        element: <ButtonPage />,
        state: "component.button",
        sidebarProps: {
          displayText: "Preparations"
        }
      },
      {
        path: "/component/button",
        element: <ButtonPage />,
        state: "component.button",
        sidebarProps: {
          displayText: "Workers"
        }
      }
    ]
  },
  {
    path: "/documentation",
    element: <DocumentationPage />,
    state: "documentation",
    sidebarProps: {
      displayText: "Documentation",
      icon: <ArticleOutlinedIcon />
    }
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