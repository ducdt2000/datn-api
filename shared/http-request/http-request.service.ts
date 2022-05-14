import { HttpService } from '@nestjs/axios';
import { AppLogger } from './../logger/logger.service';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { catchError, lastValueFrom, map, Observable } from 'rxjs';

import { BaseApiErrorObject } from '../dtos/base-api-response.dto';
import {
  BaseApiClientResponse,
  BaseMicroserviceResponse,
} from '../dtos/base-microservice-response.dto';
import { RequestContext } from '../request-context/request-context.dto';

@Injectable()
export class HttpRequestService {
  constructor(
    private httpService: HttpService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(HttpRequestService.name);
  }

  async request<T>(
    ctx: RequestContext,
    config: AxiosRequestConfig,
  ): Promise<BaseMicroserviceResponse<T>> {
    config = this.addHeaderData(ctx, config);
    const resp = this.httpService.request(config);
    return this.handleResponse<T>(ctx, resp);
  }

  async head<T>(
    ctx: RequestContext,
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<BaseMicroserviceResponse<T>> {
    config = this.addHeaderData(ctx, config);
    const resp = this.httpService.head(url, config);
    return this.handleResponse<T>(ctx, resp);
  }

  async get<T>(
    ctx: RequestContext,
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<BaseMicroserviceResponse<T>> {
    config = this.addHeaderData(ctx, config);
    const resp = this.httpService.get(url, config);
    return this.handleResponse<T>(ctx, resp);
  }

  async post<T>(
    ctx: RequestContext,
    url: string,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<BaseMicroserviceResponse<T>> {
    config = this.addHeaderData(ctx, config);
    const resp = this.httpService.post(url, data, config);
    return this.handleResponse<T>(ctx, resp);
  }

  async postClient<T>(
    ctx: RequestContext,
    url: string,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<BaseApiClientResponse<T>> {
    config = this.addHeaderData(ctx, config);
    const resp = this.httpService.post(url, data, config);
    return this.handleClientResponse<T>(ctx, resp);
  }

  async patch<T>(
    ctx: RequestContext,
    url: string,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<BaseMicroserviceResponse<T>> {
    config = this.addHeaderData(ctx, config);
    const resp = this.httpService.patch(url, data, config);
    return this.handleResponse<T>(ctx, resp);
  }

  async put<T>(
    ctx: RequestContext,
    url: string,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<BaseMicroserviceResponse<T>> {
    config = this.addHeaderData(ctx, config);
    const resp = this.httpService.put(url, data, config);
    return this.handleResponse<T>(ctx, resp);
  }

  async putClient<T>(
    ctx: RequestContext,
    url: string,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<BaseMicroserviceResponse<T>> {
    config = this.addHeaderData(ctx, config);
    const resp = this.httpService.put(url, data, config);
    return this.handleClientResponse<T>(ctx, resp);
  }

  async delete<T>(
    ctx: RequestContext,
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<BaseMicroserviceResponse<T>> {
    config = this.addHeaderData(ctx, config);
    const resp = this.httpService.delete(url, config);
    return this.handleResponse<T>(ctx, resp);
  }

  private async handleResponse<T>(
    ctx: RequestContext,
    observable: Observable<AxiosResponse<T>>,
  ) {
    const resp = observable.pipe(
      map((response) => (response ? response.data : response)),
      catchError(async (e) => {
        return this.handleError<T>(ctx, e);
      }),
    );

    return lastValueFrom<BaseMicroserviceResponse<T>>(resp);
  }

  private async handleClientResponse<T>(
    ctx: RequestContext,
    observable: Observable<AxiosResponse<T>>,
  ) {
    const resp = observable.pipe(
      map((response) => (response ? response.data : response)),
      catchError(async (e) => {
        return this.handleClientError<T>(ctx, e);
      }),
    );

    return lastValueFrom<BaseApiClientResponse<T>>(resp);
  }

  private handleError<T>(
    ctx: RequestContext,
    e: any,
  ): BaseMicroserviceResponse<T> {
    if (e.response) {
      return plainToClass(BaseMicroserviceResponse, e.response.data, {
        excludeExtraneousValues: true,
      });
    }

    this.logger.error(ctx, e.message);
    const err = new BaseApiErrorObject();
    err.message = e.message;
    return { error: err };
  }

  private handleClientError<T>(
    ctx: RequestContext,
    e: any,
  ): BaseApiClientResponse<T> {
    if (e.response) {
      return plainToClass(BaseApiClientResponse, e.response.data, {
        excludeExtraneousValues: true,
      });
    }

    this.logger.error(ctx, e.message);
    const err = new BaseApiErrorObject();
    err.message = e.message;
    return err;
  }

  private addHeaderData(
    ctx: RequestContext,
    config: AxiosRequestConfig,
  ): AxiosRequestConfig {
    if (config && ctx.user) {
      if (!config.headers) {
        config.headers = {};
      }
      // Deep copy user info from context
      const userInfo = {
        ...ctx.user,
      };
      // Remove unicode possible before add user info to header
      delete userInfo.firstName;
      delete userInfo.lastName;
      config.headers.user = JSON.stringify(userInfo);
    }
    if (!config) {
      config = { headers: {} };
    }
    if (ctx.requestID) {
      config.headers = {
        ...config.headers,
        REQUEST_ID_TOKEN_HEADER: ctx.requestID,
      };
    }

    return config;
  }
}
