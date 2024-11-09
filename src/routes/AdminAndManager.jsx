import { LOGIN_PATH } from "@src/constants/routes";
import {notification} from 'antd'
import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser,  isTokenExpired} from '@utils'

const permissions = [1,2]
const AdminAndManagerRoute = () => {
  const auth = getAuthUser();
  if (auth?.token && permissions.includes(Number(auth?.roleId))) {
    if(!isTokenExpired(auth?.token)){
      return <Outlet />;
    }else{
      notification.error({
        duration: 5,
        message: 'Token is expired, pls login again!'
      })
      localStorage.clear('authUser')
      return <Navigate to={LOGIN_PATH} />;
    }
  }
  notification.warning({
    duration: 5,
    message: 'Permission denined!'
  })
  return <Navigate to={'/'} />;
};

export default AdminAndManagerRoute;