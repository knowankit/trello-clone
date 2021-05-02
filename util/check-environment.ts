export default function checkEnvironment() {
  const envUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://trello-clone-one.vercel.app';

  return envUrl;
}
