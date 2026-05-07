import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Button>Sign UP</Button>
      <Button>Sign IN</Button>
    </div>
  );
}

function Button({ children }) {
  return <button>{children}</button>;
}
