import followerApi from "./follower";
import taskApi from "./task";
import uploadApi from "./upload";

const constantTaskerApi = {
  task: taskApi,
  follower: followerApi,
  upload: uploadApi,
};

export default constantTaskerApi;
