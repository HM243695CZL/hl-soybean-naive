import axios from 'axios';
import type { AxiosResponse, AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { REFRESH_TOKEN_CODE, SUCCESS_CODE } from '@/config';
import {
  localStg,
  handleAxiosError,
  handleBackendError,
  handleResponseError,
  handleServiceResult,
  transformRequestData
} from '@/utils';
import { handleRefreshToken } from './helpers';
type RefreshRequestQueue = (config: AxiosRequestConfig) => void;

/**
 * 封装axios请求类
 * @author Soybean<honghuangdc@gmail.com>
 */
export default class CustomAxiosInstance {
  instance: AxiosInstance;

  backendConfig: Service.BackendResultConfig;

  isRefreshing: boolean;

  retryQueues: RefreshRequestQueue[];

  spinRequestCount = 0;

  /**
   *
   * @param axiosConfig - axios配置
   * @param backendConfig - 后端返回的数据配置
   */
  constructor(
    axiosConfig: AxiosRequestConfig,
    backendConfig: Service.BackendResultConfig = {
      codeKey: 'status',
      dataKey: 'data',
      msgKey: 'message',
      successCode: SUCCESS_CODE
    }
  ) {
    this.backendConfig = backendConfig;
    this.instance = axios.create(axiosConfig);
    this.setInterceptor();
    this.isRefreshing = false;
    this.retryQueues = [];
  }

  showSpin() {
    if (this.spinRequestCount === 0) {
      const loadingEle = document.createElement('div');
      loadingEle.id = 'loadingEle';
      loadingEle.style.position = 'fixed';
      loadingEle.style.top = '0';
      loadingEle.style.left = '0';
      loadingEle.style.bottom = '0';
      loadingEle.style.right = '0';
      loadingEle.style.zIndex = '9999';
      loadingEle.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      loadingEle.style.display = 'flex';
      loadingEle.style.justifyContent = 'center';
      loadingEle.style.alignItems = 'center';
      const loadingImg = document.createElement('img');
      loadingImg.src = 'src/assets/img/loading.gif';
      loadingImg.style.width = '155px';
      loadingImg.style.height = '155px';
      loadingEle.appendChild(loadingImg);
      if (document.getElementById('loadingEle')) {
        document.getElementById('loadingEle')?.remove();
      } else {
        document.getElementById('app')?.appendChild(loadingEle as any);
      }
    }
    this.spinRequestCount += 1;
  }

  hideSpin() {
    if (this.spinRequestCount <= 0) return;
    this.spinRequestCount -= 1;
    if (this.spinRequestCount === 0) {
      document.getElementById('loadingEle')?.remove();
    }
  }

  /** 设置请求拦截器 */
  setInterceptor() {
    this.instance.interceptors.request.use(
      async config => {
        this.showSpin();
        const handleConfig = { ...config };
        if (handleConfig.headers) {
          // 数据转换
          const contentType = handleConfig.headers['Content-Type'] as UnionKey.ContentType;
          handleConfig.data = await transformRequestData(handleConfig.data, contentType);
          // 设置token
          // eslint-disable-next-line no-constant-binary-expression
          handleConfig.headers.Authorization = `Bearer ${localStg.get('token')}` || '';
        }
        return handleConfig;
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
    this.instance.interceptors.response.use(
      (async response => {
        this.hideSpin();
        const { status, config } = response;
        if (status === 200 || status < 300 || status === 304) {
          const backend = response.data;
          const { codeKey, dataKey, successCode } = this.backendConfig;
          // 请求成功
          if (backend[codeKey] === successCode) {
            return handleServiceResult(null, backend[dataKey], backend);
          }

          // token失效, 刷新token
          if (REFRESH_TOKEN_CODE.includes(backend[codeKey])) {
            // 原始请求
            const originRequest = new Promise(resolve => {
              this.retryQueues.push((refreshConfig: AxiosRequestConfig) => {
                config.headers.Authorization = refreshConfig.headers?.Authorization;
                resolve(this.instance.request(config));
              });
            });

            if (!this.isRefreshing) {
              this.isRefreshing = true;
              const refreshConfig = await handleRefreshToken(response.config);
              if (refreshConfig) {
                this.retryQueues.map(cb => cb(refreshConfig));
              }
              this.retryQueues = [];
              this.isRefreshing = false;
            }
            return originRequest;
          }

          const error = handleBackendError(backend, this.backendConfig);
          return handleServiceResult(error, null);
        }
        const error = handleResponseError(response);
        return handleServiceResult(error, null);
      }) as (response: AxiosResponse<any, any>) => Promise<AxiosResponse<any, any>>,
      (axiosError: AxiosError) => {
        this.hideSpin();
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
  }
}
