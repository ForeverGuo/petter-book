/**
 * @description post请求
 * @author grantguo
 * @date 2025-04-15 10:24:10
*/
export const post = async (url: string, data: object) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

/**
 * @description get请求
 * @author grantguo
 * @date 2025-04-15 10:24:20
*/
export const get = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};
 
