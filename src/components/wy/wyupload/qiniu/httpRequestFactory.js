/**
*  七牛云element扩展
*	 @author: gaoyong@weiyankeji.cn
*	 @date: 2017.11.02
*/
import config from '../config'
import util from '../util'
import database from './database'


function getError(action, option, xhr) {
  let msg;
  if (xhr.response) {
    msg = `${xhr.status} ${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.status} ${xhr.responseText}`;
  } else {
    msg = `fail to post ${action} ${xhr.status}`;
  }

  const err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = action;
  return err;
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}


export default function httpRequestFactory ( keyFn ) {
  if ( typeof keyFn != 'function' ) {
    throw new Error('httpRequestFactory get error type keyFn!');
    return;
  }

  return function (option) {
  	const xhr = new XMLHttpRequest();
    const action = config.uploadUrl;

  	if (xhr.upload) {
        xhr.upload.onprogress = function progress(e) {
          if (e.total > 0) {
            e.percent = e.loaded / e.total * 100;
          }
          option.onProgress(e);
        };
      }

  	const formData = new FormData();
  	if (option.data) {
  	    Object.keys(option.data).forEach(key => {
  	      formData.append(key, option.data[key]);
  	    });
  	}

  	formData.append('file', option.file);
    formData.append('token',database.token);
    const userName = keyFn(),
            fileName = option.file.name;
    const fileKey = util.createUserDateFileKey(userName,fileName);
    formData.append('key',fileKey);

    xhr.onerror = function error(e) {
        option.onError(e);
    };

    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return option.onError(getError(action, option, xhr));
      }

      option.onSuccess(getBody(xhr));
    };

    xhr.open('post', action, true);

    if (option.withCredentials && 'withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    const headers = option.headers || {};

    for (let item in headers) {
      if (headers.hasOwnProperty(item) && headers[item] !== null) {
        xhr.setRequestHeader(item, headers[item]);
      }
    }
    xhr.send(formData);
    return xhr;
  }
}


