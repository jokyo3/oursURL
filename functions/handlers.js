// pages/functions/handlers.js

// 生成 UUID 的函数
function generateUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

// 获取 Cookies 的函数
async function getCookies(request) {
  try {
    let response = await fetch(request);
    let cookies = response.headers.get('set-cookie');
    let strValues = '';

    if (cookies) {
      const pairs = cookies.split(','); // 使用逗号分隔
      const values = pairs.map(pair => {
        const firstSemicolonIndex = pair.indexOf(';'); // 找到第一个分号的位置
        const keyValue = firstSemicolonIndex !== -1 ? pair.slice(0, firstSemicolonIndex) : pair; // 提取第一个分号前的数据
        const [key, value] = keyValue.split('='); // 拆分键值对
        if (key && value) {
          return `${key}=${value.trim()}`; // 去除首尾空格
        }
        return ''; // 无效的 cookie
      });
      strValues = values.filter(cookie => cookie !== '').join('; '); // 去除无效的 cookie
    }
    const result = { result: { cookies: strValues } };
    const jsonResult = JSON.stringify(result);

    return new Response(jsonResult, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response('', { status: 500 });
  }
}

// 处理根路径 `/` 的请求
export async function getfreeCookies(context) {
  // 从 context 对象解构出需要的属性
  const { request } = context;

   // 获取请求的主机名
  const hosturl = new URL(request.url);
 // const BING_PROXY = `https://${hosturl.hostname}`;
 // const BING_PROXY = ` https://zb.b1ng.chat';
  // 以下是您原始 Workers 脚本中的逻辑
  const BING_PROXY = 'https://sokwith-proxybing.hf.space';
  const uuid = generateUUID();
  const oldUA = request.headers.get('user-agent') || '';
  let freeisMobile = oldUA.includes('Mobile') || oldUA.includes('Android');
  const newcctHeaders = new Headers();
  if (freeisMobile) {
    newcctHeaders.set(
      'user-agent',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.7 Mobile/15E148 Safari/605.1.15 BingSapphire/1.0.410427012'
    );
  } else {
    newcctHeaders.set('user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35');
  }
 // const challtargetUrl = new URL(BING_PROXY + '/turing/captcha/challenge?q=&iframeid=local-gen-' + uuid);
  const challtargetUrl = new URL(BING_PROXY + '/turing/captcha/challenge?h=jok&q=&iframeid=local-gen-' + uuid);
  const newcctReq = new Request(challtargetUrl, {
    method: 'GET',
    headers: newcctHeaders,
  });

  const cctcookie = await getCookies(newcctReq);

  const newcctRes = new Response(cctcookie.body, cctcookie);
  newcctRes.headers.set('Access-Control-Allow-Origin', request.headers.get('Origin'));
  newcctRes.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,POST,OPTIONS');
  newcctRes.headers.set('Access-Control-Allow-Credentials', 'true');
  newcctRes.headers.set('Access-Control-Allow-Headers', '*');
  return newcctRes;
}

// 处理 `/gettoken` 路径的请求
export async function getKeyToken(context) {
  // 由于go-proxy-bingai项目base58加密验证作者信息，追加token返回：
  const keytoken = {
    T: 'SjQH0q3MzCEXay9WfVPAdkL518iZcghu4Uteprwl7bxTvG6RsK2oYIFONDBmnJ',
    TP: [21,58,22,34,0,51,58,37,20,54,16,41,29,16,14,33,24,46,7,60,5,16,54,27,28,44,1,26,57,21,46,49,19,45,16,14,3,26]
  };
  const jsonResult = JSON.stringify(keytoken);

  return new Response(jsonResult, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
