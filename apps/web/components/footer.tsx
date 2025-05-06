import Link from "next/link"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("footer")

  return (
    <footer className="w-full border-t">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">{t("about.title")}</h3>
            <p className="text-muted-foreground text-sm">
              {t("about.description")}
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">{t("navigation.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/coachs" className="hover:underline">
                  {t("navigation.coachs")}
                </Link>
              </li>
              <li>
                <Link href="/formations" className="hover:underline">
                  {t("navigation.formations")}
                </Link>
              </li>
              <li>
                <Link href="/tournois" className="hover:underline">
                  {t("navigation.tournois")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">{t("resources.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:underline">
                  {t("resources.blog")}
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:underline">
                  {t("resources.guides")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  {t("resources.faq")}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">{t("contact.title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:contact@edgemy.com" className="hover:underline">
                  {t("contact.email")}
                </a>
              </li>
              <li>
                <a href="https://discord.gg/edgemy" className="hover:underline">
                  {t("contact.discord")}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          {t("legal.copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  )
} 