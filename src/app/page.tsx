import { logoutAction } from "@/actions/auth"

export default function Home() {
  return (
    <div>
      <h1>Hi, I am dashboard</h1>
      <form action={logoutAction}>
        <button type="submit">Logout</button>
      </form>
    </div>
  )
}
