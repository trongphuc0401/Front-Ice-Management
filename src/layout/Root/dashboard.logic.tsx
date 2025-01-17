import React from "react";
import { RoleType } from "../../types/base/role";
import type { MenuProps } from "antd";
import {
  AuditOutlined,
  BookOutlined,
  BulbOutlined,
  GlobalOutlined,
  PieChartOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import constantRoutesChallengeManager from "../../constants/routes/challengeManager";
import MenuItem from "antd/es/menu/MenuItem";
import constantRoutesMentor from "../../constants/routes/mentor";
import constantRoutesTasker from "../../constants/routes/tasker";
import constantRoutesRoot from "../../constants/routes/root";
import { useLanguage } from "../../contexts/LanguageContext"; // Import useLanguage
import { useMemo } from "react"; // Import useMemo for optimization

type MenuItemType = Required<MenuProps>["items"][number];

const getItem: (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItemType[] | null,
  path?: string
) => MenuItemType = (label, key, icon, children, path) => {
  return {
    key,
    icon,
    children,
    label,
    path,
  } as MenuItemType;
};

const DEFAULT_CHALLENGE_ROUTES = `/${constantRoutesChallengeManager.pages.challenges.root}`;
const DEFAULT_SOLUTION_ROUTES = `/${constantRoutesChallengeManager.pages.solutions.root}`;
const DEFAULT_TASK_ROUTES = `/${constantRoutesChallengeManager.pages.tasks.root}`;

const useDashboardLogic = (role: RoleType) => {
  const { t } = useLanguage(); // Lấy hàm t từ context

  const menuOfChallengeManager: MenuItemType[] = useMemo(
    () => [
      getItem(t("dashboard.challenges"), "challenges", <BookOutlined />, [
        getItem(
          t("dashboard.challenges.list"),
          "challenges-1",
          undefined,
          undefined,
          DEFAULT_CHALLENGE_ROUTES
        ),
        getItem(
          t("dashboard.challenges.create"),
          "challenges-2",
          undefined,
          undefined,
          `${DEFAULT_CHALLENGE_ROUTES}/${constantRoutesChallengeManager.pages.challenges.create}`
        ),
      ]),
      getItem(t("dashboard.solutions"), "solutions", <BulbOutlined />, [
        getItem(
          t("dashboard.solutions.list"),
          "solutions-1",
          undefined,
          undefined,
          DEFAULT_SOLUTION_ROUTES
        ),
        getItem(
          t("dashboard.solutions.report"),
          "solutions-2",
          undefined,
          undefined,
          `${DEFAULT_SOLUTION_ROUTES}/${constantRoutesChallengeManager.pages.solutions.report}`
        ),
      ]),
      getItem(t("dashboard.tasks"), "tasks", <AuditOutlined />, [
        getItem(
          t("dashboard.tasks.list"),
          "tasks-1",
          undefined,
          undefined,
          DEFAULT_TASK_ROUTES
        ),
        getItem(
          t("dashboard.tasks.report"),
          "tasks-2",
          undefined,
          undefined,
          `${DEFAULT_TASK_ROUTES}/${constantRoutesChallengeManager.pages.tasks.report}`
        ),
      ]),
      getItem(t("dashboard.personal"), "personal", <PieChartOutlined />, [
        getItem(
          t("dashboard.personal.profile"),
          "account_profile",
          undefined,
          undefined,
          `${constantRoutesChallengeManager.pages.profile.root}/${constantRoutesChallengeManager.pages.profile.me}`
        ),
        getItem(
          t("dashboard.personal.changePassword"),
          "change_password",
          undefined,
          undefined,
          `${constantRoutesChallengeManager.pages.profile.root}/${constantRoutesChallengeManager.pages.profile.changePassword}`
        ),
        getItem(
          t("dashboard.personal.settings"),
          "account_profile-setting",
          undefined,
          undefined,
          `${constantRoutesChallengeManager.pages.profile.root}/${constantRoutesChallengeManager.pages.profile.setting}`
        ),
      ]),
    ],
    [t]
  );

  const menuOfMentor: MenuItemType[] = useMemo(
    () => [
      getItem(t("dashboard.solutions"), "solutions", <BulbOutlined />, [
        getItem(
          t("dashboard.solutions.list"),
          "solutions_list",
          undefined,
          undefined,
          `${constantRoutesMentor.solution.root}/${constantRoutesMentor.solution.list}`
        ),
      ]),
      getItem(t("dashboard.personal"), "personal", <PieChartOutlined />, [
        getItem(
          t("dashboard.personal.profile"),
          "account_profile",
          undefined,
          undefined,
          `${constantRoutesMentor.profile.root}/${constantRoutesMentor.profile.details}`
        ),
        getItem(
          t("dashboard.personal.changePassword"),
          "change_password",
          undefined,
          undefined,
          `${constantRoutesMentor.profile.root}/${constantRoutesMentor.profile.changePassword}`
        ),
        getItem(
          t("dashboard.personal.settings"),
          "account_profile-setting",
          undefined,
          undefined,
          `${constantRoutesMentor.profile.root}/${constantRoutesMentor.profile.setting}`
        ),
      ]),
    ],
    [t]
  );

  const menuOfTasker: MenuItemType[] = useMemo(
    () => [
      getItem(t("dashboard.tasks"), "task", <PieChartOutlined />, [
        getItem(
          t("dashboard.tasks.list"),
          "task_list",
          undefined,
          undefined,
          `${constantRoutesTasker.task.root}/${constantRoutesTasker.task.list}`
        ),
        getItem(
          t("dashboard.tasks.create"),
          "task_create",
          undefined,
          undefined,
          `${constantRoutesTasker.task.root}/${constantRoutesTasker.task.create}`
        ),
      ]),
      getItem(t("dashboard.personal"), "personal", <UserOutlined />, [
        getItem(
          t("dashboard.personal.profile"),
          "account_profile",
          undefined,
          undefined,
          `${constantRoutesTasker.profile.root}/${constantRoutesTasker.profile.details}`
        ),
        getItem(
          t("dashboard.personal.changePassword"),
          "change_password",
          undefined,
          undefined,
          `${constantRoutesTasker.profile.root}/${constantRoutesTasker.profile.changePassword}`
        ),
        getItem(
          t("dashboard.personal.settings"),
          "account_profile-setting",
          undefined,
          undefined,
          `${constantRoutesTasker.profile.root}/${constantRoutesTasker.profile.setting}`
        ),
      ]),
    ],
    [t]
  );

  const menuOfRoot: MenuItemType[] = useMemo(
    () => [
      getItem(
        t("dashboard.statistics"),
        "statistic",
        <PieChartOutlined />,
        undefined,
        `${constantRoutesRoot.statistic.root}`
      ),
      getItem(
        t("dashboard.subscriptions"),
        "subscription",
        <WalletOutlined />,
        undefined,
        `${constantRoutesRoot.subscription.root}`
      ),
      getItem(t("dashboard.account"), "account", <PieChartOutlined />, [
        getItem(t("dashboard.account.employers"), "employers", undefined, [
          getItem(
            t("dashboard.account.employers.list"),
            "list",
            undefined,
            undefined,
            `${constantRoutesRoot.user.root}/${constantRoutesRoot.user.employer}`
          ),
          getItem(
            t("dashboard.account.employers.create"),
            "create",
            undefined,
            undefined,
            `${constantRoutesRoot.user.root}/${constantRoutesRoot.user.employer}/${constantRoutesRoot.user.createAccountEmployee}`
          ),
        ]),
        getItem(
          t("dashboard.account.users"),
          "mentor",
          undefined,
          undefined,
          `${constantRoutesRoot.user.root}/${constantRoutesRoot.user.user}`
        ),
        getItem(
          t("dashboard.account.taskers"),
          "tasker",
          undefined,
          undefined,
          `${constantRoutesRoot.user.root}/${constantRoutesRoot.user.tasker}`
        ),
      ]),
      getItem(t("dashboard.challenges"), "challenges", <BookOutlined />, [
        getItem(
          t("dashboard.challenges.list"),
          "challenges-1",
          undefined,
          undefined,
          DEFAULT_CHALLENGE_ROUTES
        ),
        getItem(
          t("dashboard.challenges.create"),
          "challenges-2",
          undefined,
          undefined,
          `${DEFAULT_CHALLENGE_ROUTES}/${constantRoutesChallengeManager.pages.challenges.create}`
        ),
      ]),
      getItem(t("dashboard.solutions"), "solutions", <BulbOutlined />, [
        getItem(
          t("dashboard.solutions.list"),
          "solutions-1",
          undefined,
          undefined,
          DEFAULT_SOLUTION_ROUTES
        ),
        getItem(
          t("dashboard.solutions.report"),
          "solutions-2",
          undefined,
          undefined,
          `${DEFAULT_SOLUTION_ROUTES}/${constantRoutesChallengeManager.pages.solutions.report}`
        ),
      ]),
      getItem(t("dashboard.tasks"), "tasks", <AuditOutlined />, [
        getItem(
          t("dashboard.tasks.list"),
          "tasks-1",
          undefined,
          undefined,
          DEFAULT_TASK_ROUTES
        ),
        getItem(
          t("dashboard.tasks.report"),
          "tasks-2",
          undefined,
          undefined,
          `${DEFAULT_TASK_ROUTES}/${constantRoutesChallengeManager.pages.tasks.report}`
        ),
      ]),
      getItem(t("dashboard.recruitment"), "taskers", <GlobalOutlined />, [
        getItem(
          t("dashboard.recruitment.pendingApproval"),
          "tasker_request_approve",
          undefined,
          undefined,
          `${constantRoutesRoot.tasker.root}/${constantRoutesRoot.tasker.requestApprove}`
        ),
      ]),
      getItem(t("dashboard.personal"), "personal", <UserOutlined />, [
        getItem(
          t("dashboard.personal.profile"),
          "account_profile",
          undefined,
          undefined,
          `${constantRoutesRoot.profile.root}/${constantRoutesRoot.profile.me}`
        ),
        getItem(
          t("dashboard.personal.changePassword"),
          "change_password",
          undefined,
          undefined,
          `${constantRoutesRoot.profile.root}/${constantRoutesRoot.profile.changePassword}`
        ),
        getItem(
          t("dashboard.personal.settings"),
          "account_profile-setting",
          undefined,
          undefined,
          `${constantRoutesRoot.profile.root}/${constantRoutesRoot.profile.setting}`
        ),
      ]),
    ],
    [t]
  );

  const generatorDashboardMenuContent: () => MenuItemType[] = () => {
    switch (role) {
      case "challenge":
        return menuOfChallengeManager;
      case "mentor":
        return menuOfMentor;
      case "root":
        return menuOfRoot;
      case "tasker":
        return menuOfTasker;
      default:
        return [];
    }
  };

  const dashboardMenuContent = generatorDashboardMenuContent();

  return {
    dashboardMenuContent,
  };
};

export default useDashboardLogic;
