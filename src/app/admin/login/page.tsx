import LoginForm from "@/app/admin/login/LoginForm";

type AdminLoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl ?? "/admin";
  return <LoginForm callbackUrl={callbackUrl} />;
}
