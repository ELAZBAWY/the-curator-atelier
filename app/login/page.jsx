import AuthFrom from "./components/AuthForm";
import AuthImage from "./components/AuthImage";

export default function Login() {
  return (
    <main className="min-h-screen bg-[#111111]">
      <section className="grid min-h-screen grid-cols-1 overflow-hidden sm:grid-cols-2">
        <div className="col-span-1">
          <AuthImage />
        </div>

        <div className="flex w-full flex-col items-center justify-center sm:col-span-1">
          <AuthFrom />
        </div>
      </section>
    </main>
  );
}
