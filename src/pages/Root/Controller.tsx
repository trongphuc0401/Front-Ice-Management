import { TaskerManagement } from "./Tasker";
import { UserManagement } from "./User";

const RootController = () => {
  return null;
};

RootController.User = UserManagement;
RootController.Tasker = TaskerManagement;

export default RootController;
