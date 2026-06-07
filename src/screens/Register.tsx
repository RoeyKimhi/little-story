import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-8">
      <img src="/logo.svg" alt="LittleStory" className="mb-4 h-12 w-12" />
      <h1 className="text-3xl font-black text-violet-600">Sign Up</h1>
      <p className="mt-2 text-center text-muted-foreground">
        Create an account to start making magical stories
      </p>

      <section className="mt-8 w-full rounded-lg border border-border bg-card p-8 shadow-sm">
        <RegisterForm />
      </section>
    </div>
  );
};

export default Register;
