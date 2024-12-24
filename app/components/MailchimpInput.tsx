import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function MailchimpInput() {
  const theme = useTheme();
  const [email, setEmail] = useState("");

  return (
    <form
      action="https://openstreetstempe.us21.list-manage.com/subscribe/post?u=0a1c24e61a2559da9f118dbc7&amp;id=5be0e96bba&amp;f_id=00f0a3e1f0"
      method="post"
      target="_blank"
      className="flex flex-col gap-4 sm:flex-row"
    >
      <input
        type="email"
        name="EMAIL"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`w-full rounded-md bg-black/40 px-6 py-3 text-lg focus:outline-current ${theme.textInverse} placeholder:${theme.textInverse} placeholder:opacity-70`}
        required
      />
      <button
        type="submit"
        className={`inline-flex items-center justify-center rounded-md px-6 py-3 text-lg font-semibold focus:outline-current ${theme.bg} ${theme.textOnLight} transition-opacity hover:opacity-90`}
      >
        Subscribe
      </button>
    </form>
  );
}
