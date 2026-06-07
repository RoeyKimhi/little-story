import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-8">
      <img src="/logo.svg" alt="LittleStory" className="mb-4 h-12 w-12" />
      <h1 className="text-3xl font-black text-violet-600">Log In</h1>
      <p className="mt-2 text-center text-muted-foreground">
        Welcome back! Sign in to your account
      </p>

      <section className="mt-8 w-full rounded-lg border border-border bg-card p-8 shadow-sm">
        <LoginForm />
      </section>
    </div>
  );
};

export default Login;
