import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Container } from "./Container";
import { useTheme } from "./ThemeProvider";
import { Button } from "./themed/Button";

interface ErrorMessageProps {
  heading: string;
  message: string;
}

export function ErrorMessage({ heading, message }: ErrorMessageProps) {
  const theme = useTheme();

  return (
    <main className="grow">
      <div className={`${theme.bg} py-16 sm:py-24`}>
        <Container size="md">
          <div className="text-center">
            <ExclamationTriangleIcon
              className={`mx-auto mb-6 size-16 stroke-current ${theme.textOnLight}`}
            />
            <h1
              className={`mb-4 text-4xl font-bold sm:text-5xl ${theme.textOnLight}`}
            >
              {heading}
            </h1>
            <p className="mb-8 text-lg text-neutral-600">{message}</p>
            <Button to="/">Go back home</Button>
          </div>
        </Container>
      </div>
    </main>
  );
}
