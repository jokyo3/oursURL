// pages/functions/_middleware.js

import { getfreeCookies, getKeyToken } from './handlers.js';

export async function onRequest(context) {
  // 解构 context 对象以获取请求和其他属性
  const { request } = context;
  const url = new URL(request.url);

  // 根据请求的路径来决定调用哪个函数
  switch (url.pathname) {
    case '/':
      return getfreeCookies(context);
    case '/gettoken':
      return getKeyToken(context);
    default:
      // 如果没有匹配的路由，返回 404 Not Found
      return new Response('Not Found', { status: 404 });
  }
}


