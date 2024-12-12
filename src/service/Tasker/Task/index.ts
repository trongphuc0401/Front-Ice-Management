import axiosClient from "../../../axios/axiosClient";
import constantTaskerApi from "../../../constants/api/tasker";
import {
  ICreateTaskRequest,
  IGetAllTaskParams,
  IGetDetailsTaskParams,
} from "../../../types/request/tasker/task";
import { ITaskSerivce } from "../../../types/services/tasker/task";

const taskSerivce: ITaskSerivce = {
  getAll: (params: IGetAllTaskParams) => {
    const { page = 1, perPage = 10 } = params;
    return axiosClient.get(
      `/${constantTaskerApi.task.getAll}?page=${page}&per_page=${perPage}`,
    );
  },

  getDetails: (params: IGetDetailsTaskParams) => {
    const { taskId } = params;
    return axiosClient.get(`/${constantTaskerApi.task.getDetails}/${taskId}`);
  },

  create: (data: ICreateTaskRequest) => {
    return axiosClient.post(`/${constantTaskerApi.task.create}`, data);
  },
};

export default taskSerivce;
