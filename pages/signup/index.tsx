import SignUp from '@/src/components/signup';
import withStore from '@/src/hoc/with-store';
import withAuth from '@/src/hoc/with-auth';
import withRegisterLayout from '@/src/hoc/with-register-layout';

// const RegisterPageWithAuth = withAuth(SignUp);
const RegisterPageWithLayout = withRegisterLayout(SignUp);
const RegisterPageWithStore = withStore(RegisterPageWithLayout);

export default RegisterPageWithStore;
