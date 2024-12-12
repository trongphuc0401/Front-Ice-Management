import { Flex, Card, Descriptions, Divider } from "antd";
import { AvatarMentor } from "../Mentor/Partials/AvatarMentor";
import { ChangePasswordPage } from "./Partials/ChangePassword";
import { TaskerProfileSetting } from "./Partials/Setting";
import { StatisticAccount } from "./Partials/StatisticAccount";
import useAuthStore from "../../../store/Auth/authStore";
import { Navigate } from "react-router";
import constantRoutesGlobal from "../../../constants/routes/global";
import { itemDescriptionTaskerProfile } from "./profile.logic";
import { TaskeeFollower } from "./Partials/TaskeeFollower";

const TaskerProfile = () => {
  const profile = useAuthStore((state) => state.profile);

  if (!profile) {
    return <Navigate to={constantRoutesGlobal.errorPage["404"]} replace />;
  }
  const itemsDescription = itemDescriptionTaskerProfile(profile);
  return (
    <Flex vertical gap={32}>
      <Flex gap={42} justify="space-between" align="stretch">
        <AvatarMentor currentAvatar={profile?.image} />
        <Card>
          <Descriptions style={{ width: "100%" }} items={itemsDescription} />
        </Card>
      </Flex>
      <StatisticAccount />
      <Flex vertical gap={8}>
        <Divider orientation="left">Người theo dõi công ty</Divider>
        <TaskeeFollower />
      </Flex>
    </Flex>
  );
};

TaskerProfile.Setting = TaskerProfileSetting;
TaskerProfile.ChangePassword = ChangePasswordPage;

export default TaskerProfile;
