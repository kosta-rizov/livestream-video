import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-6">
      <p>Dashboard</p>

      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
