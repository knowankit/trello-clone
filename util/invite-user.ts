import checkEnvironment from '@/util/check-environment';

const verifyToken = async ({ email, boardId }) => {
  const host = checkEnvironment();
  const URL = `${host}/api/invite-user`;
  const data = {
    email,
    boardId
  };

  const response = await fetch(URL, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });

  const json = await response.json();

  if (json.message === 'Invited') {
    return true;
  } else {
    return false;
  }
};

export default verifyToken;
