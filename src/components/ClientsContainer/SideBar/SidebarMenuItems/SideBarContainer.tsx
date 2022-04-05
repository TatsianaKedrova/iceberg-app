import React, { ReactNode } from "react";
import { ReactComponent as AlertIcon } from "../../../../assets/menuIcons/alertFrame.svg";
import { ReactComponent as DashBoardIcon } from "../../../../assets/menuIcons/dashboard.svg";
import { ReactComponent as AWSIcon } from "../../../../assets/menuIcons/awsIcon.svg";
import { ReactComponent as RulesIcon } from "../../../../assets/menuIcons/rulesIcon.svg";
import { ReactComponent as ReportsIcon } from "../../../../assets/menuIcons/reportsIcon.svg";
import { ReactComponent as SettingsIcon } from "../../../../assets/menuIcons/settingsIcon.svg";
import { observer } from "mobx-react-lite";
import SideBarContainerOpened from "../SideBarContainerOpened";

type SideBarContainerProps = {
  isOpened: boolean;
};

export type MenuItemType = {
  name: string;
  icon: ReactNode;
  routesLink: string;
};

const SideBarContainer: React.FC<SideBarContainerProps> = observer(
  ({ isOpened }) => {
    const menuItems: MenuItemType[] = [
      {
        name: "Alerts",
        icon: <AlertIcon className="iconMenuStyle" />,
        routesLink: "/alerts",
      },
      {
        name: "Dashboard",
        icon: <DashBoardIcon className="iconMenuStyle" />,
        routesLink: "/dashboard",
      },
      {
        name: "AWS Accounts",
        icon: <AWSIcon className="iconMenuStyle" />,
        routesLink: "/accounts",
      },
      {
        name: "Rules",
        icon: <RulesIcon className="iconMenuStyle" />,
        routesLink: "/rules",
      },
      {
        name: "Reports",
        icon: <ReportsIcon className="iconMenuStyle" />,
        routesLink: "/reports",
      },
      {
        name: "Settings",
        icon: <SettingsIcon className="iconMenuStyle" />,
        routesLink: "/settings/reporting",
      },
      {
        name: "Alerts",
        icon: <AlertIcon className="iconMenuStyle" />,
        routesLink: "/alerts",
      },
      {
        name: "Dashboard",
        icon: <DashBoardIcon className="iconMenuStyle" />,
        routesLink: "/dashboard",
      },
      {
        name: "AWS Accounts",
        icon: <AWSIcon className="iconMenuStyle" />,
        routesLink: "/accounts",
      },
      {
        name: "Rules",
        icon: <RulesIcon className="iconMenuStyle" />,
        routesLink: "/rules",
      },
      {
        name: "Reports",
        icon: <ReportsIcon className="iconMenuStyle" />,
        routesLink: "/reports",
      },
      {
        name: "Settings",
        icon: <SettingsIcon className="iconMenuStyle" />,
        routesLink: "/settings/reporting",
      },
    ];

    return (
     
          <SideBarContainerOpened
            isOpened={isOpened}
            menuItems={menuItems}
          />
   
    );
  }
);

export default SideBarContainer;
