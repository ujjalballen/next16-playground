export const metadata = {
  title: {
    default: "Auth | Ujjal B. Allen",
    template: "%s | This is template",
    absolute: "",
  },
  description: "This is a login Page",
};

export default function AuthLayout({ children }) {
  return <div>{children}</div>;
}
