import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const LoginPage = async () => {
    const {isAuthenticated, getUser} = getKindeServerSession();
  
    if (!(await isAuthenticated())) { 
      redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/home");
    }

    const user = await getUser();
    
    if (!user) {
      redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/home");
    }

  return redirect("/home")
}

export default LoginPage