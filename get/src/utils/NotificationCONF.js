
import { notification } from 'antd';


export const openNotificationWithIcon = (type, a, b) => {
  notification.open({
    duration: 10,
    placement: "bottomRight",
    message: a,
    description: b,
    className: type,
    key: '1'
  })
};

// success     info      warning    error