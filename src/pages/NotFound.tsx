import { Button, NoResult } from "@/components/ui";

export default function NotFoundPage() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center">
      <NoResult />

      <Button className="mt-5" href="/">
        Go Home
      </Button>
    </div>
  );
}
