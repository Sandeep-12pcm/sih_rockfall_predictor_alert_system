export const revalidate = 6; // revalidate every 6 seconds the whole page
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  if(!data.ok) throw new Error('Failed to fetch data')
  const posts = await data.json()
  return (
    <ul className="list-disc pl-5">
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}