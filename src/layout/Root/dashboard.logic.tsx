import React from "react";
import { RoleType } from "../../types/base/role";
import type { MenuProps } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import constantRoutesChallengeManager from "../../constants/routes/challengeManager";
import MenuItem from "antd/es/menu/MenuItem";
import constantRoutesMentor from "../../constants/routes/mentor";
import constantRoutesTasker from "../../constants/routes/tasker";
import constantRoutesRoot from "../../constants/routes/root";
type MenuItem = Required<MenuProps>["items"][number];

const getItem: (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[] | null,
  path?: string,
) => MenuItem = (label, key, icon, children, path) => {
  return {
    key,
    icon,
    children,
    label,
    path,
  } as MenuItem;
};

const DEFAULT_CHALLENGE_ROUTES = `/${constantRoutesChallengeManager.pages.challenges.root}`;
const DEFAULT_SOLUTION_ROUTES = `/${constantRoutesChallengeManager.pages.solutions.root}`;
const DEFAULT_TASK_ROUTES = `/${constantRoutesChallengeManager.pages.tasks.root}`;

const menuOfChallengeManager: MenuItem[] = [
  getItem("Thử thách", "challenges", <PieChartOutlined />, [
    getItem(
      "Danh sách",
      "challenges-1",
      undefined,
      undefined,
      DEFAULT_CHALLENGE_ROUTES,
    ),
    getItem(
      "Tạo",
      "chellenges-2",
      undefined,
      undefined,
      `${DEFAULT_CHALLENGE_ROUTES}/${constantRoutesChallengeManager.pages.challenges.create}`,
    ),
  ]),
  getItem("Giải pháp", "solutions", <PieChartOutlined />, [
    getItem(
      "Danh sách",
      "solutions-1",
      undefined,
      undefined,
      DEFAULT_SOLUTION_ROUTES,
    ),

    getItem(
      "Tố cáo",
      "solutions-2",
      undefined,
      undefined,
      `${DEFAULT_SOLUTION_ROUTES}/${constantRoutesChallengeManager.pages.solutions.report}`,
    ),
  ]),
  getItem("Nhiệm vụ", "tasks", <PieChartOutlined />, [
    getItem("Danh sách", "tasks-1", undefined, undefined, DEFAULT_TASK_ROUTES),
    getItem(
      "Tố cáo",
      "tasks-2",
      undefined,
      undefined,
      `${DEFAULT_TASK_ROUTES}/${constantRoutesChallengeManager.pages.tasks.report}`,
    ),
  ]),

  getItem("Tài khoản", "account", <PieChartOutlined />, [
    getItem(
      "Trang cá nhân",
      "account_profile",
      undefined,
      undefined,
      `${constantRoutesChallengeManager.pages.profile.root}/${constantRoutesChallengeManager.pages.profile.me}`,
    ),
    getItem(
      "Đổi mật khẩu",
      "change_password",
      undefined,
      undefined,
      `${constantRoutesChallengeManager.pages.profile.root}/${constantRoutesChallengeManager.pages.profile.changePassword}`,
    ),
    getItem(
      "Cài đặt",
      "account_profile-setting",
      undefined,
      undefined,
      `${constantRoutesChallengeManager.pages.profile.root}/${constantRoutesChallengeManager.pages.profile.setting}`,
    ),
  ]),
];

const menuOfMentor: MenuItem[] = [
  getItem("Giải pháp", "solutions", <PieChartOutlined />, [
    getItem(
      "Danh sách",
      "solutions_list",
      undefined,
      undefined,
      `${constantRoutesMentor.solution.root}/${constantRoutesMentor.solution.list}`,
    ),
  ]),
  getItem("Tài khoản", "account", <PieChartOutlined />, [
    getItem(
      "Trang cá nhân",
      "account_profile",
      undefined,
      undefined,
      `${constantRoutesMentor.profile.root}/${constantRoutesMentor.profile.details}`,
    ),
    getItem(
      "Đổi mật khẩu",
      "change_password",
      undefined,
      undefined,
      `${constantRoutesMentor.profile.root}/${constantRoutesMentor.profile.changePassword}`,
    ),
    getItem(
      "Cài đặt",
      "account_profile-setting",
      undefined,
      undefined,
      `${constantRoutesMentor.profile.root}/${constantRoutesMentor.profile.setting}`,
    ),
  ]),
];

