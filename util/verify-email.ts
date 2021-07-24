import checkEnvironment from '@/util/check-environment';

const verifyToken = async (ctx) => {
  const { email } = ctx.query;
  const host = checkEnvironment();
  const isTokenValid = await fetch(`${host}/api/verify-email?email=${email}`);
  const json = await isTokenValid.json();

  // If user exists return true
  if (json.message === 'Found') {
    return true;
  } else return false;
};

export default verifyToken;
