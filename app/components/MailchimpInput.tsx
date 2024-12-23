import { useState } from "react";
import { Button } from "./themed";

export default function MailchimpInput() {
  const [email, setEmail] = useState("");

  return (
    <form
      action="https://openstreetstempe.us21.list-manage.com/subscribe/post?u=9067c7c3c3d3f7b7f8b1b5b1a&amp;id=9b9b9b9b9b"
      method="post"
      target="_blank"
      className="flex flex-col gap-2 sm:flex-row"
    >
      <input
        type="email"
        name="EMAIL"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-full border border-white/20 bg-black/10 px-6 py-3 text-white placeholder:text-white/60 focus:bg-black/20 focus:outline-none"
        required
      />
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
