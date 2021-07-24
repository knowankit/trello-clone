import checkEnvironment from '@/util/check-environment';

const verifyToken = async (ctx) => {
  const { token } = ctx.query;
  const host = checkEnvironment();
  const isTokenValid = await fetch(`${host}/api/verify-token?token=${token}`);
  const json = await isTokenValid.json();

  if (json.message === 'valid') {
    return true;
  } else return false;
};

export default verifyToken;
