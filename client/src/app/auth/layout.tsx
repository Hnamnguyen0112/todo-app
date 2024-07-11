export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-white overflow-hidden mx-auto w-screen h-screen">
      <div
        className="hidden lg:block lg:w-1/2 bg-cover"
        style={{
          backgroundPosition: "center",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80')",
        }}
      ></div>
      <div className="w-full px-20 lg:w-1/2 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
