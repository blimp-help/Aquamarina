import Spinner from "@/components/Spinners/Spinner";

export default function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner type="bar" size={60} />
    </div>
  );
}
