import {
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Flex, Space, Typography } from "antd";
import type { MenuProps } from "antd";
import { FC } from "react";
import useAuthStore from "../../../../store/Auth/authStore";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import authService from "../../../../service/authService";
import { toast } from "react-toastify";
import constantRoutesGlobal from "../../../../constants/routes/global";

import { useLanguage } from "../../../../contexts/LanguageContext";

interface IUserCustomerProps {}

const { Text } = Typography;

const UserCustomer: FC<IUserCustomerProps> = () => {
  const profile = useAuthStore((state) => state.profile);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const { t } = useLanguage();

  const mutationLogout = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      return toast.promise(authService.logout(), {
        pending: t("userCustomer.logoutPending"),
        success: t("userCustomer.logoutSuccess"),
        error: t("userCustomer.logoutError"),
      });
    },
    onSuccess: () => {
      logout();
    },
  });

  const handleToProfile = () => {
    return navigate(`/${constantRoutesGlobal.myProfile}`);
  };

  const handleToProfileSetting = () => {
    return navigate(`/${constantRoutesGlobal.settingProfile}`);
  };

  const handleLogout = () => {
    mutationLogout.mutate();
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: t("userCustomer.myProfile"),
      icon: <ProfileOutlined />,
      onClick: () => handleToProfile(),
    },
    {
      key: "2",
      label: t("userCustomer.settingProfile"),
      icon: <SettingOutlined />,
      onClick: () => handleToProfileSetting(),
    },
    {
      key: "3",
      label: t("userCustomer.logout"),
      icon: <LogoutOutlined />,
      onClick: () => handleLogout(),
    },
  ];
  return (
    <Space style={{ padding: "0px 32px", cursor: "pointer" }}>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Flex justify="start" align="center" gap={8}>
          <Avatar
            src={
              profile?.image ||
              "https://img.freepik.com/premium-vector/man-empty-avatar-casual-business-style-vector-photo-placeholder-social-networks-resumes_885953-434.jpg"
            }
          />
          {profile?.role === "tasker" ? (
            <Text>
              {profile?.firstname} {profile.lastname}
            </Text>
          ) : (
            <Text>{profile?.fullname}</Text>
          )}
        </Flex>
      </Dropdown>
    </Space>
  );
};

export default UserCustomer;
