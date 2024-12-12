import { Navigate, RouteObject } from "react-router";
import constantRoutesRoot from "../../constants/routes/root";
import { RootController } from "../../pages/Root";
import { ChallengeManagerController } from "../../pages/ChallengeManager";
import constantRoutesChallengeManager from "../../constants/routes/challengeManager";
import constantDynamicRoute from "../../constants/routes/dynamicRoute";
import { notfoundRoute, notMatchRoute } from "../CommonRoutes";
import {
  taskeeProfileRoute,
  taskerProfileRoute,
} from "../CommonRoutes/commonRoutes";
import MentorController from "../../pages/Mentor/Controller";

const USER_ROUTES = {
  ROOT: constantRoutesRoot.user.root,
  CHALLENGE_MANAGER: constantRoutesRoot.user.challengeManage,
  MENTOR: constantRoutesRoot.user.mentor,
  TASKER: constantRoutesRoot.user.tasker,
  TASKEE: constantRoutesRoot.user.taskee,
  ALL: constantRoutesRoot.user.all,
};

const CHALLENGE_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.challenges.root}`,
  DETAILS: `${constantRoutesChallengeManager.pages.challenges.details}/:${constantDynamicRoute.challenge}`,
  CREATE: `${constantRoutesChallengeManager.pages.challenges.create}`,
};

const SOLUTION_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.solutions.root}`,
  DETAILS: `${constantRoutesChallengeManager.pages.solutions.details}/:${constantDynamicRoute.solution}`,
  REPORT: `${constantRoutesChallengeManager.pages.solutions.report}`,
  REPORT_DETAILS: `:${constantDynamicRoute.reportSolution}`,
};

const TASK_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.tasks.root}`,
  DETAILS: `${constantRoutesChallengeManager.pages.tasks.details}/:${constantDynamicRoute.task}`,
  REPORT: `${constantRoutesChallengeManager.pages.tasks.report}`,
  REPORT_DETAILS: `:${constantDynamicRoute.reportTask}`,
  SOLUTION_TASK_DETAILS: `${constantRoutesChallengeManager.pages.tasks.taskSolutionDetails}/:${constantDynamicRoute.taskSolution}`,
};

const PROFILE_ROUTES = {
  PARENT: `${constantRoutesChallengeManager.pages.profile.root}`,
  ME: `${constantRoutesChallengeManager.pages.profile.me}`,
  SETTING: `${constantRoutesChallengeManager.pages.profile.setting}`,
  CHANGE_PASSWORD: `${constantRoutesChallengeManager.pages.profile.changePassword}`,
};

const TASKER_ROUTES = {
  ROOT: constantRoutesRoot.tasker.root,
  REQUEST_APPROVE: constantRoutesRoot.tasker.requestApprove,
};

const extendTaskerRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={TASKER_ROUTES.REQUEST_APPROVE} replace />,
  },
  {
    path: TASKER_ROUTES.REQUEST_APPROVE,
    element: <RootController.Tasker.RequestApprove />,
  },
];

const extendUserRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={USER_ROUTES.ALL} replace />,
  },
  {
    path: USER_ROUTES.CHALLENGE_MANAGER,
    element: <RootController.User.ChallengeManager />,
  },
  {
    path: USER_ROUTES.ALL,
    element: <RootController.User.All />,
  },
  {
    path: USER_ROUTES.MENTOR,
    element: <RootController.User.Mentor />,
  },
  {
    path: USER_ROUTES.TASKEE,
    element: <RootController.User.Taskee />,
  },
  {
    path: USER_ROUTES.TASKER,
    element: <RootController.User.Tasker />,
  },
];

const extendChallengeRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChallengeManagerController.Challenge.List />,
  },
  {
    path: CHALLENGE_ROUTES.DETAILS,
    element: <ChallengeManagerController.Challenge.Details />,
  },
  {
    path: CHALLENGE_ROUTES.CREATE,
    element: <ChallengeManagerController.Challenge.Upload />,
  },
];

const extendSolutionRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChallengeManagerController.Solution.List />,
  },
  {
    path: SOLUTION_ROUTES.DETAILS,
    element: <ChallengeManagerController.Solution.Details />,
  },
  {
    path: SOLUTION_ROUTES.REPORT,
    children: [
      {
        index: true,
        element: <ChallengeManagerController.Solution.Reports />,
      },
      {
        path: SOLUTION_ROUTES.REPORT_DETAILS,
        element: <ChallengeManagerController.Solution.ReportDetails />,
      },
    ],
  },
];

const extendTaskRoutes: RouteObject[] = [
  {
    index: true,
    element: <ChallengeManagerController.Task.List />,
  },
  {
    path: TASK_ROUTES.DETAILS,
    element: <ChallengeManagerController.Task.Details />,
  },
  {
    path: TASK_ROUTES.SOLUTION_TASK_DETAILS,
    element: <ChallengeManagerController.Task.SolutionTaskDetails />,
  },
  {
    path: TASK_ROUTES.REPORT,
    children: [
      {
        index: true,
        element: <ChallengeManagerController.Task.Reports />,
      },
      {
        path: TASK_ROUTES.REPORT_DETAILS,
        element: <ChallengeManagerController.Task.ReportDetails />,
      },
    ],
  },
];
const extendProfileRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={PROFILE_ROUTES.ME} replace />,
  },
  {
    path: PROFILE_ROUTES.ME,
    element: <ChallengeManagerController.Profile />,
  },
  {
    path: PROFILE_ROUTES.SETTING,
    element: <ChallengeManagerController.Profile.Setting />,
  },
  {
    path: PROFILE_ROUTES.CHANGE_PASSWORD,
    element: <MentorController.Profile.ChangePassword />,
  },
];

const RootRoutes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to={CHALLENGE_ROUTES.PARENT} replace />,
  },
  {
    path: USER_ROUTES.ROOT,
    children: extendUserRoutes,
  },

  {
    path: CHALLENGE_ROUTES.PARENT,
    children: extendChallengeRoutes,
  },

  {
    path: TASKER_ROUTES.ROOT,
    children: extendTaskerRoutes,
  },

  {
    path: SOLUTION_ROUTES.PARENT,
    children: extendSolutionRoutes,
  },

  {
    path: TASK_ROUTES.PARENT,
    children: extendTaskRoutes,
  },
  {
    path: PROFILE_ROUTES.PARENT,
    children: [...extendProfileRoutes],
  },

  taskeeProfileRoute,
  taskerProfileRoute,
  notfoundRoute,
  notMatchRoute,
];

export default RootRoutes;
