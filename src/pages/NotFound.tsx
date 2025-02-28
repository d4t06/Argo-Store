import { Button, NoResult } from "@/components/ui";

export default function NotFoundPage() {
  return (
    <div className="my-auto text-center">
      <NoResult />
      <Button className="mt-5" href="/">
        Go Home
      </Button>
    </div>
  );
}
