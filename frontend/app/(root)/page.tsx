import Link from "next/link";

const page = () => {
  return (
    <>
      <div>Home Page</div>
      <ul>

        <li>
          <Link href="/dashboard/" className="text-blue-500 hover:underline w-full">Go to Dashboard page</Link>
        </li>
        <li>

          <Link href="/about" className="text-blue-500 hover:underline w-full">Go to About page</Link>
        </li>
      </ul>
    </>
  )
}

export default page