export default function MailchimpForm() {
  return (
    <div id="mc_embed_shell">
      <div id="mc_embed_signup">
        <form
          action="https://biketempe.us4.list-manage.com/subscribe/post?u=e0f2197fd495ef8f42428d6a1&amp;id=d80565878a&amp;f_id=004177eaf0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_self"
          noValidate
        >
          <div id="mc_embed_signup_scroll">
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                name="EMAIL"
                className="rounded bg-white px-3 py-2 text-black"
                id="mce-EMAIL"
                placeholder="Your email address"
                required
              />
            </div>
            <div hidden>
              <input type="hidden" name="tags" value="8204178" />
            </div>
            <div id="mce-responses" className="clear foot">
              <div
                className="response"
                id="mce-error-response"
                style={{ display: "none" }}
              ></div>
              <div
                className="response"
                id="mce-success-response"
                style={{ display: "none" }}
              ></div>
            </div>
            <div aria-hidden="true" className="hidden">
              <input
                type="text"
                name="b_e0f2197fd495ef8f42428d6a1_d80565878a"
                tabIndex={-1}
              />
            </div>
            <div className="mt-2">
              <div className="clear foot">
                <input
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="w-full cursor-pointer rounded bg-apricot px-4 py-2 text-black hover:opacity-90 sm:w-auto"
                  value="Subscribe"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
