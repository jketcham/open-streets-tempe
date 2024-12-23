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
        className="w-full rounded-md bg-black/40 px-6 py-3 text-lg placeholder:text-current/70 focus:outline-current"
        required
      />
      <button
        type="submit"
        className={`inline-flex items-center focus:outline-current justify-center rounded-md px-6 py-3 text-lg font-semibold ${theme.bg} ${theme.textOnLight} hover:opacity-90 transition-opacity`}
      >
        Subscribe
      </button>
    </form>
  );
}
