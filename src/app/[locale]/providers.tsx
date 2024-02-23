"use client";

import { usePathname } from "@/navigation";
import config from "~/i18n.config";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { TooltipProvider } from "@/components/ui/tooltip";

function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}) {
  const pathname = usePathname();

  const namespaces = config.namespacedRoutes["*"].concat(
    config.namespacedRoutes[pathname as keyof typeof config.namespacedRoutes] ??
      [],
  );

  const messagesInNamespace = namespaces.reduce(
    (acc, namespace) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      acc = {
        ...acc,
        ...(messages as Record<string, Record<string, string>>)[namespace],
      };

      return acc;
    },
    {} as Record<string, string>,
  ) as AbstractIntlMessages;

  return (
    <NextIntlClientProvider messages={messagesInNamespace} locale={locale}>
      <TooltipProvider>{children}</TooltipProvider>
    </NextIntlClientProvider>
  );
}

export default Providers;
