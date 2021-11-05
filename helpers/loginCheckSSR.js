// We shouldn't fetch() in getServerSideProps,
// but we can call a helper function inside it that does fetch
export default async function loginCheckSSR() {
  // Need full URL for this fetch or else we get an absolute path error
  const request = await fetch("http://localhost:3000/api/loginCheck");
  const res = await request.json();
  return res;
} 
