import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export const dynamic = 'force-dynamic'

export default function ContactPage() {
  const t = useTranslations("contact")

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="py-20">
          <div className="container max-w-2xl">
            <h1 className="text-4xl font-bold mb-8 text-center">
              {t("title")}
            </h1>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t("form.name")}</Label>
                <Input id="name" name="name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("form.email")}</Label>
                <Input id="email" name="email" type="email" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">{t("form.subject")}</Label>
                <Input id="subject" name="subject" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t("form.message")}</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  rows={6} 
                  required 
                  className="resize-none"
                />
              </div>

              <Button type="submit" className="w-full">
                {t("form.submit")}
              </Button>
            </form>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">{t("info.email.title")}</h2>
                <p className="text-muted-foreground">{t("info.email.value")}</p>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">{t("info.phone.title")}</h2>
                <p className="text-muted-foreground">{t("info.phone.value")}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 