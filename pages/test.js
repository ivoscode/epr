import Layout from "./../components/Layout";
export default function Test() {
  return (
    <div>
      <Layout>
        <div className="bg-green-400">Test page</div>
      </Layout>
    </div>
  );
}
// export default function Select() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-6 w-6"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//       />
//     </svg>
//   );
// }
// export default function Patient(props) {
//   return (
//     <svg
//       x="0px"
//       y="0px"
//       viewBox="0 0 120.48 122.88"
//       xmlSpace="preserve"
//       {...props}
//     >
//       <path
//         d="M42.98 77.01c5.64 16.6 29.21 17.21 34.51 0 6.24 5.61 24.7 6.74 31.57 10.57 2.17 1.21 4.14 2.75 5.71 4.84 2.39 3.16 3.86 7.29 4.26 12.54l1.43 11.76c-.35 3.71-2.45 5.85-6.6 6.16H6.6c-4.14-.32-6.25-2.45-6.6-6.16l1.43-11.76c.4-5.24 1.87-9.37 4.26-12.54 1.58-2.09 3.54-3.63 5.71-4.84 6.88-3.83 25.34-4.95 31.58-10.57zm48.75 17.71h3.61c.68 0 1.23.55 1.23 1.23v5.39h5.39c.67 0 1.23.55 1.23 1.23v3.61c0 .67-.55 1.23-1.23 1.23h-5.39v5.39c0 .67-.55 1.23-1.23 1.23h-3.61c-.67 0-1.23-.55-1.23-1.23v-5.39h-5.39c-.67 0-1.23-.55-1.23-1.23v-3.61c0-.67.55-1.23 1.23-1.23h5.39v-5.39c0-.68.55-1.23 1.23-1.23zm-53.07-57.9c-1.18.05-2.08.29-2.69.7-.35.23-.61.53-.77.89-.18.4-.27.88-.25 1.43.05 1.62.9 3.75 2.54 6.19l.02.04 5.34 8.49c2.14 3.4 4.38 6.87 7.17 9.42 2.68 2.45 5.93 4.11 10.23 4.12 4.66.01 8.06-1.71 10.83-4.3 2.88-2.69 5.14-6.38 7.38-10.07l6.01-9.9c1.12-2.56 1.53-4.27 1.27-5.27-.15-.6-.81-.89-1.94-.95-.24-.01-.48-.01-.73-.01-.27.01-.55.03-.84.05-.16.01-.32 0-.46-.03a8.43 8.43 0 01-1.65-.09l2.06-9.11c-15.28 2.41-26.7-8.94-42.85-2.27L40.5 36.9c-.66.03-1.27.01-1.84-.08zm47.2-1.91c1.48.45 2.43 1.39 2.82 2.91.43 1.68-.04 4.05-1.46 7.29-.03.06-.06.12-.09.17L81.04 55.3c-2.34 3.86-4.72 7.73-7.9 10.7-3.29 3.08-7.34 5.13-12.89 5.12-5.18-.01-9.07-1.99-12.27-4.91-3.09-2.82-5.45-6.47-7.69-10.03l-5.34-8.49c-1.95-2.91-2.97-5.57-3.03-7.75-.03-1.03.15-1.96.52-2.78.4-.86 1.01-1.58 1.83-2.13.39-.26.82-.48 1.29-.66-.35-4.6-.48-10.4-.25-15.26.12-1.15.34-2.3.66-3.46 1.36-4.87 4.78-8.79 9.02-11.49 1.49-.95 3.13-1.74 4.85-2.36C60.1-1.91 73.69.11 80.97 7.98c2.96 3.21 4.82 7.46 5.22 13.08l-.33 13.85z"
//         fillRule="evenodd"
//         clipRule="evenodd"
//       />
//     </svg>
//   );
// }
// export default function Navbar() {
//   const { state, dispatch } = useContext(Context);
//   const router = useRouter();
//   if (state.user.token == null) {
//     return null;
//   }

//   return (
//     <nav className="flex items-center justify-evenly mb-10">
//       <button
//         onClick={() => {
//           dispatch({ type: "LOGOUT" });
//           router.push("/");
//         }}
//         className=" bg-pink-800 px-3 py-2 rounded-md text-white font-semibold tracking-widest"
//       >
//         Logout
//       </button>

//       <ul className="flex">
//         {state.user.data.map((link) => {
//           return (
//             <li key={link.id} className="mx-2">
//               <Link href={link.url}>
//                 <button className=" bg-blue-300 px-3 py-2 rounded-md text-white font-semibold tracking-widest">
//                   {link.title}
//                 </button>
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//       <div className="flex">
//         <Link href="/client/search">
//           <button className=" bg-green-700 px-3 py-2 rounded-md text-white font-semibold tracking-widest">
//             Search
//           </button>
//         </Link>
//         <Link href="/test">
//           <button className=" bg-purple-700 px-3 py-2 rounded-md text-white font-semibold tracking-widest">
//             Test
//           </button>
//         </Link>
//       </div>
//       <div>{`Welcome  ${
//         state.user.username && state.user.username.substring(0, 20)
//       }`}</div>
//     </nav>
//   );
// }
