import { Button } from "../ui";

type Props = {
  callback: () => void;
  title?: string;
  desc?: string;
  loading: boolean;
  close: () => void;
};

export default function ConfirmModal({
  loading,
  callback,
  title,
  close,
  desc = "This action cannot be undone",
}: Props) {
  return (
    <>
      <div className="text-xl mb-3">
        <p className="text-xl font-semibold">{title || "Wait a minute"}</p>
      </div>
      {!!desc && <p className="font-semibold text-lg text-red-500">{desc}</p>}

      <div className="flex-row gap-4 mt-5">
        <Button onClick={close} color={"second"}>
          <p className="text-[#1f1f1f]">Close</p>
        </Button>
        <Button loading={loading} onClick={callback}>
          <p className="text-white">Yes, Please</p>
        </Button>
      </div>
    </>
  );
}
