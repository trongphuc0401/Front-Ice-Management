import { Flex, Button } from "antd";
import { useNavigate } from "react-router";
import constantRoutesTasker from "../../../../../../constants/routes/tasker";
import { FC } from "react";

type IActionsTaskTableProps = {
  taskId: string;
};

const ActionsTaskTable: FC<IActionsTaskTableProps> = ({ taskId }) => {
  const navigate = useNavigate();
  return (
    <Flex justify="start" align="center" gap={8}>
      <Button
        variant="solid"
        color="primary"
        onClick={() =>
          navigate(`${constantRoutesTasker.task.details}/${taskId}`)
        }
      >
        Xem chi tiết
      </Button>
      <Button
        onClick={() =>
          navigate(`${constantRoutesTasker.task.update}/${taskId}`)
        }
      >
        Chỉnh sửa
      </Button>
    </Flex>
  );
};

export default ActionsTaskTable;
