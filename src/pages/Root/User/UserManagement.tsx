import { AllUserPage } from "./All";
import { ChallengeManagerUserPage } from "./ChallengeManager";
import { MentorUserPage } from "./Mentor";
import { TaskeeUserPage } from "./Taskee";
import { TaskerUserPage } from "./Tasker";

const UserManagement = () => {
  return null;
};

UserManagement.All = AllUserPage;
UserManagement.Taskee = TaskeeUserPage;
UserManagement.Tasker = TaskerUserPage;
UserManagement.ChallengeManager = ChallengeManagerUserPage;
UserManagement.Mentor = MentorUserPage;

export default UserManagement;