const menuOfTasker: MenuItem[] = [
  getItem("Nhiệm vụ", "task", <PieChartOutlined />, [
    getItem(
      "Danh sách",
      "task_list",
      undefined,
      undefined,
      `${constantRoutesTasker.task.root}/${constantRoutesTasker.task.list}`,
    ),
    getItem(
      "Tạo mới",
      "task_create",
      undefined,
      undefined,
      `${constantRoutesTasker.task.root}/${constantRoutesTasker.task.create}`,
    ),
  ]),
  getItem("Tài khoản", "account", <PieChartOutlined />, [
    getItem(
      "Trang cá nhân",
      "account_profile",
      undefined,
      undefined,
      `${constantRoutesTasker.profile.root}/${constantRoutesTasker.profile.details}`,
    ),
    getItem(
      "Đổi mật khẩu",
      "change_password",
      undefined,
      undefined,
      `${constantRoutesTasker.profile.root}/${constantRoutesTasker.profile.changePassword}`,
    ),
    getItem(
      "Cài đặt",
      "account_profile-setting",
      undefined,
      undefined,
      `${constantRoutesTasker.profile.root}/${constantRoutesTasker.profile.setting}`,
    ),
  ]),
];

const menuOfRoot: MenuItem[] = [
  getItem("Người dùng", "user", <PieChartOutlined />, [
    getItem(
      "Tất cả",
      "all",
      undefined,
      undefined,
      `${constantRoutesRoot.user.root}/${constantRoutesRoot.user.all}`,
    ),
    getItem(
      "Quản lí thử thách",
      "challenge_manager",
      undefined,
      undefined,
      `${constantRoutesRoot.user.root}/${constantRoutesRoot.user.challengeManage}`,
    ),
    getItem(
      "Người hỗ trợ",
      "mentor",
      undefined,
      undefined,
      `${constantRoutesRoot.user.root}/${constantRoutesRoot.user.mentor}`,
    ),
    getItem(
      "Nhà tuyển dụng",
      "tasker",
      undefined,
      undefined,
      `${constantRoutesRoot.user.root}/${constantRoutesRoot.user.tasker}`,
    ),
  ]),
  getItem("Thử thách", "challenges", <PieChartOutlined />, [
    getItem(
      "Danh sách",
      "challenges-1",
      undefined,
      undefined,
      DEFAULT_CHALLENGE_ROUTES,
    ),
    getItem(
      "Tạo",
      "chellenges-2",
      undefined,
      undefined,
      `${DEFAULT_CHALLENGE_ROUTES}/${constantRoutesChallengeManager.pages.challenges.create}`,
    ),
  ]),
  getItem("Giải pháp", "solutions", <PieChartOutlined />, [
    getItem(
      "Danh sách",
      "solutions-1",
      undefined,
      undefined,
      DEFAULT_SOLUTION_ROUTES,
    ),

    getItem(
      "Tố cáo",
      "solutions-2",
      undefined,
      undefined,
      `${DEFAULT_SOLUTION_ROUTES}/${constantRoutesChallengeManager.pages.solutions.report}`,
    ),
  ]),
  getItem("Nhiệm vụ", "tasks", <PieChartOutlined />, [
    getItem("Danh sách", "tasks-1", undefined, undefined, DEFAULT_TASK_ROUTES),
    getItem(
      "Tố cáo",
      "tasks-2",
      undefined,
      undefined,
      `${DEFAULT_TASK_ROUTES}/${constantRoutesChallengeManager.pages.tasks.report}`,
    ),
  ]),

  getItem("Tuyển dụng", "taskers", <PieChartOutlined />, [
    getItem(
      "Chờ được duyệt",
      "tasker_request_approve",
      undefined,
      undefined,
      `${constantRoutesRoot.tasker.root}/${constantRoutesRoot.tasker.requestApprove}`,
    ),
  ]),

  getItem("Tài khoản", "account", <PieChartOutlined />, [
    getItem(
      "Trang cá nhân",
      "account_profile",
      undefined,
      undefined,
      `${constantRoutesRoot.profile.root}/${constantRoutesRoot.profile.me}`,
    ),
    getItem(
      "Đổi mật khẩu",
      "change_password",
      undefined,
      undefined,
      `${constantRoutesRoot.profile.root}/${constantRoutesRoot.profile.changePassword}`,
    ),
    getItem(
      "Cài đặt",
      "account_profile-setting",
      undefined,
      undefined,
      `${constantRoutesRoot.profile.root}/${constantRoutesRoot.profile.setting}`,
    ),
  ]),
];

const useDashboardLogic = (role: RoleType) => {
  const generatorDashboardMenuContent: () => MenuItem[] = () => {
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
