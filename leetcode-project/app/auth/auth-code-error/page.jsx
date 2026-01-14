import Link from "next/link";

export default function AuthCodeErrorPage() {
    return (
        <div>
            <h1>Sign-in failed</h1>
            <p>
                We couldn’t complete your login. Please try again.
            </p>
            <Link href="/sign-in">Back to login</Link>
        </div>
    )
}
