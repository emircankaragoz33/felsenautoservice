import LoginForm from "@/app/admin/login/LoginForm";

type AdminLoginPageProps = {
  searchParams?: {
    callbackUrl?: string;
  };
};

export default function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const callbackUrl = searchParams?.callbackUrl ?? "/admin";
  return <LoginForm callbackUrl={callbackUrl} />;
}
