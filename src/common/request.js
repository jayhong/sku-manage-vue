import Axios from 'axios';
import Vue from 'vue';

const HEADER = {
  'Content-Type': 'application/json',
};

const options = {
  baseURL: '',
  headers: {
    post: HEADER,
    put: HEADER,
    patch: HEADER,
    delete: HEADER,
  },
};

const ApiErrorEnum = {
  LOGIC_ERROR: 'logicError',
  HTTP_ERROR: 'httpError',
};

const ErrorTextEnum = {
  ERROR_401: '抱歉，您没有权限/登录超时',
  ERROR_403: '抱歉，您没有权限，请联系管理员',
  ERROR_404: '接口不存在',
  ERROR_UNKNOWN: '未知的网络错误',
  ERROR_ABORT: '未知的网络错误:网络中断/请求超时',
};

const ErrorStatus = [401, 403, 404];


const axiosInstance = Axios.create(options);


function getErrorText(httpStatusCode) {
  let text = '';
  switch (httpStatusCode) {
    case 401:
      text = ErrorTextEnum.ERROR_401;
      break;
    case 403:
      text = ErrorTextEnum.ERROR_403;
      break;
    case 404:
      text = ErrorTextEnum.ERROR_404;
      break;
    default:
      text = '';
      break;
  }
  return text;
}

function reloadLater(time) {
  if (process.env.NODE_ENV !== 'testing') {
    setTimeout(() => {
      window.location.reload();
    }, time);
  }
}

function showNetWorkError(resp) {
  let text = '';
  if (resp && resp.status) {
    text = getErrorText(resp.status);
    if (resp.status === 401) {
      // reloadLater(1000);
    }
    if (ErrorStatus.indexOf(resp.status) >= 0) {
    }
  }
}

axiosInstance.defaults.validateStatus = (status) => {
  if (status >= 200 && status < 300) {
    return true;
  }
  if (status === 304) {
    return true;
  }
  return false;
};

// 处理错误情况
axiosInstance.interceptors.response.use((response) => { return response; }, (error) => {
  return Promise.reject({
    type: ApiErrorEnum.HTTP_ERROR,
    response: error.response,
    error,
  });
});

// 分开处理后端系统错误（http status） 和具体的业务逻辑错误 {code:-1}
axiosInstance.interceptors.response.use((response) => { return response; }, (error) => {
  switch (error.type) {
    case ApiErrorEnum.HTTP_ERROR:
      showNetWorkError(error.error.response);
      break;
    // eslint-disable-next-line no-case-declarations
    // case ApiErrorEnum.LOGIC_ERROR:
      // 这里不做 toast, 让大家自定义
      // const { msg } = error;
      // const prefixText = msg || error.config.errorText || '系统发生错误';
      // toast(`${prefixText}，CODE:${error.code}`);
      // break;
    default:
      break;
  }
  return Promise.reject(error);
});


function upload(config = {}) {
  const { file, url, headers } = config;

  if (!file || !url) {
    throw new Error('upload 参数缺少：file,url');
  }

  const data = new FormData();
  data.append('file', file, file.name);
  return Axios({
    ...config,
    data,
    method: 'post',
    headers: {
      ...headers,
      'Content-Type': 'multipart/form-data',
    },
  });
}

export {
  axiosInstance as rest,
  upload,
  ApiErrorEnum,
  ErrorTextEnum,
};
