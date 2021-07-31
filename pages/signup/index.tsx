import SignUp from '@/src/components/signup';
import withStore from '@/src/hoc/with-store';
import withRegisterLayout from '@/src/hoc/with-register-layout';

const RegisterPageWithLayout = withRegisterLayout(SignUp);
const RegisterPageWithStore = withStore(RegisterPageWithLayout);

export default RegisterPageWithStore;
