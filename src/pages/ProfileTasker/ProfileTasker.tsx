import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import challengeManagerService from "../../service/ChallengeManager/challengeManagerService";
import { constantChallengeManagerQueryKey } from "../../constants/queryKey/challengeManager";
import { Card, Descriptions, Divider, Flex, Table, Typography } from "antd";
import { CardTaskerInformation } from "./Partials/CardTaskerInformation";
import generateItemsDescriptionProfileTasker from "./ProfileTasker.util";
import globalService from "../../service/Global/globalService";
import { ITaskEntity } from "../../types/entity/task";
import columnsTaskTable from "../ChallengeManager/Task/List/TaskList.config";

const { Title } = Typography;

const ProfileTasker: FC = () => {
  const { taskerUsername } = useParams();
  const [newTaskOfTasker, setNewTaskOfTasker] = useState<ITaskEntity[]>([]);
  const [oldTaskOfTasker, setOldTaskOfTasker] = useState<ITaskEntity[]>([]);
  const { data, isFetching } = useQuery({
    queryKey: [constantChallengeManagerQueryKey.tasker.profile, taskerUsername],
    queryFn: async () => {
      if (!taskerUsername) return;
      try {
        const response = await challengeManagerService.tasker.getProfile({
          username: taskerUsername,
        });
        const responseData = response.data;
        if (responseData) {
          try {
            const responseNew = await globalService.getAllTaskNewOfTasker({
              taskerId: responseData.id,
            });

            const responseOld = await globalService.getAllTaskOldOfTasker({
              taskerId: responseData.id,
            });
            const responseDataTaskNew = responseNew.data;
            const responseDataTaskOld = responseOld.data;
            setNewTaskOfTasker(responseDataTaskNew.tasks);
            setOldTaskOfTasker(responseDataTaskOld.tasks);
          } catch (error) {
            console.log(error);
          }
        }
        return responseData;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const itemDescription = generateItemsDescriptionProfileTasker(data);

  return (
    <Flex vertical gap={32}>
      <Card loading={isFetching}>
        <Descriptions
          title="Thông tin công ty"
          items={itemDescription}
          size="default"
        />
      </Card>
      <Flex gap={12}>
        <CardTaskerInformation
          isLoading={isFetching}
          title="Số lượng task"
          value={0}
        />
        <CardTaskerInformation
          isLoading={isFetching}
          title="Task còn thời gian"
          value={0}
        />
        <CardTaskerInformation
          isLoading={isFetching}
          title="Task hết thời gian"
          value={0}
        />
      </Flex>

      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách các task đã đăng
        </Title>
      </Divider>

      <Table columns={[]} dataSource={[]} loading={isFetching} />

      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách các task hiện tại
        </Title>
      </Divider>

      <Table
        rowKey={(record) => `${record.id}`}
        loading={isFetching}
        dataSource={newTaskOfTasker}
        columns={columnsTaskTable}
        scroll={{ x: "max-content" }}
        showHeader
        sticky
        virtual
      />

      <Divider orientation="left" plain>
        <Title level={4} style={{ margin: "0" }}>
          Danh sách các task cũ
        </Title>
      </Divider>
      <Table
        rowKey={(record) => `${record.id}`}
        loading={isFetching}
        dataSource={oldTaskOfTasker}
        columns={columnsTaskTable}
        scroll={{ x: "max-content" }}
        showHeader
        sticky
        virtual
      />
    </Flex>
  );
};

export default ProfileTasker;
