// pages/protected.js

import { getSession } from "next-auth/react";

export default function ProtectedPage({ session }) {
  if (!session) {
    return <p>Access Denied. Please sign in.</p>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, {session.user.email}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
