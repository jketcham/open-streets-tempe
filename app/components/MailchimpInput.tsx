import { useState } from "react";
import { useTheme } from "./ThemeProvider";

interface MailchimpInputProps {
  variant?: "light" | "dark";
}

export default function MailchimpInput({
  variant = "light",
}: MailchimpInputProps) {
  const theme = useTheme();
  const [email, setEmail] = useState("");

  const inputClasses =
    variant === "dark"
      ? `bg-black/40 ${theme.textInverse} placeholder:${theme.textInverse}`
      : `bg-gray-100 ${theme.text} placeholder:${theme.text}`;

  const buttonClasses =
    variant === "dark"
      ? `${theme.bg} ${theme.textOnLight}`
      : `${theme.bgInverse} ${theme.textInverse}`;

  return (
    <form
      action="https://biketempe.us4.list-manage.com/subscribe/post?u=e0f2197fd495ef8f42428d6a1&amp;id=e6a7afbd33&amp;f_id=000277eaf0"
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
        className={`w-full rounded-md px-6 py-3 text-lg focus:outline-current ${inputClasses} placeholder:opacity-70`}
        required
      />
      <button
        type="submit"
        className={`inline-flex items-center justify-center rounded-md px-6 py-3 text-lg font-semibold focus:outline-current ${buttonClasses} transition-opacity hover:opacity-90`}
      >
        Subscribe
      </button>
    </form>
  );
}
