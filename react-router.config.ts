import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  // Behind Firebase Hosting -> Cloud Run, request.url is http://<run.app host>,
  // so React Router's action CSRF check (>=7.18) needs the public origin listed.
  allowedActionOrigins: ["openstreetstempe.org"],
} satisfies Config;
