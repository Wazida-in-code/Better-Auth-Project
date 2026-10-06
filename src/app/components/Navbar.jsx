"use client";
import { useEffect, useState } from "react";
import { Link, Button } from "@heroui/react";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
// import baseUrl from "./services/baseUrl";

export default function Navbar({categories}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter()
  // const [categories, setCategories] = useState([])

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); 
        },
      },
    });
  };

  // useEffect(() => {
  //   fetch(`${baseUrl}/api/categories`)
  //   .then(res => res.json())
  //   .then(data => setCategories(data))
  //   .catch(err => console.log(err))
  // }, []) 
  console.log(categories);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold">
              HOME
            </Link>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          {
            session?.user && <li>
            <Link href="/profile">Profile</Link>
          </li>
          }
          {
            session?.user && <li>
            <Link
              href="#"
              className="font-medium text-accent"
              aria-current="page"
            >
              Dashboard
            </Link>
          </li>
          }
          {
            categories?.map(cat => <li key={cat?._id}><Link href={`/category/${cat?.slug}`}>{cat?.name}</Link></li>)
          }
        </ul>
        <div className="hidden items-center gap-4 md:flex">
          {session?.user ? (
            <>
              <h4>Welcome, {session.user.name}</h4>
              <Link>
                <Button onClick={handleSignOut}>Sign Out</Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button>Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link href="#" className="block py-2">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2 font-medium text-accent">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2">
                Pricing
              </Link>
            </li>
            <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
              {session?.user ? (
                <>
                  <Link>
                    <Button>Sign Out</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button>Sign In</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
